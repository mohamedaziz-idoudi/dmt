/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './home.css'
import part1 from '../../assets/logostudentplus.png'
import part2 from '../../assets/fst.png'
import part from '../../assets/LOGO PRINCIPAL.png'
import { useTranslation } from 'react-i18next'
const Home = () => {
  const [playAnimation, setPlayAnimation] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [postList, setPostList] = useState({});
  const [training, setTraining] = useState({});
  const [partners, setPartners] = useState([{}])
  const [testimonials, setTestimonials] = useState([{}])
  useEffect(() => {
    Axios.get('https://api.digimytch.com/api/gettestimonials').then((data) => {
      setTestimonials(data.data)
    })
    Axios.get("https://api.digimytch.com/api/getposts").then((data) => {
      setPostList(data.data[0]);
    })
    Axios.get('https://api.digimytch.com/api/getpartners').then((data) => {
      setPartners(data.data)
    })
    Axios.get("https://api.digimytch.com/api/get_trainings").then((data) => {
      setTraining(data.data[0]);
    })
    const onPageLoad = () => {
      setPlayAnimation(true);
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, [])
  return (
    <div className='dmt__home fade-in'>
      <div className="dmt__home-header">
        <div className="dmt__home-header_content fade-in">
          <div className="dmt__home-header_content-left">
            <h1>{t('home.header.title')}</h1>
          </div>
          <div className="dmt__home-header_content-right">
            <h2>{training.title}</h2>
            <h5>{training.duration}</h5>
            <p id='paragraph_tr' dangerouslySetInnerHTML={{ __html: training.descr?.substr(0, 350) + '...' }} />
            <div className="dmt__button-white">
              <button onClick={() => { navigate(`/training/${training.id}`); window.scrollTo({ top: 0, behavior: "smooth" }) }}>{t('home.header.button')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>{t('home.headlights.blogs')}</h2>

        <h4>{postList.title}</h4>
        <p id='latest_date'>{new Date(postList.date).toDateString()}</p>
        <div className="dmt__gradient-button">
          <button onClick={() => { navigate(`/blogs/${postList.id}`); window.scrollTo({ top: 0, behavior: "smooth" }) }}>{t('home.headlights.button')}</button>
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h4>{t('home.headlights.contact')}</h4>
        <div className="dmt__gradient-button">
          <button onClick={() => { navigate('/contact'); window.scrollTo({ top: 0, behavior: "smooth" }) }}>{t('home.headlights.contact_button')}</button>
        </div>
      </div>
      <div className="dmt__home-feedbacks">
        <div className="dmt__home-feedbacks_title">
          <h2>Feedbacks</h2>
        </div>
        <div className="dmt__home-feedbacks_content section__padding">
          {Array.from(testimonials).map((val, key) => (
            <div className="dmt__home-feedbacks_content-item" key={key}>
              <div className="dmt__home-feedbacks_content-item_left">
                <h5>{val.name}</h5>
                <p>{val.occupation}</p>
              </div>
              <div className="dmt__home-feedbacks_content-item_middle"></div>
              <div className="dmt__home-feedbacks_content-item_right">
                <p>{`"${val.testimonial}"`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="dmt__about-mission section__padding">
        <h2>{t('home.plus.title')}</h2>
        <p>{t('home.plus.content')}</p>
        <div className="dmt__gradient-button">
          <button onClick={() => { navigate("/about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Read more</button>
        </div>
      </div>
      <div className="dmt__about-mission dmt__partners section__padding">
        <h2>{t('home.partners')}</h2>
        <div className="dmt__partners-images">
          {Array.from(partners).map((val, key) => (
            <a href="#">
              <img src={val.link} alt="Partner Logo" key={key} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
