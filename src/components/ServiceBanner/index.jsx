import React, {useState} from 'react';
import {Modal, Input, Button} from 'antd';
import './index.scss';
import {SERVICE_CARD_URL} from "../../constants.js";
import Cookies from "js-cookie";
import {useTranslation} from "react-i18next";
import {usePostWorkOrderMutation} from "../../apiServices/usersApi.jsx";
import Swal from "sweetalert2";

function ServiceBanner({service}) {
    const {t} = useTranslation();
    const colorStormLang = Cookies.get("colorStormLang");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        workId: service?.id, // Check if service and id are defined
        companyName: "",
        fullName: "",
        email: "",
        phoneNumber: ""
    });

    const [postWorkOrder] = usePostWorkOrderMutation()

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleOrderSubmit = async () => {
        console.log("Form Data:", formData); // Debug için
        if (!formData.companyName || !formData.fullName || !formData.email || !formData.phoneNumber) {
            alert(t("Please fill all required fields!"));
            return;
        }

        const response = await postWorkOrder(formData).unwrap();
        if (response?.statusCode === 200) {
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: t('Service successfully ordered!'),
                showConfirmButton: false,
                timer: 1500,
            });
        }

        setIsLoading(true);
        setTimeout(() => {
            console.log("Submitted Data:", JSON.stringify(formData, null, 2));
            alert(t('Order submitted!'));
            setIsLoading(false);
            handleCancel();
        }, 1000);
    };

    return (
        <>
            <section id="serviceBanner"
                     style={{backgroundImage: `url(${SERVICE_CARD_URL + service?.serviceImageName})`}}>
                <div className="container container1">
                    <h2>
                        {service?.[colorStormLang === 'az' ? 'nameAz' : colorStormLang === 'ru' ? 'nameRu' : 'name']}
                    </h2>
                    <p>
                        {service?.[colorStormLang === 'az' ? 'subTitleAz' : colorStormLang === 'ru' ? 'subTitleRu' : 'subTitle']}
                    </p>
                    <button onClick={showModal}>{t('Contact us')}</button>
                </div>
            </section>
            <div className="bannerLayer"></div>

            <Modal footer={null} centered className="order-modal" width={450} visible={isModalVisible}
                   onCancel={handleCancel}>
                <div className="order-modal-content" style={{
                    marginTop: '50px'
                }}>
                    {['companyName', 'fullName', 'email', 'phoneNumber'].map((field, index) => (
                        <div key={index}>
                            <label className="order-label">{
                                field === 'companyName' ? <>{t('Company name')}</> :
                                    field === 'fullName' ? <>{t('Full name')}</> :
                                        field === 'email' ? <>{t('Email')}</> :
                                            field === 'phoneNumber' && <>{t('Phone number')}</>
                            }</label>
                            <Input className="order-input" name={field} value={formData[field]}
                                   onChange={handleInputChange}/>
                        </div>
                    ))}
                    <div className="order-submit-container">
                        <Button type="primary" block className="order-submit" onClick={handleOrderSubmit}
                                loading={isLoading}>
                            {t('ORDER NOW')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ServiceBanner;