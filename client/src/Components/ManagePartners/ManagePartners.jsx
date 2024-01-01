import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import Axios from 'axios';
import axios from 'axios';
const ManagePartners = () => {
    const [images, setImages] = useState()
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState(false)
    const [message, setMessage] = useState('')
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);
    };
    const uploadImage = async (e) => {
        try {
            setLoading(true)
            setMessage('Loading images')
            await e?.preventDefault()
            await e?.stopPropagation()
            const promises = images.map((image) => {
                const formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', 'dmt_image-upload');
                return axios.post('https://api.cloudinary.com/v1_1/dbx8tzoes/image/upload', formData)
                    .then((response) => response.data.secure_url);
            });

            const links = await Promise.all(promises);
            const response = await axios.post('https://api.digimytch.com/api/partners', { images: links })
            setLoading(false)
            setView(true)
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {!view ? (
                <div className="dmt__dashboard-control">
                    <label>Upload Images</label>
                    <input type="file" multiple onChange={handleImageChange} />
                    <div className="dmt__gradient-button">
                        <button onClick={uploadImage}>
                            Submit
                        </button>
                    </div>
                    {loading && (
                        <p className='text-alert'>{message}</p>
                    )}
                </div>
            ) : (
                <div className="dmt__dashboard-control">
                    <p>Partners logos uploaded successfuly</p>
                    <div className="dmt__gradient-button">
                        <button onClick={()=> {setView(false)}}>
                            Upload more
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ManagePartners