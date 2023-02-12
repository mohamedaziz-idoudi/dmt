import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Image } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';
import './blogs.css'
const Blogs = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getposts").then((data) => {
      setPostList(data.data);
    })
  },[])
  return (
    <div className='dmt__blogs section__padding'>
      {Array.from(postList).map((val, key) => {
        return (
          <div className="dmt__blogs-item" key={key}>
            <div className="blogs__container-post_caption">
              <h4>{new Date(val.date).toDateString()}</h4>
              <h2>{val.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: val.paragraph.length > 250 ? val.paragraph.substring(0, 250) + "..." : val.paragraph }} />
              <button>Read more</button>
            </div>
            <Image
              cloudName="dbx8tzoes"
              publicId={val.image}
              id="cloud_image" />
          </div>
        )
      })}
    </div>
  )
}

export default Blogs
