import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './home.css'
import placeholder from '../../assets/john doe.jpg'
import gal from '../../assets/learning.jpg'
import part from '../../assets/LOGO PRINCIPAL.png'
const Home = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState({});
  const [training, setTraining] = useState({});
  useEffect(() => {
    Axios.get("https://api.digimytch.com/api/getposts").then((data) => {
      setPostList(data.data[0]);
    })
    Axios.get("https://api.digimytch.com/api/get_trainings").then((data)=> {
      setTraining(data.data[0]);
    })
  },[])
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
            <p id='paragraph_tr' dangerouslySetInnerHTML={{__html: training.descr?.substr(0,350) + '...'}} />
            <div className="dmt__button-white">
              <button onClick={()=> {navigate(`/training/${training.id}`); window.scrollTo({ top: 0, behavior: "smooth" })}}>Savoir Plus</button>
            </div>
          </div>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>Découvrez notre dernier article</h2>
        
        <h4>{postList.title}</h4>
        <p id='latest_date'>{new Date(postList.date).toDateString()}</p>
        <div className="dmt__gradient-button">
          <button onClick={()=> {navigate(`/blogs/${postList.id}`); window.scrollTo({ top: 0, behavior: "smooth" })}}>Read more</button>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h4>Besoin de nous contacter ?</h4>
        <div className="dmt__gradient-button">
          <button onClick={()=> {navigate('/contact'); window.scrollTo({ top: 0, behavior: "smooth" })}}>Envoyez un message</button>
        </div>
      </div>
      <div className="dmt__home-feedbacks">
        <div className="dmt__home-feedbacks_title">
          <h2>Feedbacks</h2>
        </div>
        <div className="dmt__home-feedbacks_content section__padding">
          <div className="dmt__home-feedbacks_content-item">
            <div className="dmt__home-feedbacks_content-item_left">
              <img src={placeholder} alt="PlaceHolder" />
              <h5>Firstname, Lastname</h5>
            </div>
            <div className="dmt__home-feedbacks_content-item_middle"></div>
            <div className="dmt__home-feedbacks_content-item_right">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
          </div>
          <div className="dmt__home-feedbacks_content-item">
            <div className="dmt__home-feedbacks_content-item_left">
              <img src={placeholder} alt="PlaceHolder" />
              <h5>Firstname, Lastname</h5>
            </div>
            <div className="dmt__home-feedbacks_content-item_middle"></div>
            <div className="dmt__home-feedbacks_content-item_right">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
          </div>
          <div className="dmt__home-feedbacks_content-item">
            <div className="dmt__home-feedbacks_content-item_left">
              <img src={placeholder} alt="PlaceHolder" />
              <h5>Firstname, Lastname</h5>
            </div>
            <div className="dmt__home-feedbacks_content-item_middle"></div>
            <div className="dmt__home-feedbacks_content-item_right">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
          </div>
          <div className="dmt__home-feedbacks_content-item">
            <div className="dmt__home-feedbacks_content-item_left">
              <img src={placeholder} alt="PlaceHolder" />
              <h5>Firstname, Lastname</h5>
            </div>
            <div className="dmt__home-feedbacks_content-item_middle"></div>
            <div className="dmt__home-feedbacks_content-item_right">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>Savoir plus à propos de nous</h2>
        <p>DIGIMYTCH est une plate-forme en ligne qui propose des cours de design et de marketing à toute personne désireuse d'apprendre des formateurs expérimentés, nous remodelons la façon dont les entreprises, les concepteurs et les spécialistes du marketing se correspondent. Notre plateforme mettra en relation les recruteurs avec les designers et...</p>
        <div className="dmt__gradient-button">
          <button onClick={()=> {navigate("/about");window.scrollTo({ top: 0, behavior: "smooth" });}}>Read more</button>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>Nos Partenaires</h2>
        <img src={part} alt="Partenaire" />
      </div>
    </div>
  )
}

export default Home
