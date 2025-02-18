import './index.scss'
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {usePostContactSendMutation} from "../../apiServices/usersApi.jsx";
import Swal from "sweetalert2";

function ContactUs() {

    const {t} = useTranslation()
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        message: ""
    });

    const [postContactSend] = usePostContactSendMutation()


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const key in formData) {
            if (!formData[key].trim()) {
                alert(`${t('Please fill in all fields')}`);
                return;
            }
        }

        const submittedData = {
            fullName: `${formData.name} ${formData.surname}`,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            message: formData.message
        };

        const response = await postContactSend(submittedData).unwrap();
        if (response?.statusCode === 200) {
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: t('Message sent successfully!'),
                showConfirmButton: false,
                timer: 1500,
            });

            // Reset the form after successful submission
            setFormData({
                name: "",
                surname: "",
                email: "",
                phoneNumber: "",
                message: ""
            });
        }
    };



    return (
        <section id={"contactUs"}>
            <div className={"asdasdasdasd container"}>
                <h2>{t('Contact us')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={"row"}>
                        <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                            <div className={"row"}>
                                <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                                    <input
                                        placeholder={t('Name')}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                                    <input
                                        placeholder={t('Surname')}
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-12"}>
                                    <input
                                        placeholder={t('E-mail')}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-12"}>
                                    <input
                                        placeholder={t('Phone number')}
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={"row"}>
                                <div className={"col-12"}>
                                <textarea
                                    placeholder={t('Note')}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={7}/>
                                </div>
                            </div>
                            <div className={"button"}>
                                <button type={"submit"}>{t('SEND')}</button>
                            </div>
                        </div>
                        <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12151.553468224563!2d49.84801437002094!3d40.41132374304449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403063aa515792e5%3A0xda413cf31449a17a!2sAK%C4%B0AB%20MMC!5e0!3m2!1saz!2saz!4v1739192553010!5m2!1saz!2saz"
                                style={{
                                    border: 0
                                }} allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ContactUs;