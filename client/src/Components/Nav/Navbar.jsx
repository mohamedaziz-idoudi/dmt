import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import gold from '../../assets/gold.png'
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Menu = () => {
    return (
        <React.Fragment>
            <div className="dmt__navbar-links_container">
                <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                    <Link to="/">Accueil</Link>
                </p>
                <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }}>
                    <Link to="/about">A Propos+</Link>
                </p>
                <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }}>
                    <Link to="/trainings">Formations</Link>
                </p>
                <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }}>
                    <Link to="/blogs">Blogs</Link>
                </p>
                <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }}>
                    <Link to="/contact">Contactez Nous</Link>
                </p>
            </div>
        </React.Fragment>
    );
};

const Navbar = () => {
    const navigate = useNavigate();
    const [toggleMenu, setToggleMenu] = useState(false);
    const [nav, setNav] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 60) {
            setNav(true)
        }
    }
    window.addEventListener('scroll', changeBackground);
    return (
        <React.Fragment>
            <div className={nav ? "dmt__navbar active" : "dmt__navbar"}>
                <div className="dmt__navbar-links_logo">
                    <img loading="lazy" src={nav ? gold : logo} alt="logo" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: "smooth" }) }} />
                </div>
                <div className="dmt__navbar-links">
                    <div className="dmt__navbar-links_container">
                        <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>
                            <Link to="/">Accueil</Link>
                        </p>
                        <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>
                            <Link to="/about">A Propos+</Link>
                        </p>
                        <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>
                            <Link to="/trainings">Formations</Link>
                        </p>
                        <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setNav(true); }}>
                            <Link to="/blogs">Blogs</Link>
                        </p>
                        <p onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>
                            <Link to="/contact">Contactez Nous</Link>
                        </p>
                    </div>
                </div>
                <div className="language">
                    <h5>FR/ENG</h5>
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
                                    <Link to="/" onClick={() => { setToggleMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }} >Accueil</Link>
                                </p>
                                <p>
                                    <Link to="/about" onClick={() => { setToggleMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>
                                        A Propos+
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/trainings" onClick={() => { setToggleMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); setNav(false); }}>Formations</Link>
                                </p>
                                <p>
                                    <Link to="/blogs" onClick={() => { setToggleMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); setNav(true); }}>Blogs</Link>
                                </p>
                                <p>
                                    <Link to="/contact" onClick={() => { setToggleMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }) }}>Contactez Nous</Link>
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
