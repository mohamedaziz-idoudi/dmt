import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import * as HiIcons from 'react-icons/hi';
import Table from 'react-bootstrap/Table';
import './inscription.css'
const Inscriptions = () => {
    const [signs, setSigns] = useState([{}]);
    const [view, setView] = useState(false);
    const [selectedSign, setSelectedSign] = useState({});
    useEffect(() => {
        Axios.get("https://api.digimytch.com/api/getsigns").then((data) => {
            setSigns(data.data)
        });
    })
    return (
        <div className="dmt__dashboard-control">
            {!view && (
                <div className="dashboard__content dashboard_table">
                    <Table striped bordered hover variant="dark" style={{ width: '50vw' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Training</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Consult</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(signs).map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <th>{key + 1}</th>
                                        <th>{val.training}</th>
                                        <th>{val.nom}</th>
                                        <th>{val.email}</th>
                                        <th className='table__icons'>
                                            <HiIcons.HiViewGrid className='table__icons-elt' onClick={() => {
                                                setView(true);
                                                Axios.post("https://api.digimytch.com/api/get_s", { id: val.id }).then((data) => {
                                                    setSelectedSign(data.data[0]);
                                                })
                                            }} /></th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
            {view && (
                <div className="dmt__dashboard-control">
                    <div className="adding form">
                        <div className="contact__line">
                            <label>Name: </label>
                            <h4>{selectedSign.nom}</h4>
                            <label>Training: </label>
                            <h4>{selectedSign.training}</h4>
                            <label>Email: </label>
                            <h4>{selectedSign.email}</h4>
                            <label>Phone Number: </label>
                            <h4>{selectedSign.phone}</h4>
                            <label>Gender</label>
                            <h4>{selectedSign.gender}</h4>
                            <label>Level</label>
                            <h4>{selectedSign.lvl}</h4>
                            <label>Message</label>
                            <h4>{selectedSign.message}</h4>
                        </div>
                    </div>
                    <div className="dmt__gradient-button">
                        <button onClick={() => { setView(false); }}>Go back</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Inscriptions