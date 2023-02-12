import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './admin.css';

const Admin = ({ setAuth }) => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate('');
  const sign_in = () => {
    Axios.get("http://localhost:3001/api/login", {
      params: {
        user: user,
        pass: pwd
      }
    }).then((response) => {
      console.log(response.data);
      if (response.data) {
        setAuth(true);
      }
      else {
        setAuth(false);
      }
    }).then(() => {
      navigate('/dashboard');
      window.scrollTo({ top: 0, behavior: "smooth" })
    })

  }
  return (
    <div className="dmt__admin">
      <div className="dmt__admin-header">

      </div>
      <div class="theme-container grow">
        <div class="contact-con">
          <div class="contact">
            <p>Sign in</p>
            <form action="#" class="contact-form" autocomplete="off" method="">
              <div class="input-group first">
                <input id="user" required="" type="text" name="text" class="input" onChange={(e) => {
                  setUser(e.target.value);
                }} />
                <label class="user-label">Username</label>
              </div>
              <div class="input-group">
                <input type="password" name="password" required class="input" onChange={(e) => {
                  setPwd(e.target.value);
                }} />
                <label for="password" class="user-label">Password</label>
              </div>
            </form>
          </div>
          <div class="btn">
            <button class="cta" id="btn" onClick={sign_in}>
              <span class="hover-underline-animation"> Login </span>
              <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 46 16">
                <path id="Path_10" data-name="Path 10"
                  d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  )

}

export default Admin