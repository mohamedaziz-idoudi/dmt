import React, { useState } from 'react'
import axios from 'axios'
const Testimonials = () => {
    const [blogs, setBlogs] = useState(false)
    const [vAfter, setVAfter] = useState(false)
    const [name, setName] = useState('')
    const [occ, setOcc] = useState('')
    const [desc, setDesc] = useState('')
    const [message, setMessage] = useState('')
    const [loading,setLoading] = useState(false)
    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            await e?.preventDefault()
            await e?.stopPropagation()
            setMessage('Loading data...')
            const response = await axios.post('https://api.digimytch.com/api/testimonial', { name, occ, desc })
            setVAfter(true)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="dmt__dashboard-control">
            {!blogs && !vAfter && (
                <div className="dmt__dashboard-control">
                    <label>Full Name: </label>
                    <input type="text" onChange={(e) => {
                        setName(e.target.value);
                    }} disabled={blogs} />
                    <label>Occupation: </label>
                    <input type="text" onChange={(e) => {
                        setOcc(e.target.value);
                    }} disabled={blogs} />
                    <label>Testimonial </label>
                    <textarea onChange={(e) => {
                        setDesc(e.target.value);
                    }} disabled={blogs} />
                    <div className='dmt__gradient-button'>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                    {loading && (
                        <p className='text-alert'>{message}</p>
                    )}
                </div>
            )}
            {vAfter && (
                <div className="dmt__dashboard-content">
                    <h1>You have submitted the testimonial successfuly! </h1>
                    <div className='dmt__gradient-button'>
                        <button onClick={()=>{setVAfter(false)}}>Submit another one</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Testimonials