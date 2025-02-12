import React, { useState } from 'react';
import './index.scss';
import { Table, Button } from 'antd';
import { useGetAllOrdersQuery, useDeleteOrderMutation, useGetProductByIdQuery } from "../../../apiServices/usersApi.jsx";
import { FiTrash } from "react-icons/fi";
import {PRODUCT_URL} from "../../../constants.js";

function Orders() {
    const { data: getAllOrders, refetch: refetchOrders } = useGetAllOrdersQuery();
    const [deleteOrder] = useDeleteOrderMutation();
    const orders = getAllOrders?.data || [];

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);

    // Fetch product data only when a product ID is selected
    const { data: productData } = useGetProductByIdQuery(selectedProductId, {
        skip: !selectedProductId,
    });

    const handleDelete = async (id) => {
        await deleteOrder(id);
        refetchOrders();
    };

    const handleExpand = (expanded, record) => {
        if (expanded) {
            setSelectedProductId(record.productId);
            setExpandedRowKeys([record.id]);
        } else {
            setSelectedProductId(null);
            setExpandedRowKeys([]);
        }
    };

    const expandedRowRender = () => {
        if (!productData) return <p>Loading product details...</p>;

        const product = productData.data;
        return (
            <div className="product-details">
                <h3>{product.name}</h3>
                <p><strong>Category:</strong> {product.categoryName}</p>
                <p><strong>Price:</strong> {product.price} {product.isDiscount && `(Discounted: ${product.discountPrice})`}</p>
                <p><strong>Description:</strong> {product.description}</p>
                {product.images.length > 0 && (
                    <img src={PRODUCT_URL + product.images[0]} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                )}
            </div>
        );
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Product ID', dataIndex: 'productId', key: 'productId' },
        { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Company Name', dataIndex: 'companyName', key: 'companyName' },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Button type="danger" onClick={() => handleDelete(record.id)} style={{ fontSize: '18px' }}>
                    <FiTrash />
                </Button>
            ),
        },
    ];

    return (
        <section id="orders">
            <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                pagination={{ pageSize: 7 }}
                expandable={{
                    expandedRowRender,
                    rowExpandable: (record) => !!record.productId,
                    expandedRowKeys,
                    onExpand: handleExpand,
                }}
            />
        </section>
    );
}

export default Orders;
