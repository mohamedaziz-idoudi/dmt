import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import gold from '../../assets/gold.png'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./navbar.css";


const Navbar = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [nav, setNav] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 60) {
            setNav(true)
        }
    }
    window.addEventListener('scroll', changeBackground);
    useEffect(() => {
        for (let index = 0; index < document.getElementsByClassName("eden__lang").length; index++) {
            const element = document.getElementsByClassName("eden__lang")[index];
            if (element.value === i18n.language) {
                element.setAttribute("selected", "true");
            }
        }
    })
    const OnChangeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    }
    return (
        <React.Fragment>
            <div className={nav ? "dmt__navbar active" : "dmt__navbar"}>
                <div className="dmt__navbar-links_logo">
                    <img loading="lazy" src={nav ? gold : logo} alt="logo" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: "smooth" }) }} />
                </div>
                <div className="dmt__navbar-links">
                    <div className="dmt__navbar-links_container">
                        <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>
                            <Link to="/">{t('navbar.home')}</Link>
                        </p>
                        <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>
                            <Link to="/about">{t('navbar.about')}</Link>
                        </p>
                        <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>
                            <Link to="/trainings">{t('navbar.tr')}</Link>
                        </p>
                        <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setNav(true); }}>
                            <Link to="/blogs">Blogs</Link>
                        </p>
                        <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>
                            <Link to="/contact">{t('navbar.contact')}</Link>
                        </p>
                    </div>
                </div>
                <div className="language">
                    <div className="language_selector">
                        <select className="form-select" aria-label="Default select example" onChange={OnChangeLanguage} defaultValue="fr">
                            <option value="en" className="eden__lang">EN</option>
                            <option value="fr" className="eden__lang">FR</option>
                        </select>
                    </div>
                </div>
                <div className="dmt__navbar-menu">
                    {toggleMenu ? (
                        <RiCloseLine
                            color={nav ? "#845EC2" : "#fff"}
                            size={27}
                            onClick={() => setToggleMenu(false)}
                        />
                    ) : (
                        <RiMenu3Line
                            color={nav ? "#845EC2" : "#fff"}
                            size={27}
                            onClick={() => setToggleMenu(true)}
                        />
                    )}
                    {toggleMenu && (
                        <div className="dmt__navbar-menu_container scale-up-center">
                            <div className="dmt__navbar-menu_container-links">
                                <p>
                                    <Link to="/" onClick={() => { setToggleMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }} >{t('navbar.home')}</Link>
                                </p>
                                <p>
                                    <Link to="/about" onClick={() => { setToggleMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>
                                        {t('navbar.about')}
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/trainings" onClick={() => { setToggleMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>{t('navbar.tr')}</Link>
                                </p>
                                <p>
                                    <Link to="/blogs" onClick={() => { setToggleMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); setNav(true); }}>Blogs</Link>
                                </p>
                                <p>
                                    <Link to="/contact" onClick={() => { setToggleMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }) }}>{t('navbar.contact')}</Link>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navbar;
