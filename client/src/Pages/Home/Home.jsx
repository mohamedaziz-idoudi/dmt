import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './home.css'
import placeholder from '../../assets/john doe.jpg'
import part1 from '../../assets/logostudentplus.png'
import part3 from '../../assets/Fichier 2.png'
import part2 from '../../assets/fst.png'
import part from '../../assets/LOGO PRINCIPAL.png'
const Home = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState({});
  const [training, setTraining] = useState({});
  useEffect(() => {
    Axios.get("https://api.digimytch.com/api/getposts").then((data) => {
      setPostList(data.data[0]);
    })
    Axios.get("https://api.digimytch.com/api/get_trainings").then((data) => {
      setTraining(data.data[0]);
    })
  }, [])
  return (
    <div className='dmt__home'>
      <div className="dmt__home-header">
        <div className="dmt__home-header_content fade-in">
          <div className="dmt__home-header_content-left">
            <h1>Découvrez nos dernières formations publiées</h1>
          </div>
          <div className="dmt__home-header_content-right">
            <h2>{training.title}</h2>
            <h5>{training.duration}</h5>
            <p id='paragraph_tr' dangerouslySetInnerHTML={{ __html: training.descr?.substr(0, 350) + '...' }} />
            <div className="dmt__button-white">
              <button onClick={() => { navigate(`/training/${training.id}`); window.scrollTo({ top: 0, behavior: "smooth" }) }}>Savoir Plus</button>
            </div>
          </div>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>Découvrez notre dernier article</h2>

        <h4>{postList.title}</h4>
        <p id='latest_date'>{new Date(postList.date).toDateString()}</p>
        <div className="dmt__gradient-button">
          <button onClick={() => { navigate(`/blogs/${postList.id}`); window.scrollTo({ top: 0, behavior: "smooth" }) }}>Read more</button>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h4>Besoin de nous contacter ?</h4>
        <div className="dmt__gradient-button">
          <button onClick={() => { navigate('/contact'); window.scrollTo({ top: 0, behavior: "smooth" }) }}>Envoyez un message</button>
        </div>
      </div>
      <div className="dmt__home-feedbacks">
        <div className="dmt__home-feedbacks_title">
          <h2>Feedbacks</h2>
        </div>
        <div className="dmt__home-feedbacks_content section__padding">
          <div className="dmt__home-feedbacks_content-item">
            <div className="dmt__home-feedbacks_content-item_left">
              <h5>Ellouze, Eya</h5>
              <p>Etudiante et fondatrice de "3inik lehlowa"</p>
            </div>
            <div className="dmt__home-feedbacks_content-item_middle"></div>
            <div className="dmt__home-feedbacks_content-item_right">
              <p>"Belhak kenet formation khfifa w taalamt menha barcha hajet fi periode sghira, chokran jazilan surtt aala wsaa bel mteeik maana"</p>
            </div>
          </div>
          <div className="dmt__home-feedbacks_content-item">
            <div className="dmt__home-feedbacks_content-item_left">
              <h5>Gataa, Imen</h5>
            </div>
            <div className="dmt__home-feedbacks_content-item_middle"></div>
            <div className="dmt__home-feedbacks_content-item_right">
              <p>"Je veux vraiment te remercier Nour alla kolchy amaltou maana tout au long de la formation, je suis très reconnaissante pour m'avoir donner l'occasion d'avoir toutes ces informations sur le design graphique 3awentni barcha théoriquement et sur tt pratiquement."</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>Savoir plus à propos de nous</h2>
        <p>DIGIMYTCH est une plate-forme en ligne qui propose des cours de design et de marketing à toute personne désireuse d'apprendre des formateurs expérimentés, nous remodelons la façon dont les entreprises, les concepteurs et les spécialistes du marketing se correspondent. Notre plateforme mettra en relation les recruteurs avec les designers et...</p>
        <div className="dmt__gradient-button">
          <button onClick={() => { navigate("/about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Read more</button>
        </div>
      </div>
      <div className="dmt__about-mission dmt__partners section__padding">
        <h2>Nos Partenaires</h2>
        <div className="dmt__partners-images">
          <a href="https://www.facebook.com/EnactusFSTmanar" target="_blank" rel="noreferrer"><img src={part2} alt="Partenaire" /></a>
          <a href="https://www.facebook.com/designersJE" target="_blank" rel="noreferrer"><img src={part} alt="Partenaire" /></a>
          <a href="https://studentplus.tn/" target="_blank" rel="noreferrer"><img src={part1} alt="Partenaire" /></a>
        </div>
      </div>
    </div>
  )
}

export default Home
