import React, {useEffect, useState} from 'react';
import './index.scss';
import {Table, Input, Modal, Form, Button, Upload, message} from 'antd';
import {FaPlus} from 'react-icons/fa';
import {FiEdit, FiTrash} from 'react-icons/fi';
import {PlusOutlined} from '@ant-design/icons';
import {
    useDeleteServiceMutation,
    useGetAllServiceQuery,
    usePostCreateServiceMutation,
    usePostUpdateServiceMutation,
} from "../../../apiServices/usersApi.jsx";
import {CARD_BANNER_URL, CARD_URL} from "../../../constants.js";
import {Info} from "@mui/icons-material";

function ServicesPanel() {

    const {data: productsData, refetch: refetchProducts} = useGetAllServiceQuery();
    const products = productsData?.data || [];
    const [postCreateProduct] = usePostCreateServiceMutation()
    const [postUpdateProduct] = usePostUpdateServiceMutation()
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [banner, setBanner] = useState([]);

    const handleEditProduct = async (values) => {
        try {
            const formData = new FormData();
            formData.append("id", values.id);
            formData.append("name", values.name);
            formData.append("nameAz", values.nameAz);
            formData.append("nameRu", values.nameRu);
            formData.append("description", values.description);
            formData.append("descriptionAz", values.descriptionAz);
            formData.append("descriptionRu", values.descriptionRu);
            formData.append("subTitle", values.description);
            formData.append("subTitleAz", values.subTitleAz);
            formData.append("subTitleRu", values.subTitleRu);

            silinenSekiller.forEach((sekil) => {
                formData.append("deleteServiceImageNames", sekil);
            });

            fileList.forEach((file) => {
                formData.append("serviceImages", file.originFileObj || file.url);
            });

            // Check if a new banner image is uploaded
            if (banner.length > 0 && banner[0].originFileObj) {
                formData.append("serviceImageName", banner[0].originFileObj);
            } else if (editingProduct?.serviceImageName) {
                formData.append("serviceImageName", editingProduct.serviceImageName);
            }

            const response = await postUpdateProduct(formData).unwrap();
            if (response?.statusCode === 201) {
                alert("Servis uğurla yeniləndi.");
                refetchProducts();
            }

            setIsModalVisible(false);
        } catch (error) {
            console.error("Xəta baş verdi:", error);
            alert("Xəta baş verdi.");
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleAddProduct = async (values) => {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("nameAz", values.nameAz);
            formData.append("nameRu", values.nameRu);
            formData.append("description", values.description);
            formData.append("descriptionAz", values.descriptionAz);
            formData.append("descriptionRu", values.descriptionRu);
            formData.append("subTitle", values.subTitle);
            formData.append("subTitleAz", values.subTitleAz);
            formData.append("subTitleRu", values.subTitleRu);
            fileList.forEach((file) => {
                formData.append("serviceImages", file.originFileObj);
            });
            if (banner.length > 0) {
                formData.append("serviceImageName", banner[0].originFileObj);
            }
            const response = await postCreateProduct(formData).unwrap();
            if (response?.statusCode === 201) {
                alert("Servis uğurla əlavə edildi.");
                refetchProducts();
            }
            setIsModalVisible(false);
            setFileList([]);
            setBanner([]);
        } catch (error) {
            console.error("Xəta baş verdi:", error);
            alert("Xəta baş verdi.");
        }
    };

    const [silinenSekiller, setSilinenSekiller] = useState([]);

    useEffect(() => {
        if (!isModalVisible) {
            setFileList([]);
            setBanner([]);
            setEditingProduct(null);
        }
    }, [isModalVisible]);

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
            const isImageOrVideo = file.type.startsWith("image/") || file.type.startsWith("video/");
            if (!isImageOrVideo) {
                console.error("Yalnız şəkil və video yüklənə bilər.");
                return false;
            }

            setFileList((prevList) => [...prevList, file]);
            return false;
        },
        onRemove: (file) => {
            setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));

            if (file.url) {
                const trimmedUrl = file.url.split("services/")[1]; // "7d348f3a-a51d-4199-b538-0d3079bb2128.png"

                setSilinenSekiller((prevSilinenSekiller) => {
                    const yeniSilinenler = [...prevSilinenSekiller, trimmedUrl];
                    return yeniSilinenler;
                });
            }
        },
        accept: "image/*,video/*", // Sadece resim ve video kabul edilir
    };


    const uploadProps1 = {
        listType: "picture-card",
        fileList: banner,
        onChange: ({fileList: newBanner}) => {
            setBanner(newBanner);
        },
        beforeUpload: (file) => {
            setBanner([{...file, originFileObj: file}]); // Ensures it's correctly set
            return false;
        },
        onRemove: () => setBanner([]),
    };


    const handleEditClick = () => {
        setSilinenSekiller([]);
    };

    useEffect(() => {
        if (isModalVisible === false) {
            refetchProducts();
        }
    }, [isModalVisible]);

    const [deleteProduct] = useDeleteServiceMutation()


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Banner',
            dataIndex: 'serviceImageName',
            key: 'serviceImageName',
            render: (serviceImageName) => (
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
                        src={serviceImageName ? CARD_BANNER_URL + serviceImageName : ''}
                        alt="Product"
                    />
                </div>
            ),
        },
        {
            title: 'Ad (EN)',
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
            title: 'Şəkil sayı',
            dataIndex: 'serviceImages',
            key: 'serviceImages',
            render: (serviceImages) => (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {serviceImages.length}
                </div>
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
                                record.serviceImages?.map((url, index) => {
                                    const videoExtensions = [
                                        '.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.webm',
                                        '.mpeg', '.mpg', '.3gp', '.ogv', '.m4v'
                                    ];

                                    const isVideo = videoExtensions.some(ext => url.toLowerCase().endsWith(ext));

                                    return {
                                        uid: index,
                                        name: isVideo ? 'VIDEO' : `Image ${index + 1}`,
                                        status: 'done',
                                        url: CARD_URL + url,
                                    };
                                }) || []
                            );
                            setBanner(
                                record.serviceImageName
                                    ? [{
                                        uid: 0,
                                        name: "Banner Image",
                                        status: "done",
                                        url: CARD_BANNER_URL + record.serviceImageName,
                                        originFileObj: null, // Ensures we track old images
                                    }]
                                    : []
                            );
                            setIsModalVisible(true);
                        }}
                    />
                    <FiTrash
                        style={{cursor: 'pointer', fontSize: '18px'}}
                        onClick={async () => {
                            try {
                                const response = await deleteProduct(record?.id).unwrap()
                                if (response.statusCode === 200) {
                                    message.success("Servis uğurlu silindi!")
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
                description: editingProduct.description || '',
                descriptionAz: editingProduct.descriptionAz || '',
                descriptionRu: editingProduct.descriptionRu || '',
                subTitle: editingProduct.subTitle || '',
                subTitleAz: editingProduct.subTitleAz || '',
                subTitleRu: editingProduct.subTitleRu || '',
                serviceImageName: editingProduct.serviceImageName || '',
            });
        } else {
            form.resetFields();
        }
    }, [editingProduct, form]);


    return (
        <section id="servicesPanel">
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
                    <button
                        className="addButton111"
                        style={{margin: "0"}}
                        onClick={() => {
                            setEditingProduct(null);
                            setFileList([]);
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
                title={editingProduct ? "Servis Düzenlə" : "Servis Əlavə Et"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={1000}
            >
                <Form
                    form={form}
                    onFinish={(values) => {
                        if (fileList.length === 0) {
                            message.error("Ən az bir iç şəkil əlavə edin!");
                            return;
                        }

                        if (banner.length === 0) {
                            message.error("Ən az bir banner şəkli əlavə edin!");
                            return;
                        }

                        const modifiedValues = {
                            ...values,
                            id: editingProduct?.id ?? false,
                        };

                        if (editingProduct) {
                            handleEditProduct(modifiedValues);
                        } else {
                            handleAddProduct(modifiedValues);
                        }
                    }}
                    labelCol={{style: {minWidth: "150px", textAlign: "start"}}}
                >
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
                        name="subTitle"
                        label="Alt başlıq (EN)"
                        rules={[{required: true, message: 'Təsvir tələb olunur!'}]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item
                        name="subTitleAz"
                        label="Alt başlıq (AZ)"
                        rules={[{required: true, message: 'Təsvir tələb olunur!'}]}
                    >
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item
                        name="subTitleRu"
                        label="Alt başlıq (RU)"
                        rules={[{required: true, message: 'Təsvir tələb olunur!'}]}
                    >
                        <Input.TextArea/>
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
                        label="İç şəkillər"
                        rules={[{required: true, message: "Ən az bir şəkil əlavə edin!"}]}
                    >
                        <Upload {...uploadProps}>
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Şəkil əlavə et</div>
                            </div>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="serviceImageName"
                        label="Banner"
                        rules={[{required: true, message: "Ən az bir şəkil əlavə edin!"}]}
                    >
                        <Upload {...uploadProps1}>
                            {banner.length === 0 && (
                                <div>
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Şəkil əlavə et</div>
                                </div>
                            )}
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

export default ServicesPanel;