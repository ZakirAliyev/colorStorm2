import './index.scss';
import {Modal, Input, Button, message} from 'antd';
import {PRODUCT_URL} from "../../constants.js";
import {useCreateOrderMutation} from "../../apiServices/usersApi.jsx";
import {useLocation, useNavigate} from "react-router";
import Cookies from "js-cookie";
import {useTranslation} from "react-i18next";
import {Swiper, SwiperSlide} from "swiper/react";
import React, {useEffect, useRef, useState} from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';
import 'aos/dist/aos.css';

function Card({product}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [language, setLanguage] = useState('');
    const [createOrder, {isLoading}] = useCreateOrderMutation();

    const location = useLocation();
    const colorStormLang = Cookies.get('colorStormLang');
    const {t} = useTranslation();

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

    useEffect(() => {
        const timer = setTimeout(() => {
            AOS.init({
                duration: 1000, // Animasyon süresi
                once: true, // Animasyon sadece bir kez çalışsın
            });
        }, 800); // 2 saniye gecikme

        return () => clearTimeout(timer); // Bileşen unmount olduğunda timer'ı temizle
    }, []);


    const handleOrderSubmit = async () => {
        try {
            const payload = {
                productId: product?.id,
                fullName,
                email,
                phoneNumber,
                companyName,
                quantity,
                description,
                language: Cookies.get('colorStormLang')
            };

            await createOrder(payload).unwrap();
            message.success('Sifariş uğurla göndərildi!');
            handleOrderCancel();
        } catch (error) {
            message.error('Sifarişi göndərərkən xəta baş verdi!');
        }
    };

    // Yardımcı fonksiyon: Metni 15 karakterden uzunsa kısaltır ve sonuna ... ekler
    const truncateText = (text) => {
        return text.length > 15 ? `${text.substring(0, 15)}...` : text;
    };

    const navigate = useNavigate();

    return (
        <div data-aos="fade-right"
            className={location.pathname === '/products' ? "bx col-4 col-md-6 col-sm-6 col-xs-6" : "bx col-3 col-md-6 col-sm-6 col-xs-6"}>
            <section id="product">
                <img src={PRODUCT_URL + product?.images[0]} alt="Product"/>
                <div className="wrapper">
                    <div className="textWrapper">
                        <h6>
                            {colorStormLang === 'en' ? truncateText(product?.categoryName) :
                                colorStormLang === 'az' ? truncateText(product?.categoryNameAz) :
                                    colorStormLang === 'ru' && truncateText(product?.categoryNameRu)}
                        </h6>
                        <h5>
                            {colorStormLang === 'en' ? truncateText(product?.name) :
                                colorStormLang === 'az' ? truncateText(product?.nameAz) :
                                    colorStormLang === 'ru' && truncateText(product?.nameRu)}
                        </h5>
                    </div>
                    <button onClick={showProductModal}>{t('PRODUCT REVIEW')}</button>
                </div>
            </section>

            <Modal
                open={isModalOpen}
                onCancel={handleProductCancel}
                footer={null}
                centered
                className="custom-modal"
                width={1000}
            >
                <div className="modal-content">
                    <div className={"img"}>
                        <Swiper
                            pagination={{
                                dynamicBullets: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {product.images && product.images.map((image) => (
                                <SwiperSlide>
                                    <img src={PRODUCT_URL + image} alt="Modal"/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="modal-text">
                        <div>
                            <h2>
                                {colorStormLang === 'en' ? product?.categoryName :
                                    colorStormLang === 'az' ? product?.categoryNameAz :
                                        colorStormLang === 'ru' && product?.categoryNameRu}
                            </h2>
                            <h3>
                                {colorStormLang === 'en' ? product?.name :
                                    colorStormLang === 'az' ? product?.nameAz :
                                        colorStormLang === 'ru' && product?.nameRu}
                            </h3>
                            <p>
                                {colorStormLang === 'en' ? product?.description :
                                    colorStormLang === 'az' ? product?.descriptionAz :
                                        colorStormLang === 'ru' && product?.descriptionRu}</p>
                        </div>
                        <div className="modal-buttons">
                            <Button type="primary" onClick={showOrderModal}>
                                {t('ORDER')}
                            </Button>
                            <Button type="default" onClick={() => {
                                window.scrollTo(0, 0);
                                navigate('/contact');
                            }}>
                                {t('CONTACT US')}
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
                    }}>{t('Company name')}
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
                    }}>{t('Firstname, Lastname')}
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
                    }}>{t('Email')}
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
                    }}>{t('Phone number')}
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
                        }}>{t('Product count')}:</label>
                        <div className="quantity-controls">
                            <Button onClick={decreaseQuantity}>-</Button>
                            <Input value={quantity} readOnly className="quantity-input"/>
                            <Button onClick={increaseQuantity} className={"btnbtn1"}>+</Button>
                        </div>
                    </div>
                    <Input.TextArea
                        rows={4}
                        placeholder={
                            colorStormLang === 'en' ? 'Additional note' :
                                colorStormLang === 'az' ? 'Əlavə qeyd' :
                                    colorStormLang === 'ru' ? 'Дополнительная заметка' : ''
                        }
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                            {t('ORDER NOW')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Card;