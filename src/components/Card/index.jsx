import './index.scss';
import {useState} from 'react';
import {Modal, Input, Button, message,} from 'antd';
import {PRODUCT_URL} from "../../constants.js";
import {useCreateOrderMutation} from "../../apiServices/usersApi.jsx";

function Card({product}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [createOrder, {isLoading}] = useCreateOrderMutation();

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const showProductModal = () => {
        setIsModalOpen(true);
    };

    const handleProductCancel = () => {
        setIsModalOpen(false);
    };

    const showOrderModal = () => {
        setIsOrderModalOpen(true);
    };

    const handleOrderCancel = () => {
        setIsOrderModalOpen(false);
    };

    const handleOrderSubmit = async () => {
        try {
            const payload = {
                productId: product?.id,
                fullName,
                email,
                phoneNumber,
                companyName,
            };
            await createOrder(payload).unwrap();
            message.success('Sifariş uğurla göndərildi!');
            handleOrderCancel();
        } catch (error) {
            message.error('Sifarişi göndərərkən xəta baş verdi!');
        }
    };

    return (
        <div className="bx col-3 col-md-6 col-sm-6 col-xs-6">
            <section id="product">
                <img src={PRODUCT_URL + product?.images[0]} alt="Product"/>
                <div className="wrapper">
                    <div className="textWrapper">
                        <h6>{product?.categoryName}</h6>
                        <h5>{product?.name}</h5>
                    </div>
                    <button onClick={showProductModal}>MƏHSULU İNCƏLƏ</button>
                </div>
            </section>

            {/* Product Details Modal */}
            <Modal
                open={isModalOpen}
                onCancel={handleProductCancel}
                footer={null}
                centered
                className="custom-modal"
                width={1000}
            >
                <div className="modal-content">
                    <img src={PRODUCT_URL + product?.images[0]} alt="Modal"/>
                    <div className="modal-text">
                        <div>
                            <h2>{product?.categoryName}</h2>
                            <h3>{product?.name}</h3>
                            <p>{product?.description}</p>
                        </div>
                        <div className="modal-buttons">
                            <Button type="primary" onClick={showOrderModal}>
                                SİFARİŞ ET
                            </Button>
                            <Button type="default">
                                ƏLAQƏYƏ KEÇ
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                open={isOrderModalOpen}
                onCancel={handleOrderCancel}
                footer={null}
                centered
                className="order-modal"
                width={450}
            >
                <div className="order-modal-content">
                    <div style={{
                        marginTop: '50px',
                        color: 'white',
                        padding: '0px 10px 5px 10px',
                        fontWeight: '200',
                        fontSize: '14px',
                    }}>Şirkət Adı
                    </div>
                    <Input
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="order-input"
                    />
                    <div style={{
                        color: 'white',
                        padding: '0px 10px 5px 10px',
                        fontWeight: '200',
                        fontSize: '14px',
                    }}>Ad, Soyad
                    </div>
                    <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="order-input"
                    />
                    <div style={{
                        color: 'white',
                        padding: '0px 10px 5px 10px',
                        fontWeight: '200',
                        fontSize: '14px',
                    }}>Email
                    </div>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="order-input"
                    />
                    <div style={{
                        color: 'white',
                        padding: '0px 10px 5px 10px',
                        fontWeight: '200',
                        fontSize: '14px',
                    }}>Telefon nömrəsi
                    </div>
                    <Input
                        prefix="+994"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="order-input"
                    />
                    <div className="quantity-selector">
                        <label style={{
                            color: 'white',
                            padding: '0px 10px 5px 10px',
                            fontWeight: '200',
                            fontSize: '14px',
                        }}>Məhsul sayı:</label>
                        <div className="quantity-controls">
                            <Button onClick={decreaseQuantity}>-</Button>
                            <Input value={quantity} readOnly className="quantity-input"/>
                            <Button onClick={increaseQuantity} className={"btnbtn1"}>+</Button>
                        </div>
                    </div>
                    <Input.TextArea
                        rows={4}
                        placeholder={"Əlavə qeyd"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="order-input"
                    />
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Button
                            type="primary"
                            block
                            className="order-submit"
                            onClick={handleOrderSubmit}
                            loading={isLoading}
                            style={{
                                maxWidth: '200px',
                                width: '100%',
                            }}
                        >
                            SİFARİŞ ET
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Card;
