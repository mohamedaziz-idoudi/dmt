import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './form.css'
const Form = ({ id }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [training, setTraining] = useState([{}])
    const [show, setShow] = useState(false);
    useEffect(() => {
        Axios.post("https://api.digimytch.com/api/get_tr", { id: id }).then((data) => {
            setTraining(data.data[0]);
        })
    }, [])
    const handleClose = () => {
        setShow(false);
        navigate('/trainings')
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    const form = useRef();
    const ref_name = useRef(null);
    const ref_email = useRef(null);
    const ref_phone = useRef(null);
    const ref_message = useRef(null);
    const ref_subject = useRef(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [genre, setGenre] = useState("");
    const [level, setLevel] = useState("");
    const [text, setText] = useState("");
    const sendEmail = (e) => {

        e.preventDefault();
        Axios.post("https://api.digimytch.com/api/signup", { name: name, email: email, phone: phone, training: training.title, level: level, gender: genre, message: text }).then(() => {
            emailjs.sendForm('service_rb196iw', 'template_4vx2rwa', form.current, '2AP9rVVU2Z79Wm255')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            setShow(true);
            ref_name.current.value = null;
            ref_email.current.value = null;
            ref_phone.current.value = null;
            ref_message.current.value = null;
            ref_subject.current.value = null;
            document.getElementById("notification").innerHTML = "You have successfuly subscribed!";
        })

    };
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    function isValidEmail(emaill) {
        return /\S+@\S+\.\S+/.test(emaill);
    }
    const handleChange = event => {
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError(null);
        }
        setEmail(event.target.value);
        setMessage(event.target.value);
    };
    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('form.header')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('form.body')}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        {t('form.button')}
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="dmt__contact">
                <div className="formbold-main-wrapper">
                    <div className="formbold-form-wrapper">
                        <form ref={form} onSubmit={sendEmail}>
                            <div className="formbold-mb-5">
                                <label for="name" className="formbold-form-label"> Nom et Prénom </label>
                                <input
                                    type="text" name="user_name" ref={ref_name}
                                    id="name"
                                    placeholder="Full Name"
                                    className="formbold-form-input"
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>

                            <div className="formbold-mb-5">
                                <label for="email" className="formbold-form-label"> Adresse Electronique </label>
                                <input
                                    type="email" value={message}
                                    onChange={handleChange} name="user_email" ref={ref_email}
                                    id="email"
                                    placeholder="Enter your email"
                                    className="formbold-form-input"
                                />
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>
                            <div className="formbold-mb-5">
                                <label for="email" className="formbold-form-label"> Numero de téléphone </label>
                                <input
                                    type="tel" pattern="^[0-9]{3,45}$" name='user_phone' ref={ref_phone}
                                    id="tel"
                                    placeholder="Enter your Phone Number"
                                    className="formbold-form-input"
                                    onChange={(e) => { setPhone(e.target.value) }}
                                />
                            </div>

                            <div className="formbold-mb-5">
                                <label for="subject" className="formbold-form-label"> Niveau </label>
                                <select name="level" id="level" onChange={(e) => { setLevel(e.target.value) }}>
                                    <option value="">---Please Select---</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                            <div className="formbold-mb-5">
                                <label for="subject" className="formbold-form-label"> Sexe </label>
                                <select name="gender" id="gender" onChange={(e) => { setGenre(e.target.value) }}>
                                    <option value="">---Please Select---</option>
                                    <option value="Homme">Homme</option>
                                    <option value="Femme">Femme</option>
                                </select>
                            </div>

                            <div className="formbold-mb-5">
                                <label for="message" className="formbold-form-label"> Additional Message </label>
                                <textarea
                                    rows="6"
                                    name="message"
                                    ref={ref_message}
                                    id="message"
                                    placeholder="Type your message"
                                    className="formbold-form-input"
                                    onChange={(e) => { setText(e.target.value) }}
                                ></textarea>
                            </div>

                            <div>
                                <input type="submit" className="formbold-btn" value="Envoyer" />
                                <p id='notification'></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Form