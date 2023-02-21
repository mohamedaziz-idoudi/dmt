import React, { useState, useEffect } from 'react'
import './dashboard.css'
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import ReactQuill from 'react-quill';
import { Image } from 'cloudinary-react'
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { CreateBlog, Inscriptions } from '../../Components';
import Axios from 'axios';
import axios from 'axios';
import logo from '../../assets/logo.png'
import Table from 'react-bootstrap/Table';
import CRUD_TR from '../CRUD_TR/CRUD_TR';

const Dashboard = ({ setAuth }) => {
  const navigate = useNavigate()
  const [blog, setBlog] = useState(false)
  const [sign, setSign] = useState(false)
  const [training, setTraining] = useState(false)
  const [instructor, setInstructor] = useState(false);
  const [person, setPerson] = useState({});
  const [trainers, setTrainers] = useState([{}]);
  const [add, setAdd] = useState(false);
  const [name, setName] = useState('');
  const [stat, setStat] = useState('');
  const [photo, setPhoto] = useState();
  const [vv, setVv] = useState(false);
  const [nname, setNname] = useState('');
  const [nphoto, setNphoto] = useState();
  const [nstat, setNstat] = useState('');
  const [editImage, setEditImage] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editStat, setEditStat] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [loading, setLoading] = useState(false);
  const [loadAdd, setLoadAdd] = useState(false);
  const [modDel, setmodDel] = useState(false);
  const [addCat, setAddCat] = useState(false);
  const [delIns,setDelIns] = useState(false);
  const [listCat, setListCat] = useState([{}]);

  const changeName = async (e) => {
    await e.preventDefault();
    await e.stopPropagation();
    Axios.post("https://api.digimytch.com/api/changename", { id: person.id, name: nname })
    setPerson(prevState => ({ ...prevState, nom: nname }))
    setEditName(false);
  }
  const fetchCat = async () => {
    Axios.get("https://api.digimytch.com/api/getcats").then((data) => {
      setListCat(data.data);
    })
  }
  const changeStat = async (e) => {
    await e.preventDefault();
    await e.stopPropagation();
    Axios.post("https://api.digimytch.com/api/changestat", { id: person.id, stat: nstat });
    setPerson(prevState => ({ ...prevState, stat: nstat }));
    setEditStat(false);
  }
  useEffect((e) => {
    setAuth(true);
    if (e && e.preventDefault()) { e.preventDefault() }
    Axios.get("https://api.digimytch.com/api/gettrainers").then((data) => {
      setTrainers(data.data);
    }, []);
    fetchCat();

  }, [add]);

  const addInstructor = (e) => {
    setLoadAdd(true);
    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "dmt_image-upload");

    Axios.post("https://api.cloudinary.com/v1_1/dbx8tzoes/image/upload", formData).then(async (response) => {
      console.log(response);
      await e.stopPropagation();
      await setAdd(false);
      await setVv(true);
      axios.post("https://api.digimytch.com/api/addinstructor", { name: name, stat: stat, photo: response.data.secure_url }).then(() => {
        setLoadAdd(false);
      });
    })
  }
  const editPhoto = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", nphoto);
    formData.append("upload_preset", "qv2eyer0");

    Axios.post("https://api.cloudinary.com/v1_1/dbx8tzoes/image/upload", formData).then(async (response) => {
      setEditImage(false);
      setPerson(prevState => ({ ...prevState, photo: response.data.secure_url }));
      await Axios.post("https://api.digimytch.com/api/editphoto", { photo: response.data.secure_url, id: person.id })
      document.getElementById("notification_post").innerHTML = "Photo updated!";
    }).then(() => {
      setLoading(false);
    })
  }
  return (
    <React.Fragment>
      <div className="dmt__dashboard">
        <div className="dmt__dashboard-header">
          <h1>Welcome to your admin dashboard</h1>
        </div>
        <div className="dmt__dashboard-content">
          <div className="dmt__dashboard-sidebar">
            <img src={logo} alt="LOGO" />
            <div className="dmt__dashboard-sidebar_links">
              <ul>
                <li onClick={() => { setBlog(true); setSign(false); setTraining(false); setInstructor(false) }}>Create Blog</li>
                <li onClick={() => { setBlog(false); setSign(true); setTraining(false); setInstructor(false) }}>Consult Sign Ups</li>
                <li onClick={() => { setBlog(false); setSign(false); setTraining(true); setInstructor(false); }}>Manage Trainings</li>
                <li onClick={() => { setBlog(false); setSign(false); setTraining(false); setInstructor(true) }}>Manage Instructors</li>
              </ul>
            </div>
          </div>
          {blog && (
            <CreateBlog />
          )}
          {training && (
            <CRUD_TR />
          )}
          {sign && (
            <Inscriptions />
          )}
          {
            instructor && (
              <div className="dmt__dashboard-control">
                <div className="dashboard__title">
                  <h1>Manage your trainers</h1>
                  <p>Add an instructor</p>
                  <AiIcons.AiOutlineAppstoreAdd className='table__icons table__icons-elt' onClick={() => {
                    setAdd(true);
                    setLoadAdd(false);
                  }} />
                  {add && (
                    <React.Fragment>
                      <div className="adding form">
                        {loadAdd && (
                          <div className="loading-animation">
                            Loading...
                          </div>
                        )}
                        <label>Insert the image</label>
                        <input type="file" name='file' onChange={(e) => {
                          setPhoto(e.target.files[0]);
                        }} disabled={loadAdd} />
                        <label>Name: </label>
                        <input type="text" onChange={(e) => {
                          setName(e.target.value);
                        }} disabled={loadAdd} />
                        <label>Status: </label>
                        <input type="text" onChange={(e) => {
                          setStat(e.target.value);
                        }} disabled={loadAdd} />
                        <div className='dmt__gradient-button'>
                          <button onClick={addInstructor}>Add</button>
                        </div>
                        <div className="dmt__gradient-button">
                          <button onClick={() => { setAdd(false); }}>Consult the list</button>
                        </div>
                      </div>
                      {vv && (
                        <div className="dmt__dashboard-contents">
                          <h1>You have added the instructor successfuly! </h1>
                          <div className="dmt__gradient-button">
                            <button onClick={() => { setAdd(false); setVv(false); }}>Consult the list</button>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </div>
                {!edit && !add && (
                  <div className="dashboard__content dashboard_table">
                    <Table striped bordered hover variant="dark" style={{ width: '50vw' }}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Instructor</th>
                          <th>Status</th>
                          <th>Tools</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from(trainers).map((val, key) => {
                          return (
                            <tr key={key} onClick={() => { setSelectedRow(key); console.log(key) }} style={{ backgroundColor: selectedRow === key ? 'white' : 'black' }}>
                              <th>{key + 1}</th>
                              <th>{val.nom}</th>
                              <th>{val.stat}</th>
                              <th className='table__icons'>
                                <AiIcons.AiOutlineEdit className='table__icons-elt' onClick={async (e) => {
                                  await e.preventDefault();
                                  await e.stopPropagation();
                                  setEdit(true);
                                  setLoading(false);
                                  Axios.post("https://api.digimytch.com/api/get_instructor", { id: val.id }).then((data) => {
                                    setPerson(data.data[0]);
                                  })
                                }} />
                                <AiIcons.AiOutlineDelete className='table__icons-elt' onClick={() => {
                                  axios.post("https://api.digimytch.com/api/deleteinstructor", { id: val.id });
                                  setDelIns(true);
                                  Axios.get("https://api.digimytch.com/api/gettrainers").then((data) => {
                                    setTrainers(data.data);
                                  });
                                }} /></th>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}

                {edit && (
                  <div className="dashboard__content edit_instructor">
                    <div className="adding form">
                      <div className="contact__line">
                        <label>Name: </label>
                        <h4>{person.nom}</h4>
                      </div>
                      <div className="dmt__gradient-button">
                        <button onClick={() => setEditName(true)}>Edit</button>
                      </div>
                      {editName && (
                        <div>
                          <input type="text" onChange={(e) => {
                            setNname(e.target.value);
                          }} />
                          <div className="dmt__gradient-button">
                            <button onClick={changeName}>Save</button>
                          </div>
                        </div>

                      )}
                      <div className="contact__line">
                        <label>Photo: </label>
                        <Image
                          cloudName="dbx8tzoes"
                          publicId={person.photo}
                          id="cloud_image2" />
                      </div>
                      <div className="dmt__gradient-button">
                        <button onClick={() => {
                          setEditImage(true);
                          setLoading(false);
                        }}>Edit</button>
                        <p id='notification_post'></p>
                      </div>
                      {editImage && (
                        <div className="dashboard__content input-container">
                          <input type="file" name='file' onChange={(e) => { setNphoto(e.target.files[0]); }} disabled={loading} />
                          {loading && (
                            <div className="loading-animation">
                              Loading...
                            </div>
                          )}
                          <div className='dmt__gradient-button'>
                            <button onClick={editPhoto}>Save</button>

                          </div>
                        </div>
                      )}
                      <div className="contact__line">
                        <label>Status: </label>
                        <h4>{person.stat}</h4>
                      </div>
                      <div className='dmt__gradient-button'>
                        <button onClick={() => setEditStat(true)}>Edit</button>
                      </div>
                      {editStat && (
                        <div className="dashboard__content">
                          <input type="text" onChange={(e) => {
                            setNstat(e.target.value);
                          }} />
                          <div className="dmt__gradient-button">
                            <button onClick={changeStat}>Save</button>
                          </div>
                        </div>
                      )}
                      <div className="dmt__gradient-button">
                        <button onClick={() => { setEdit(false); }}>Consult the list</button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )
          }
        </div>
      </div>

    </React.Fragment>
  )
}

export default Dashboard