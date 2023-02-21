import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Image } from 'cloudinary-react';
import './about.css'
import logo from '../../assets/gold.png'
import deal from '../../assets/deal.png'
import community from '../../assets/community (1).png'
import sharing from '../../assets/send.png'
import teamwork from '../../assets/teamwork.png'
import { useTranslation } from 'react-i18next';
const About = () => {
  const {t} = useTranslation();
  const [instructors, setInstructors] = useState([{}]);
  useEffect(() => {
    axios.get("https://api.digimytch.com/api/gettrainers").then((data) => {
      setInstructors(data.data)
    })
  },[])
  return (
    <div className='dmt__about'>
      <div className="dmt__about-header">
        <h1>{t('about.title')}</h1>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>{t('about.section_title')}</h2>
        <p>{t('about.section_content')}</p>
        <img src={logo} alt="LOGO" />
      </div>
      <div className="dmt__about-values">
        <div className="dmt__about-values_header">
          <h2>{t('about.vtitle')}</h2>
        </div>
        <div className="dmt__about-values_content">
          <div className="dmt__about-values_content-item">
            <img src={community} alt="Community" />
            <h4>{t('about.comm')}</h4>
          </div>
          <div className="dmt__about-values_content-item">
            <img src={teamwork} alt="Teamwork" />
            <h4>{t('about.team')}</h4>
          </div>
          <div className="dmt__about-values_content-item">
            <img src={sharing} alt="Sharing" />
            <h4>{t('about.partage')}</h4>
          </div>
          <div className="dmt__about-values_content-item">
            <img src={deal} alt="Commitment" />
            <h4>{t('about.eng')}</h4>
          </div>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>{t('about.vision_title')}</h2>
        <p>{t('about.vision_content')}</p>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>{t('about.inst')}</h2>
        <div className="dmt__about-trainers section__padding">
          {instructors.map((val, key) => {
            return (
              <div key={key} className="dmt__about-trainers_item">
                <Image
                  cloudName="dbx8tzoes"
                  publicId={val.photo}
                  id="cloud_image" />
                <div className="dmt__about-trainers_item-paragraph">
                  <h5>{val.nom}</h5>
                  <p>{val.stat}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default About
