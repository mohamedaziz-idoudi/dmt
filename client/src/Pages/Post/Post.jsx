import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import './post.css'
const Post = () => {
    const navigate = useNavigate();
    let { blogID } = useParams();
    const [blog, setBlog] = useState({});
    useEffect(() => {
        Axios.get(`https://api.digimytch.com/api/getblog/${blogID}`).then((result) => {
            setBlog({ title: result.data[0].title, paragraph: result.data[0].paragraph, image: result.data[0].image, video: result.data[0].video, date: result.data[0].date });

        });
    }, []);
    return (
        <div className="dmt__blog-post">
            <div className='dmt__training-container'>
                <div className="dmt__training-container_header section__padding">
                    <Image
                        cloudName="dbx8tzoes"
                        publicId={blog.image}
                        id="cloud_image" />
                    <h1 className='gradient__text'>{blog.title}</h1>
                    <h5>{blog.date}</h5>
                    <div className="dmt__training-dark_decoration"></div>
                </div>
                <div className="dmt__training-container_contentt">
                    <p dangerouslySetInnerHTML={{ __html: blog.paragraph }} />
                </div>
            </div >
        </div>
    )
}

export default Post