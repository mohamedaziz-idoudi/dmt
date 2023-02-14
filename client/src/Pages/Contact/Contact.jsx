import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import './contact.css'
const Contact = () => {
  const navigate=useNavigate();
  const form = useRef();
  const ref_name = useRef(null);
  const ref_email = useRef(null);
  const ref_phone = useRef(null);
  const ref_message = useRef(null);
  const ref_subject = useRef(null);
  const sendEmail = (e) => {

    e.preventDefault();

    emailjs.sendForm('service_tn9jpvj', 'template_luqo838', form.current, 'tksGU8BbYr7XGj3Db')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    ref_name.current.value = null;
    ref_email.current.value = null;
    ref_phone.current.value = null;
    ref_message.current.value = null;
    ref_subject.current.value = null;
    document.getElementById("notification").innerHTML = "Message sent successfully!";
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    setMessage(event.target.value);
  };
  return (
    <div className='dmt__contact'>
      <div className="dmt__contact-header">

      </div>
      <div className="contact_form">
        <div class="formbold-main-wrapper">
          <div class="formbold-form-wrapper">
            <form ref={form} onSubmit={sendEmail}>
              <div class="formbold-mb-5">
                <label for="name" class="formbold-form-label"> Nom et Prénom </label>
                <input
                  type="text" name="user_name" ref={ref_name}
                  id="name"
                  placeholder="Full Name"
                  class="formbold-form-input"
                />
              </div>

              <div class="formbold-mb-5">
                <label for="email" class="formbold-form-label"> Adresse Electronique </label>
                <input
                  type="email" value={message}
                  onChange={handleChange} name="user_email" ref={ref_email}
                  id="email"
                  placeholder="Enter your email"
                  class="formbold-form-input"
                />
                {error && <p style={{color: 'red'}}>{error}</p>}
              </div>
              <div class="formbold-mb-5">
                <label for="email" class="formbold-form-label"> Numero de téléphone </label>
                <input
                  type="tel" pattern="^[0-9]{3,45}$" name='user_phone' ref={ref_phone}
                  id="tel"
                  placeholder="Enter your Phone Number"
                  class="formbold-form-input"
                />
              </div>

              <div class="formbold-mb-5">
                <label for="subject" class="formbold-form-label"> Sujet </label>
                <input
                  type="text"
                  name="subject"
                  ref={ref_subject}
                  id="subject"
                  placeholder="Enter your subject"
                  class="formbold-form-input"
                />
              </div>

              <div class="formbold-mb-5">
                <label for="message" class="formbold-form-label"> Message </label>
                <textarea
                  rows="6"
                  name="message" 
                  ref={ref_message}
                  id="message"
                  placeholder="Type your message"
                  class="formbold-form-input"
                ></textarea>
              </div>

              <div>
                <input type="submit" class="formbold-btn" value="Envoyer" />
                <p id='notification'></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
