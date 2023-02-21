import React from 'react'
import './footer.css'
import logo from '../../assets/logo.png'
import * as GoIcons from 'react-icons/go'
import * as AiIcons from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
import {useTranslation} from 'react-i18next'
const Footer = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return (
        <div className='arsolaire__footer'>
            <footer>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-sm-4 col-md-3 item" id='arsolaire_def'>
                            <img src={logo} alt="LOGO" />
                        </div>
                        <div class="col-sm-4 col-md-3 item">
                            <h3>Contact</h3>
                            <p>{t('footer.contact')}</p>
                        </div>
                        <div class="col-sm-4 col-md-3 item footer_item">
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
                        <div class="col-lg-3 item social">
                            <a href="https://www.facebook.com/profile.php?id=100088438584749" target="_blank" rel="noreferrer"><i class="icon ion-social-facebook"></i></a>
                            <a href="https://tn.linkedin.com/company/digimytch?trk=public_profile_topcard-current-company" target="_blank" rel="noreferrer"><i class="icon ion-social-linkedin"></i></a>
                            <a href="#"><i class="icon ion-social-youtube"></i></a>
                            <a href="https://www.instagram.com/digimytch.tn/?hl=fr"target="_blank" rel="noreferrer"><i class="icon ion-social-instagram"></i></a>
                            <a href="https://www.tiktok.com/@digimitch" target="_blank" rel="noreferrer"><Icon icon="ion:logo-tiktok" /></a>
                            <p class="copyright"><a href="https://www.facebook.com/profile.php?id=100085406739373" target="blank">© Created by ONCA Solution - 2022</a></p>
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