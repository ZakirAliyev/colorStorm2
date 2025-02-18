import './index.scss';
import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import {FaBars, FaChevronDown, FaChevronUp, FaFacebook, FaLinkedin, FaTwitter, FaYoutube} from 'react-icons/fa';
import {RxCross2} from 'react-icons/rx';
import {useNavigate} from 'react-router-dom';
import image1 from '/src/assets/whiteLogo.png';
import {useGetAllServicesQuery} from '../../apiServices/usersApi.jsx';
import {FaInstagram} from "react-icons/fa6";
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";

export default function BurgerMenu() {
    const [open, setOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleNavigate = (path) => {
        window.scrollTo(0, 0)
        navigate(path);
        setOpen(false);
    };

    const {data: getAllServices} = useGetAllServicesQuery();
    const services = getAllServices?.data;

    const {t} = useTranslation()

    const colorStormLang = Cookies.get("colorStormLang");

    const DrawerList = (
        <>
            <div onClick={toggleDrawer(false)} className="asdasd">
                <RxCross2 className="asdasd123"/>
            </div>
            <Box sx={{width: 350}} role="presentation" id="burgerMenu">
                <div className="wrapper">
                    <img src={image1} alt="Logo"/>
                    <div className="line"></div>
                    <div className="name" onClick={() => handleNavigate('/')}>
                        {t('Home page')}
                    </div>
                    <div className="name" onClick={() => handleNavigate('/products')}>
                        {t('Products')}
                    </div>
                    <div
                        style={{display: 'flex', alignItems: 'center'}}
                        onClick={() => setServicesOpen(!servicesOpen)}
                    >
                        <div className="name">{t('Services')}</div>
                        {servicesOpen ? (
                            <FaChevronUp className="chevron"/>
                        ) : (
                            <FaChevronDown className="chevron"/>
                        )}
                    </div>
                    {servicesOpen && services?.map((service, index) => (
                        <>
                            <div key={index} onClick={() => handleNavigate(`/services/${service?.id}`)}
                                 className="name name1">
                                {colorStormLang === 'en' ? service?.name :
                                    colorStormLang === 'az' ? service?.nameAz :
                                        colorStormLang === 'ru' && service?.nameRu}
                            </div>
                        </>
                    ))}
                    <div className="name" onClick={() => handleNavigate('/portfolio')}>
                        {t('Portfolio')}
                    </div>
                    <div className="name" onClick={() => handleNavigate('/about')}>
                        {t('About us')}
                    </div>
                    <div className="name" onClick={() => handleNavigate('/contact')}>
                        {t('Contact')}
                    </div>
                    <div className="line"></div>
                    <Divider/>
                </div>
                <div className="links1">
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaInstagram/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaFacebook/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaLinkedin/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaTwitter/></div>
                    <div className="link1" onClick={() => {
                        navigate('/')
                    }}><FaYoutube/></div>
                </div>
            </Box>
        </>
    );

    return (
        <div>
            <FaBars onClick={toggleDrawer(true)}/>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
