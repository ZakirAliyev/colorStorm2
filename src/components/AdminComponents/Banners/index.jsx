import './index.scss';
import { Table, Modal, Upload, Form, message, Input } from "antd";
import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import { BANNER_URL } from "../../../constants.js";
import {
    useDeleteBannerMutation,
    useGetAllBannersQuery,
    usePostCreateBannerMutation
} from "../../../apiServices/usersApi.jsx";

function Banners() {
    const { data: brandsData, refetch } = useGetAllBannersQuery();
    const brands = brandsData?.data;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const [postCreateBrand] = usePostCreateBannerMutation();
    const [deleteBrand] = useDeleteBannerMutation();

    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setFileList([]);
    };

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteBrand(id).unwrap();
            if (response?.statusCode === 200) {
                Swal.fire({
                    title: "Silindi!",
                    text: "Brand uğurla silindi.",
                    icon: "success",
                });
                refetch();
            } else {
                message.error("Brand silinərkən xəta baş verdi!");
            }
        } catch (error) {
            message.error("Xəta baş verdi: " + error.message);
        }
    };

    const handleAdd = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();
            console.log(values)
            formData.append("title", values.title);
            formData.append("subTitle", values.subTitle);
            formData.append("link", values.link);

            if (fileList.length > 0) {
                fileList.forEach((file) => {
                    formData.append("file", file.originFileObj);
                });
            }
            const response = await postCreateBrand(formData).unwrap();
            if (response?.statusCode === 201) {
                message.success("Brand uğurla əlavə edildi!");
                refetch();
                handleCancel();
            } else {
                message.error("Brand əlavə edilərkən xəta baş verdi!");
            }
        } catch (error) {
            message.error("Xəta baş verdi: " + error.message);
        }
    };

    const uploadProps = {
        onRemove: (file) => {
            setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
        },
        beforeUpload: (file) => {
            setFileList((prevList) => [...prevList, file]);
            return false;
        },
        fileList,
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Şəkil',
            render: (_, record) => (
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
                            objectFit: 'cover',
                            padding: '0',
                            borderRadius: '10px',
                        }}
                        src={BANNER_URL + record?.imageName}
                        alt="Product"
                    />
                </div>
            ),
        },
        {
            title: 'Əməliyyatlar',
            render: (_, record) => (
                <FiTrash
                    className="iconBrand"
                    onClick={() => handleDelete(record.id)}
                />
            ),
        },
    ];

    return (
        <section id="banners">
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '40px',
                marginBottom: '20px'
            }}>
                <Input
                    placeholder="Axtar"
                    style={{
                        width: '300px',
                        margin: 0,
                        visibility: 'hidden'
                    }}
                />
                <button style={{
                    margin: 0
                }} className="addButton112" onClick={showModal}>
                    <FaPlus />
                </button>
            </div>
            <Table
                columns={columns}
                dataSource={brands}
                rowKey={(record) => record.id}
                pagination={{
                    pageSize: 7,
                }}
            />
            <Modal
                title="Yeni Brand Əlavə Et"
                visible={isModalVisible}
                onOk={handleAdd}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Başlıq"
                        name="title"
                        rules={[{ required: true, message: "Başlıq daxil edin!" }]}
                    >
                        <Input placeholder="Başlıq" />
                    </Form.Item>
                    <Form.Item
                        label="Alt Başlıq"
                        name="subTitle"
                        rules={[{ required: true, message: "Alt başlıq daxil edin!" }]}
                    >
                        <Input placeholder="Alt Başlıq" />
                    </Form.Item>
                    <Form.Item
                        label="Link"
                        name="link"
                    >
                        <Input placeholder="Link" />
                    </Form.Item>
                    <Form.Item
                        label="Şəkillər"
                    >
                        <Upload {...uploadProps} listType="picture-card" onChange={handleUploadChange}>
                            {fileList.length < 1 && (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Şəkil əlavə et</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
}

export default Banners;