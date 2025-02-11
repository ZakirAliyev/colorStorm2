import './index.scss';
import { Table, Button } from 'antd';
import { useGetAllOrdersQuery, useDeleteOrderMutation } from "../../../apiServices/usersApi.jsx";
import {FiTrash} from "react-icons/fi";

function Orders() {
    const { data: getAllOrders } = useGetAllOrdersQuery();
    const [deleteOrder] = useDeleteOrderMutation();
    const orders = getAllOrders?.data || [];

    const handleDelete = (id) => {
        deleteOrder(id);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product ID',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button type="danger" onClick={() => handleDelete(record.id)} style={{
                    fontSize: '18px',
                }}>
                    <FiTrash />
                </Button>
            ),
        },
    ];

    return (
        <section id="orders">
            <Table columns={columns} dataSource={orders} rowKey="id" pagination={{
                pageSize: 7,
            }} />
        </section>
    );
}

export default Orders;
