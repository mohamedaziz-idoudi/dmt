import React from 'react'
import './footer.css'
import logo from '../../assets/logo.png'
import * as GoIcons from 'react-icons/go'
import * as AiIcons from 'react-icons/ai'
import * as react from '@iconify/react';
import {useTranslation} from 'react-i18next'
const Footer = () => {
    const {t} = useTranslation();
    return (
        <div className='arsolaire__footer'>
            <footer>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-4 col-md-3 item" id='arsolaire_def'>
                            <img src={logo} alt="LOGO" />
                        </div>
                        <div className="col-sm-4 col-md-3 item">
                            <h3>Contact</h3>
                            <p>{t('footer.contact')}</p>
                        </div>
                        <div className="col-sm-4 col-md-3 item footer_item">
                            <h3>{t('footer.coor')}</h3>
                            <div className="arsolaire__footer_line">
                                <GoIcons.GoLocation className='footer__icon' />
                                <p>{t('footer.address')}</p>
                            </div>
                            <div className="arsolaire__footer_line">
                                <AiIcons.AiFillPhone className='footer__icon' />
                                <p>(+216) 94881032</p>
                            </div>
                            <div className="arsolaire__footer_line">
                                <GoIcons.GoMail className='footer__icon' />
                                <p id='footer_email'>digimytch@gmail.com</p>
                            </div>
                        </div>
                        <div className="col-lg-3 item social">
                            <a href="https://www.facebook.com/profile.php?id=100088438584749" target="_blank" rel="noreferrer"><i className="icon ion-social-facebook"></i></a>
                            <a href="https://tn.linkedin.com/company/digimytch?trk=public_profile_topcard-current-company" target="_blank" rel="noreferrer"><i className="icon ion-social-linkedin"></i></a>
                            <a href="#"><i className="icon ion-social-youtube"></i></a>
                            <a href="https://www.instagram.com/digimytch.tn/?hl=fr"target="_blank" rel="noreferrer"><i className="icon ion-social-instagram"></i></a>
                            <a href="https://www.tiktok.com/@digimytch.com?_d=secCgYIASAHKAESPgo8YhDciGd7c36XWjE7tsXWcuKolhTUMdpUxdG47vfj56qInXjelwzGNte13W0JGoUj9Sziu67LilTU1VMyGgA%3D&checksum=ce1295612ee9eef9f4ff5cce3eff56b61438b7301ac0ecd580f074be6c92093a&language=fr&sec_uid=MS4wLjABAAAAV_BXKm21nrpRddPklBRh4gMgYoGkLexZiBingL69plV9tfU8KeMpoo4S_MVPKE4k&sec_user_id=MS4wLjABAAAAECNzoVnxANkfrYQt_WCQM0RPsZO1p-SKkI1bhpBcbgAgOx5k4dgeETmGBlVeh3Z3&share_app_id=1340&share_author_id=7204017771608212485&share_link_id=29af4068-7e74-4bd7-bbc4-d16390419a2b&timestamp=1678475985&u_code=dc6c018dj2e1j3&ugbiz_name=Account&user_id=6821662282637444101&utm_campaign=client_share&utm_source=copy&_r=1" target="_blank" rel="noreferrer"><react.Icon icon="ion:logo-tiktok" /></a>
                            <p className="copyright"><a href="https://www.facebook.com/profile.php?id=100085406739373" target="blank">© Created by ONCA Solution - 2022</a></p>
                        </div>
                    </div>
                </div>
            </footer>
            <script src="https://code.iconify.design/iconify-icon/1.0.5/iconify-icon.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
        </div>
    )
}

export default Footer