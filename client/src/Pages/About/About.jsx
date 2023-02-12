import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Image } from 'cloudinary-react';
import './about.css'
import logo from '../../assets/gold.png'
import deal from '../../assets/deal.png'
import community from '../../assets/community (1).png'
import sharing from '../../assets/send.png'
import teamwork from '../../assets/teamwork.png'
import john from '../../assets/john.jpg';
import jane from '../../assets/jane.jpg';
const About = () => {
  const [instructors, setInstructors] = useState([{}]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/gettrainers").then((data) => {
      setInstructors(data.data)
    })
  })
  return (
    <div className='dmt__about'>
      <div className="dmt__about-header">
        <h1>A propos de nous</h1>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>En savoir plus sur notre mission</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <img src={logo} alt="LOGO" />
      </div>
      <div className="dmt__about-values">
        <div className="dmt__about-values_header">
          <h2>Nos Valeurs</h2>
        </div>
        <div className="dmt__about-values_content">
          <div className="dmt__about-values_content-item">
            <img src={community} alt="Community" />
            <h4>Communauté</h4>
          </div>
          <div className="dmt__about-values_content-item">
            <img src={teamwork} alt="Teamwork" />
            <h4>Travail en équipe</h4>
          </div>
          <div className="dmt__about-values_content-item">
            <img src={sharing} alt="Sharing" />
            <h4>Partage</h4>
          </div>
          <div className="dmt__about-values_content-item">
            <img src={deal} alt="Commitment" />
            <h4>Engagement</h4>
          </div>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>Notre Vision</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>Notre Equipe</h2>
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
