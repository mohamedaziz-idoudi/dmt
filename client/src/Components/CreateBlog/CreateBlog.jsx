import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import Axios from 'axios';
import axios from 'axios';
const CreateBlog = () => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState("");
    const [image, setImage] = useState();
    const [vAfter, setVafter] = useState(false);
    const [blogs, setBlogs] = useState(false);
    const uploadImage = (e) => {
        setBlogs(true);
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "dmt_image-upload");

        Axios.post("https://api.cloudinary.com/v1_1/dbx8tzoes/image/upload", formData).then(async (response) => {
            console.log(response);
            await e.preventDefault();
            await e.stopPropagation();
            setVafter(true);
            axios.post("https://api.digimytch.com/api/post", { title: title, paragraph: text, image: response.data.secure_url, video: video }).then(() => {
                setBlogs(false);
            });
        })
    }
    return (
        <div className="dmt__dashboard-control">
            {!blogs && (
                <div className="dmt__dashboard-control">
                    <label>Insert an image</label>
                    <input type="file" name='file' onChange={(e) => {
                        setImage(e.target.files[0]);
                    }} disabled={blogs} />
                    <label >Insert link to your video (Optional)</label>
                    <input type="link" onChange={(e) => {
                        setVideo(e.target.value);
                    }} disabled={blogs} />
                    <label>Title: </label>
                    <input type="text" onChange={(e) => {
                        setTitle(e.target.value);
                    }} disabled={blogs} />
                    <label>BLOG: </label>
                    <ReactQuill theme="snow" value={text} onChange={setText} className='blog_area' disabled={blogs} />
                    <div className='dmt__gradient-button'>
                        <button onClick={uploadImage}>Submit</button>
                    </div>
                </div>
            )}
            {vAfter && (
                <div className="dmt__dashboard-content">
                    <h1>You have submitted the blog successfuly! </h1>
                </div>
            )}
        </div>
    )
}

export default CreateBlog