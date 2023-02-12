import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './home.css'
import placeholder from '../../assets/john doe.jpg'
import gal from '../../assets/learning.jpg'
const Home = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState({});
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getposts").then((data) => {
      setPostList(data.data[0]);
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
            <h2>Nom de Formation</h2>
            <h5>Du jj/mm au jj/mm</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
            <div className="dmt__button-white">
              <button>Savoir Plus</button>
            </div>
          </div>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>Découvrez notre dernier article</h2>
        <h4>{postList.title}</h4>
        <p id='latest_date'>{new Date(postList.date).toDateString()}</p>
        <div className="dmt__gradient-button">
          <button>Read more</button>
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
              <h5>Firstname,Lastname</h5>
            </div>
            <div className="dmt__home-feedbacks_content-item_middle"></div>
            <div className="dmt__home-feedbacks_content-item_right">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
          </div>
          <div className="dmt__home-feedbacks_content-item">
            <div className="dmt__home-feedbacks_content-item_left">
              <img src={placeholder} alt="PlaceHolder" />
              <h5>Firstname,Lastname</h5>
            </div>
            <div className="dmt__home-feedbacks_content-item_middle"></div>
            <div className="dmt__home-feedbacks_content-item_right">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
          </div>
          <div className="dmt__home-feedbacks_content-item">
            <div className="dmt__home-feedbacks_content-item_left">
              <img src={placeholder} alt="PlaceHolder" />
              <h5>Firstname,Lastname</h5>
            </div>
            <div className="dmt__home-feedbacks_content-item_middle"></div>
            <div className="dmt__home-feedbacks_content-item_right">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
          </div>
          <div className="dmt__home-feedbacks_content-item">
            <div className="dmt__home-feedbacks_content-item_left">
              <img src={placeholder} alt="PlaceHolder" />
              <h5>Firstname,Lastname</h5>
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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor...</p>
        <div className="dmt__gradient-button">
          <button>Read more</button>
        </div>
      </div>
      <div className="dmt__home-gallery">
        <div className="dmt__home-gallery_element">
          <div className="dmt__home-gallery_element-images">
            <div className="dmt__home-gallery_top">
              <img src={gal} alt="Image" />
              <img src={gal} alt="Image" />
            </div>
            <div className="dmt__home-gallery_buttom">
              <img src={gal} alt="Image" />
              <img src={gal} alt="Image" />
            </div>
          </div>

        </div>
        <div className="dmt__home-gallery_element-title gradient__text">
          <h2>Gallery</h2>
        </div>
        <div className="dmt__home-gallery_paragraph">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
