import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Image } from 'cloudinary-react';
import {Form} from '../../Components'
import './training.css'
const Training = () => {
    let { trainingID } = useParams();
    const [training, setTraining] = useState({});
    useEffect(() => {
        Axios.get(`https://api.digimytch.com/api/getseltrain/${trainingID}`).then((data) => {
            setTraining(data.data[0])
        })
    }, [])
    return (
        <div className='dmt__training-container fade-in'>
            <div className="dmt__training-container_header section__padding">
                <Image
                    cloudName="dbx8tzoes"
                    publicId={training.photo}
                    id="cloud_image" />
                <h1 className='gradient__text'>{training.title}</h1>
                <h5>{training.duration}</h5>
                <div className="dmt__training-dark_decoration"></div>
            </div>
            <div className="dmt__training-container_content section__padding">
                <div className="dmt__training-container_content-item">
                    <h4>Description</h4>
                    <p dangerouslySetInnerHTML={{ __html: training.descr }} />
                </div>
                <div className="dmt__training-container_content-item">
                    <h4>Contenu</h4>
                    <p dangerouslySetInnerHTML={{ __html: training.content }} />
                </div>
                <div className="dmt__training-container_content-item">
                    <h4>Prix</h4>
                    <p>{training.price}</p>
                </div>
            </div>
            <div className="dmt__training-container_sign">
                <div className="dmt__training-container_sign-header">
                    <h2>Inscription</h2>
                </div>
                <div className="dmt__training-container_sign-form">
                    <Form id={trainingID} />
                </div>
            </div>
        </div >
    )
}

export default Training