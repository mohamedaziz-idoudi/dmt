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
    axios.get("https://api.digimytch.com/api/gettrainers").then((data) => {
      setInstructors(data.data)
    })
  },[])
  return (
    <div className='dmt__about'>
      <div className="dmt__about-header">
        <h1>A propos de nous</h1>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>En savoir plus sur notre mission</h2>
        <p>DIGIMYTCH est une plate-forme en ligne qui propose des cours de design et de marketing à toute personne désireuse d'apprendre des formateurs expérimentés, nous remodelons la façon dont les entreprises, les concepteurs et les spécialistes du marketing se correspondent. Notre plate-forme associera les recruteurs aux designers et aux spécialistes du marketing disposant de l'expertise et de la disponibilité appropriées. Nous aidons les recruteurs à embaucher les meilleurs en fonction de leurs compétences qui leur ont été enseignées par nos formateurs avec des cours en ligne payants et en perfectionnant ceux existants.</p>
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
        <p>Ce sera la solution pour faire partager à la communauté ses compétences et apprendre aux gens la manière 100% pratique (avec de vrais projets) d'avoir un métier de designer ou de marketeur dans une entreprise, pas seulement théorique. Ce sera le guichet unique pour tous les recruteurs à la recherche de candidats compétents et qualifiés pour leur poste de conception ou de marketing.</p>
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
