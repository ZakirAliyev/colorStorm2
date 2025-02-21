import React, {useEffect, useState} from 'react';
import './index.scss';
import {Table, Dropdown, Menu, Input, Modal, Form, InputNumber, Checkbox, Button, Upload, Select, message} from 'antd';
import {FaCheckCircle, FaPlus, FaTimesCircle} from 'react-icons/fa';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {PlusOutlined} from '@ant-design/icons';
import {
    useDeleteProductMutation,
    useGetAllCategoriesTreeQuery,
    useGetAllProductsQuery,
    usePostCreateProductMutation, useUpdateProductMutation
} from "../../../apiServices/usersApi.jsx";
import {PRODUCT_URL} from "../../../constants.js";
import {Info} from "@mui/icons-material";

function ProductPanel() {

    const {Option, OptGroup} = Select;

    const {data: productsData, refetch: refetchProducts} = useGetAllProductsQuery();

    const products = productsData?.data || [];

    const {data: categoriesData, refetch: refetchCategories} = useGetAllCategoriesTreeQuery();
    const categories = categoriesData?.data || [];

    const [categories1, setCategories1] = useState([]);
    const {data, statusCode} = useGetAllCategoriesTreeQuery();

    useEffect(() => {
        if (statusCode === 200) {
            setCategories1(data);
        }
    }, [data, statusCode]);

    const [postCreateProduct] = usePostCreateProductMutation()
    const [postUpdateProduct] = useUpdateProductMutation()

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [isDiscountChecked, setIsDiscountChecked] = useState(false);
    const [isStockChecked, setIsStockChecked] = useState(false);

    const doesCategoryMatch = (productCategoryId, targetCategoryId, categories) => {
        for (let category of categories) {
            if (category.id === targetCategoryId) return productCategoryId === category.id;
            if (category.subCategories?.length > 0) {
                const match = doesCategoryMatch(productCategoryId, targetCategoryId, category.subCategories);
                if (match) return true;
            }
        }
        return false;
    };

    const renderNestedCategoriesMenu = (categories) => {
        if (!categories || categories.length === 0) return null;

        return categories.map((category) =>
            category.subCategories && category.subCategories.length > 0 ? (
                <Menu.SubMenu key={category.id} title={category.name}>
                    {renderNestedCategoriesMenu(category.subCategories)}
                </Menu.SubMenu>
            ) : (
                <Menu.Item key={category.id} onClick={() => setSelectedCategoryId(category.id)}>
                    {category.name}
                </Menu.Item>
            )
        );
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategoryId
            ? doesCategoryMatch(product.categoryId, selectedCategoryId, categories)
            : true;
        return matchesSearch && matchesCategory;
    });

    const categoriesMenu = (
        <Menu>
            {renderNestedCategoriesMenu(categories)}
        </Menu>
    );

    const handleEditProduct = async (values) => {
        try {
            const formData = new FormData();
            formData.append("id", values.id);
            formData.append("name", values.name);
            formData.append("nameAz", values.nameAz);
            formData.append("nameRu", values.nameRu);
            formData.append("price", values.price);
            formData.append("description", values.description);
            formData.append("descriptionAz", values.descriptionAz);
            formData.append("descriptionRu", values.descriptionRu);
            formData.append("isDiscount", values.isDiscount);
            formData.append("categoryId", values.categoryId);
            silinenSekiller.forEach((sekil) => {
                formData.append("deleteImageName", sekil);
            })
            if (values.isDiscount) {
                formData.append("discountPrice", values.discountPrice);
            }
            formData.append("isStock", values.isStock);
            if (values.isStock) {
                formData.append("stock", values.stock);
            }

            fileList.forEach((file) => {
                formData.append("images", file.originFileObj);
            });

            // Backend-ə göndərin
            const response = await postUpdateProduct(formData).unwrap();

            if (response?.statusCode === 201) {
                alert("Məhsul uğurla əlavə edildi.");
                refetchProducts()
                refetchCategories()
            }
            setIsModalVisible(false);
        } catch (error) {
            console.error("Xəta baş verdi:", error);
            alert("Xəta baş verdi.");
        }
    };

    const handleAddProduct = async (values) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("nameAz", values.nameAz);
            formData.append("nameRu", values.nameRu);
            formData.append("price", values.price);
            formData.append("description", values.description);
            formData.append("descriptionAz", values.descriptionAz);
            formData.append("descriptionRu", values.descriptionRu);
            formData.append("isDiscount", values.isDiscount);
            formData.append("categoryId", values.categoryId);
            if (values.isDiscount) {
                formData.append("discountPrice", values.discountPrice);
            }
            formData.append("isStock", values.isStock);
            if (values.isStock) {
                formData.append("stock", values.stock);
            }

            fileList.forEach((file) => {
                formData.append("images", file.originFileObj);
            });

            const response = await postCreateProduct(formData).unwrap();

            if (response?.statusCode === 201) {
                alert("Məhsul uğurla əlavə edildi.");
                refetchProducts()
            }
            setIsModalVisible(false);
        } catch (error) {
            console.error("Xəta baş verdi:", error);
            alert("Xəta baş verdi.");
        }
    };

    const [silinenSekiller, setSilinenSekiller] = useState([]);

    const uploadProps = {
        listType: "picture-card",
        fileList,
        onChange: ({fileList: newFileList}) => {
            setFileList(
                newFileList
                    .map((file) => {
                        if (!file.originFileObj && !file.url) {
                            console.error("Fayl obyektində problem var:", file);
                            return null;
                        }
                        return file;
                    })
                    .filter(Boolean)
            );
        },
        beforeUpload: (file) => {
            setFileList((prevList) => [...prevList, file]);
            return false; // Faylın dərhal yüklənməsini blokla
        },
        onRemove: (file) => {
            setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));

            const trimmedUrl = file.url.split("pictures/")[1]; // "7d348f3a-a51d-4199-b538-0d3079bb2128.png"

            setSilinenSekiller((prevSilinenSekiller) => {
                const yeniSilinenler = [...prevSilinenSekiller, trimmedUrl];
                return yeniSilinenler;
            });
        },
    };

    const handleEditClick = () => {
        setSilinenSekiller([]);
    };

    useEffect(() => {
        if (editingProduct) {
            setIsDiscountChecked(editingProduct.isDiscount || false);
            setIsStockChecked(editingProduct.isStock || false);
        } else {
            setIsDiscountChecked(false);
            setIsStockChecked(false);
        }
    }, [editingProduct]);

    useEffect(() => {
        if (isModalVisible === false) {
            refetchProducts();
            refetchCategories();
        }
    }, [isModalVisible]);

    const [deleteProduct] = useDeleteProductMutation()


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Şəkil',
            dataIndex: 'images',
            key: 'images',
            render: (images) => (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <img
                        style={{
                            width: '75px',
                            height: '75px',
                            objectFit: 'cover',
                            padding: '0',
                            borderRadius: '10px',
                        }}
                        src={images?.[0] ? PRODUCT_URL + images[0] : ''}
                        alt="Product"
                    />
                </div>
            ),
        },
        {
            title: 'Ad',
            dataIndex: 'name',
            key: 'name',
            render: (name) => <span style={{color: '#0DA5B5', fontWeight: '600'}}>{name}</span>,
        },
        {
            title: 'Ad (AZ)',
            dataIndex: 'nameAz',
            key: 'nameAz',
            render: (nameAz) => <span style={{color: '#0DA5B5', fontWeight: '600'}}>{nameAz}</span>,
        },
        {
            title: 'Ad (RU)',
            dataIndex: 'nameRu',
            key: 'nameRu',
            render: (nameRu) => <span style={{color: '#0DA5B5', fontWeight: '600'}}>{nameRu}</span>,
        },
        {
            title: 'Qiymət',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span style={{color: '#454545', fontWeight: '600'}}>{price} AZN</span>,
        },
        {
            title: 'Kateqoriya',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Endirimli',
            dataIndex: 'isDiscount',
            key: 'isDiscount',
            render: (isDiscount) => (
                isDiscount ? (
                    <FaCheckCircle style={{color: 'green'}}/>
                ) : (
                    <FaTimesCircle style={{color: 'red'}}/>
                )
            ),
        },
        {
            title: 'Endirimli qiymət',
            dataIndex: 'discountPrice',
            key: 'discountPrice',
            render: (discountPrice) => (
                discountPrice ? <>{discountPrice}</> : <>N/A</>
            ),
        },
        {
            title: 'Əməliyyatlar',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                }}>
                    <FiEdit
                        style={{cursor: 'pointer', fontSize: '18px'}}
                        onClick={() => {
                            handleEditClick()
                            setEditingProduct(record);
                            setFileList(
                                record.images?.map((url, index) => ({
                                    uid: index,
                                    name: `Image ${index + 1}`,
                                    status: 'done',
                                    url: PRODUCT_URL + url,
                                })) || []
                            );
                            setIsDiscountChecked(record.isDiscount);
                            setIsStockChecked(record.isStock);
                            setIsModalVisible(true);
                        }}
                    />
                    <FiTrash
                        style={{cursor: 'pointer', fontSize: '18px'}}
                        onClick={async () => {
                            try {
                                const response = await deleteProduct(record?.id).unwrap()
                                if (response.statusCode === 200) {
                                    message.success("Məhsul uğurlu silindi!")
                                    refetchCategories()
                                    refetchProducts()
                                }
                            } catch (error) {
                                message.error("Xəta baş verdi!")
                            }
                        }}
                    />
                </div>
            ),
        },
    ];
    const [form] = Form.useForm();
    useEffect(() => {
        if (editingProduct) {
            form.setFieldsValue({
                name: editingProduct.name || '',
                nameAz: editingProduct.nameAz || '',
                nameRu: editingProduct.nameRu || '',
                price: editingProduct.price || 0,
                isDiscount: editingProduct.isDiscount || false,
                discountPrice: editingProduct.discountPrice || undefined,
                isStock: editingProduct.isStock || false,
                stock: editingProduct.stock || undefined,
                categoryId: editingProduct.categoryId || undefined,
                description: editingProduct.description || undefined,
                descriptionAz: editingProduct.descriptionAz || undefined,
                descriptionRu: editingProduct.descriptionRu || undefined,
            });
            setIsDiscountChecked(editingProduct.isDiscount || false);
            setIsStockChecked(editingProduct.isStock || false);
        } else {
            form.resetFields();
            setIsDiscountChecked(false);
            setIsStockChecked(false);
        }
    }, [editingProduct, form]);

    return (
        <section id="products">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '40px',
                marginBottom: '20px'
            }}>
                <Input
                    placeholder="Axtar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '300px',
                        margin: 0
                    }}
                />
                <div style={{display: 'flex', gap: '16px'}}>
                    <Dropdown overlay={categoriesMenu} trigger={['click']}>
                        <button style={{
                            margin: '0'
                        }} className={"addButton112"} href="#" onClick={(e) => e.preventDefault()}>
                            Kateqoriya ilə axtar
                        </button>
                    </Dropdown>
                    <button style={{
                        margin: '0'
                    }} className={"addButton112"}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedCategoryId(null);
                            }}
                    >
                        Hamısını göstər
                    </button>
                    <button
                        className="addButton111"
                        style={{margin: "0"}}
                        onClick={() => {
                            setEditingProduct(null);
                            setFileList([]);
                            setIsDiscountChecked(false);
                            setIsStockChecked(false);
                            setIsModalVisible(true);
                        }}
                    >
                        <FaPlus/>
                    </button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={filteredProducts}
                rowKey="id"
                expandable={{
                    expandedRowRender: (record) => <>
                        <p style={{margin: 0}}>{record.description}</p>
                        <p style={{margin: 0}}>{record.descriptionAz}</p>
                        <p style={{margin: 0}}>{record.descriptionRu}</p>
                    </>,
                    rowExpandable: (record) => !!record.description,
                }}
                pagination={{
                    pageSize: 5
                }}
            />
            <Modal
                title={editingProduct ? "Məhsul Düzenlə" : "Məhsul Əlavə Et"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={1000}
            >
                <Form
                    form={form}
                    onFinish={(values) => {
                        const modifiedValues = {
                            ...values,
                            id: editingProduct?.id ?? false,
                            isDiscount: values.isDiscount ?? false,
                            isStock: values.isStock ?? false,
                        };
                        if (editingProduct) {
                            handleEditProduct(modifiedValues);
                        } else {
                            handleAddProduct(modifiedValues);
                        }
                    }}
                    labelCol={{style: {minWidth: '150px', textAlign: 'start'}}}
                >
                    <Form.Item label="Kateqoriya Seç" name="categoryId">
                        <Select placeholder="Kateqoriya seçin" allowClear>
                            {categories.map((category) =>
                                    category.subCategories && category.subCategories.length > 0 && (
                                        <OptGroup key={category.id} label={category.name}>
                                            {category.subCategories.map((subCategory) => (
                                                <Option key={subCategory.id} value={subCategory.id}>
                                                    {subCategory.name}
                                                </Option>
                                            ))}
                                        </OptGroup>
                                    )
                            )}
                        </Select>

                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Ad (EN)"
                        rules={[{required: true, message: 'Məhsul adı tələb olunur!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="nameAz"
                        label="Ad (AZ)"
                        rules={[{required: true, message: 'Məhsul adı tələb olunur!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="nameRu"
                        label="Ad (RU)"
                        rules={[{required: true, message: 'Məhsul adı tələb olunur!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Qiymət"
                        rules={[{required: true, message: 'Qiymət tələb olunur!'}]}
                    >
                        <InputNumber min={0}/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Təsvir (EN)"
                        rules={[{required: true, message: 'Təsvir tələb olunur!'}]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item
                        name="descriptionAz"
                        label="Təsvir (AZ)"
                        rules={[{required: true, message: 'Təsvir tələb olunur!'}]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item
                        name="descriptionRu"
                        label="Təsvir (RU)"
                        rules={[{required: true, message: 'Təsvir tələb olunur!'}]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item
                        name="isDiscount"
                        valuePropName="checked"
                    >
                        <Checkbox onChange={(e) => setIsDiscountChecked(e.target.checked)}>
                            Endirimli
                        </Checkbox>
                    </Form.Item>
                    {isDiscountChecked && (
                        <Form.Item
                            name="discountPrice"
                            label="Endirimli Qiymət"
                            rules={[{required: true, message: 'Endirimli qiymət tələb olunur!'}]}
                        >
                            <InputNumber min={0}/>
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Şəkillər"
                        rules={[{required: true, message: "Ən az bir şəkil əlavə edin!"}]}
                    >
                        <Upload {...uploadProps}>
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Şəkil əlavə et</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <div style={{
                        color: 'red',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        marginTop: '10px',
                    }}><Info style={{
                        fontSize: '14px'
                    }}/>Hər şeyi yüklədikdən sonra düyməni yalnız bir dəfə sıxın və gözləyin.
                    </div>
                    <div style={{
                        color: 'red',
                        display: 'flex',
                        gap: '10px',
                        marginBottom: '30px',
                        alignItems: 'center'
                    }}><Info style={{
                        fontSize: '14px'
                    }}/>Ard-arda bir neçə dəfə düyməni klikləməyin!
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{backgroundColor: '#0DA5B5'}}>
                            {editingProduct ? 'Yadda Saxla' : 'Əlavə Et'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
}

export default ProductPanel;