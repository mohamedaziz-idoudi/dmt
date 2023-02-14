import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './trainings.css'
const Trainings = () => {
  const navigate = useNavigate();
  const [cats, setCats] = useState([{}])
  const [selectedCat, setSelectedCat] = useState();
  const [trainingList, setTrainingList] = useState([{}])
  const [selection,setSelection] = useState(false);
  useEffect(() => {
    Axios.get("https://api.digimytch.com/api/getcats").then((data) => {
      setCats(data.data);
    })
  }, [])
  useEffect(() => {
    Axios.post("https://api.digimytch.com/api/gettrainings", { id: selectedCat }).then((data) => {
      setTrainingList(data.data);
    })
  }, [selectedCat])
  return (
    <div className='dmt__training'>
      <div className="dmt__training-header">
        <h1 className='gradient__text'>Nos Formations</h1>
      </div>
      <div className="dmt__training-cat section__padding">
        <div className="dmt__training-cat-head">
          <h4>Nos Catégories</h4>
          <p>Veuillez choisir une catégorie</p>
        </div>
        <div className="dmt__training-cat_items">
          {cats.map((val, key) => {
            return (
              <div className="dmt__training-cat_item" key={key} onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelection(true);
                setSelectedCat(val.id);
              }}>
                <h5>{val.cat_name}</h5>
              </div>
            )
          })}
        </div>
      </div>
      <div className="dmt__training-content section__padding">
        {trainingList.map((val, key) => {
          return (
            <div className="dmt__training-content_item" key={key}>
              <h2 className='gradient__text'>{val.title}</h2>
              <h5>{val.duration}</h5>
              <p dangerouslySetInnerHTML={{__html: val.descr?.length > 250 ? val.descr.substring(0,250) + "..." : val.descr  + "..." }} />
              <div className="dmt__gradient-button">
                <button onClick={()=> {navigate(`/training/${val.id}`);window.scrollTo({ top: 0, behavior: "smooth" })}}>Savoir Plus</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Trainings
