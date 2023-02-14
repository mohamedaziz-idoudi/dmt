import React, { useState, useEffect } from 'react'
import { Image } from 'cloudinary-react'
import * as AiIcons from 'react-icons/ai';
import Axios from 'axios';
import Table from 'react-bootstrap/Table';
import DatePicker from "react-datepicker";
import ReactQuill from 'react-quill';
import "react-datepicker/dist/react-datepicker.css";
import 'react-quill/dist/quill.snow.css';
import './crudtr.css'
const CRUD_TR = () => {
    const [listCat, setListCat] = useState([{}])
    const [addCat, setAddCat] = useState(false);
    const [edition, setEdition] = useState(false);
    const [selectedCat, setSelectedCat] = useState({});
    const [selectedTraining, setSelectedTraining] = useState({});
    const [trEdit, setTrEdit] = useState(false);
    const [catEdit, setCatEdit] = useState(false);
    const [name, setName] = useState('');
    const [edit, setEdit] = useState(false);
    const [addTraining, setAddTraining] = useState(false);
    const [tname, setTname] = useState('');
    const [photo, setPhoto] = useState();
    const [loading, setLoading] = useState(false);
    const [duration, setDuration] = useState('');
    const [text, setText] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    const [trainingList, setTrainingList] = useState([{}]);
    const [trainings, setTrainings] = useState(false);
    const [cats, setCats] = useState(true);
    const [deleteFlag, setDeleteFlag] = useState(false);
    const [editTitle, setEditTitle] = useState(false);
    const [editPhoto, setEditPhoto] = useState(false);
    const [editCont, setEditCont] = useState(false);
    const [editDes, setEditDes] = useState(false);
    const [editPrice, setEditPrice] = useState(false);
    const [editDuration, setEditDuration] = useState(false);
    const [title, setTitle] = useState('');
    const [ph, setPh] = useState('');
    const [cont, setCont] = useState('');
    const [des, setDes] = useState('');
    const [ndur, setNdur] = useState('');
    const [nprice, setNprice] = useState('');

    useEffect((e) => {
        if (e && e.preventDefault()) { e.preventDefault() }
        Axios.get("https://api.digimytch.com/api/getcats").then((data) => {
            setListCat(data.data);
        });
        Axios.post("https://api.digimytch.com/api/gettrainings", { id: selectedCat.id }).then((response) => {
            setTrainingList(response.data);
        })
    }, [cats, trainings])
    const update_photo = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", ph);
        formData.append("upload_preset", "qv2eyer0");

        Axios.post("https://api.cloudinary.com/v1_1/dbx8tzoes/image/upload", formData).then(async (response) => {
            setEditPhoto(false);
            setSelectedTraining(prevState => ({ ...prevState, photo: response.data.secure_url }));
            await Axios.post("https://api.digimytch.com/api/editphotoTR", { photo: response.data.secure_url, id: selectedTraining.id })
        })
    }
    const fetchCat = async () => {
        Axios.get("https://api.digimytch.com/api/getcats").then((data) => {
            setListCat(data.data);
        })
    }
    const fetchTrainings = async () => {
        Axios.post("https://api.digimytch.com/api/gettrainings", { id: selectedCat.id }).then((response) => {
            setTrainingList(response.data);
        })
    }
    const postTraining = async (e) => {
        setLoading(true);
        await e.preventDefault();
        await e.stopPropagation();
        const formData = new FormData();
        formData.append("file", photo);
        formData.append("upload_preset", "dmt_image-upload");
        Axios.post("https://api.cloudinary.com/v1_1/dbx8tzoes/image/upload", formData).then((response) => {
            Axios.post("https://api.digimytch.com/api/post_training", { photo: response.data.secure_url, title: tname, desc: text, content: content, price: price, duration: duration, cat: selectedCat.id }).then(() => { setLoading(false); })
            setTrainings(true);
            setAddTraining(false);
            setCatEdit(true);
            setTrainings(true);
        })
    }
    const update_content = () => {
        Axios.post("https://api.digimytch.com/api/updatecont", { cont: cont, id: selectedTraining.id });
        setSelectedTraining(prevState => ({ ...prevState, content: cont }));
        setEditCont(false);
    }
    const update_desc = () => {
        Axios.post("https://api.digimytch.com/api/updatedes", { descr: des, id: selectedTraining.id });
        setSelectedTraining(prevState => ({ ...prevState, descr: des }));
        setEditDes(false);
    }
    return (
        <div className="dmt__dashboard-control">
            {!edition && (
                <React.Fragment>
                    <h1>Create and manage trainings over this page</h1>
                    <p>Add a category</p>
                    <AiIcons.AiOutlineAppstoreAdd className='table__icons table__icons-elt' onClick={() => {
                        setAddCat(true);
                        setCats(false);
                    }} />
                    {addCat && (
                        <div className="dmt__dashboard-control">
                            <label>Choose a name for the Category</label>
                            <input type="text" onChange={(e) => {
                                setName(e.target.value);
                            }} />
                            <div className="dmt__gradient-button">
                                <button onClick={() => {
                                    Axios.post("https://api.digimytch.com/api/addcat", { name: name }).then(() => {
                                        Axios.get("https://api.digimytch.com/api/getcats").then((data) => {
                                            setListCat(data.data);
                                        })
                                    });
                                    setAddCat(false);
                                    setCats(true);
                                }}>Add</button>
                            </div>
                        </div>
                    )}
                    {cats && (<Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category</th>
                                <th>Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(listCat).map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <th>{key + 1}</th>
                                        <th>{val.cat_name}</th>
                                        <th className='table__icons'>
                                            <AiIcons.AiOutlineEdit className='table__icons-elt' onClick={async (e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setCatEdit(true);
                                                setEdition(true);
                                                Axios.post("https://api.digimytch.com/api/get_cat", { id: val.id }).then((data) => {
                                                    setSelectedCat(data.data[0]);
                                                })
                                            }} />
                                            <AiIcons.AiOutlineDelete className='table__icons-elt' onClick={() => {
                                                Axios.post("https://api.digimytch.com/api/delete_cat", { id: val.id });
                                                fetchCat();
                                            }} /></th>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>)}
                </React.Fragment>
            )}
            {catEdit && (
                <div className="dashboard__content">
                    <div className="adding form">
                        {!edit && (
                            <div className="contact__line">
                                <label>Name: </label>
                                <h4>{selectedCat.cat_name}</h4>
                                <div className="dmt__gradient-button">
                                    <button onClick={() => { setEdit(true); }}>Edit</button>
                                </div>
                            </div>
                        )}
                        {edit && (
                            <div className="contact__line">
                                <label>Name: </label>
                                <input type="text" onChange={(e) => {
                                    setName(e.target.value);
                                }} placeholder={selectedCat.cat_name} />
                                <div className="dmt__gradient-button">
                                    <button onClick={() => {
                                        Axios.post("https://api.digimytch.com/api/updatecat", { id: selectedCat.id, name: name });
                                        setSelectedCat(prevState => ({ ...prevState, cat_name: name }));
                                        setEdit(false);
                                    }}>Save</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="dmt__gradient-button">
                        <button onClick={() => { setCatEdit(false); setEdition(false); }}>Go Back to categories list</button>
                    </div>
                    <div className="dmt__gradient-button">
                        <button onClick={() => { setAddTraining(true); setCatEdit(false); setTrainings(false); setLoading(false); window.scrollTo({ top: 0, behavior: "smooth" }) }}>Add a new Training</button>
                    </div>
                    <div className="dmt__gradient-button">
                        <button onClick={() => { setCatEdit(false); setEdition(true); setTrainings(true) }}>Consult Trainings in this Category</button>
                    </div>
                </div>
            )}
            {trainings && (
                <div className="dmt__dashboard-control">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Training Title</th>
                                <th>Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(trainingList).map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <th>{key + 1}</th>
                                        <th>{val.title}</th>
                                        <th className='table__icons'>
                                            <AiIcons.AiOutlineEdit className='table__icons-elt' onClick={async (e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setTrainings(false);
                                                setTrEdit(true);
                                                Axios.post("https://api.digimytch.com/api/get_tr", { id: val.id }).then((data) => {
                                                    setSelectedTraining(data.data[0]);
                                                })
                                            }} />
                                            <AiIcons.AiOutlineDelete className='table__icons-elt' onClick={() => {
                                                Axios.post("https://api.digimytch.com/api/delete_train", { id: val.id });
                                                setDeleteFlag(true);
                                                setTrainings(false);
                                            }} /></th>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                    <div className="dmt__gradient-button">
                        <button onClick={() => { setCatEdit(false); setEdition(false); setTrainings(false); }}>Go Back to categories list</button>
                    </div>
                    <div className="dmt__gradient-button">
                        <button onClick={() => { setAddTraining(true); setCatEdit(false); setTrainings(false); setLoading(false); window.scrollTo({ top: 0, behavior: "smooth" }) }}>Add a new Training</button>
                    </div>
                </div>
            )}
            {trEdit && (
                <div className="dmt__dashboard-control">
                    {!editTitle && (
                        <div className="contact__line">
                            <label>Title: </label>
                            <h4>{selectedTraining.title}</h4>
                            <div className="dmt__gradient-button">
                                <button onClick={() => { setEditTitle(true); }}>Edit</button>
                            </div>
                        </div>
                    )}
                    {editTitle && (
                        <div className="contact__line">
                            <label>Title: </label>
                            <input type="text" onChange={(e) => {
                                setTitle(e.target.value);
                            }} placeholder={selectedTraining.title} />
                            <div className="dmt__gradient-button">
                                <button onClick={() => {
                                    Axios.post("https://api.digimytch.com/api/updatetraining", { id: selectedTraining.id, title: title });
                                    setSelectedTraining(prevState => ({ ...prevState, title: title }));
                                    setEditTitle(false);
                                }}>Save</button>
                            </div>
                        </div>
                    )}
                    {!editPhoto && (
                        <div className="contact__line">
                            <label>Photo: </label>
                            <Image
                                cloudName="dbx8tzoes"
                                publicId={selectedTraining.photo}
                                id="cloud_image2" />
                            <div className="dmt__gradient-button">
                                <button onClick={() => { setEditPhoto(true); }}>Edit</button>
                            </div>
                        </div>
                    )}
                    {editPhoto && (
                        <div className="dashboard__content input-container">
                            <input type="file" name='file' onChange={(e) => { setPh(e.target.files[0]); }} disabled={loading} />
                            {loading && (
                                <div className="loading-animation">
                                    Loading...
                                </div>
                            )}
                            <div className='dmt__gradient-button'>
                                <button onClick={() => {
                                    update_photo();
                                    setEditPhoto(false);
                                }}>Save</button>
                            </div>
                        </div>
                    )}
                    {!editCont && (
                        <div className="contact__line">
                            <label>Content: </label>
                            <p dangerouslySetInnerHTML={{ __html: selectedTraining.content }} />
                            <div className="dmt__gradient-button">
                                <button onClick={() => { setEditCont(true); }}>Edit</button>
                            </div>
                        </div>
                    )}
                    {editCont && (
                        <div className="contact__line">
                            <ReactQuill theme="snow" value={cont} onChange={setCont} className='blog_area' />
                            <div className="dmt__gradient-button">
                                <button onClick={() => {
                                    update_content();
                                    setEditCont(false);
                                }}>Save</button>
                            </div>
                        </div>
                    )}
                    {!editDes && (
                        <div className="contact__line">
                            <label>Description: </label>
                            <p dangerouslySetInnerHTML={{ __html: selectedTraining.descr }} />
                            <div className="dmt__gradient-button">
                                <button onClick={() => { setEditDes(true); }}>Edit</button>
                            </div>
                        </div>
                    )}
                    {editDes && (
                        <div className="contact__line">
                            <ReactQuill theme="snow" value={des} onChange={setDes} className='blog_area' />
                            <div className="dmt__gradient-button">
                                <button onClick={() => {
                                    update_desc();
                                    setEditDes(false);
                                }}>Save</button>
                            </div>
                        </div>
                    )}
                    {!editPrice && (
                        <div className="contact__line">
                            <label>Price: </label>
                            <h4>{selectedTraining.price}</h4>
                            <div className="dmt__gradient-button">
                                <button onClick={() => { setEditPrice(true); }}>Edit</button>
                            </div>
                        </div>
                    )}
                    {editPrice && (
                        <div className="contact__line">
                            <label>Price: </label>
                            <input type="text" onChange={(e) => {
                                setNprice(e.target.value);
                            }} placeholder={selectedTraining.price} />
                            <div className="dmt__gradient-button">
                                <button onClick={() => {
                                    Axios.post("https://api.digimytch.com/api/updateprice", { id: selectedTraining.id, price:nprice  });
                                    setSelectedTraining(prevState => ({ ...prevState, price:nprice }));
                                    setEditPrice(false);
                                }}>Save</button>
                            </div>
                        </div>
                    )}
                    {!editDuration && (
                        <div className="contact__line">
                            <label>Duration: </label>
                            <h4>{selectedTraining.duration}</h4>
                            <div className="dmt__gradient-button">
                                <button onClick={() => { setEditDuration(true); }}>Edit</button>
                            </div>
                        </div>
                    )}
                    {editDuration && (
                        <div className="contact__line">
                            <label>Duration: </label>
                            <input type="text" onChange={(e) => {
                                setNdur(e.target.value);
                            }} placeholder={selectedTraining.duration} />
                            <div className="dmt__gradient-button">
                                <button onClick={() => {
                                    Axios.post("https://api.digimytch.com/api/updatedur", { id: selectedTraining.id, duration:ndur  });
                                    setSelectedTraining(prevState => ({ ...prevState, duration:ndur }));
                                    setEditDuration(false);
                                }}>Save</button>
                            </div>
                        </div>
                    )}
                    <div className="dmt__gradient-button">
                        <button onClick={() => { setTrEdit(false); setTrainings(true); setCats(false); }}>Go Back to categories list</button>
                    </div>
                </div>
            )}
            {deleteFlag && (
                <div className="dmt__dashboard-control">
                    <label>You have successfuly deleted this training</label>
                    <div className="dmt__gradient-button">
                        <button onClick={() => { setCatEdit(false); setEdition(false); setDeleteFlag(false); }}>Go Back to categories list</button>
                    </div>
                    <div className="dmt__gradient-button">
                        <button onClick={() => { setCatEdit(false); setEdition(true); setTrainings(true); setDeleteFlag(false); }}>Consult Trainings in this Category</button>
                    </div>
                </div>
            )}
            {addTraining && (
                <div className="dmt__dashboard-control">
                    <label>Choose a name for the Training</label>
                    <input type="text" onChange={(e) => {
                        setTname(e.target.value);
                    }} />
                    <label>Upload a photo</label>
                    <input type="file" name='file' onChange={(e) => { setPhoto(e.target.files[0]); }} disabled={loading} />
                    {loading && (
                        <div className="loading-animation">
                            Loading...
                        </div>
                    )}
                    <label>Duration</label>
                    <input type="text" onChange={(e) => {
                        setDuration(e.target.value);
                    }} />
                    <label>Price</label>
                    <input type="text" onChange={(e) => {
                        setPrice(e.target.value);
                    }} />
                    <label>Description </label>
                    <ReactQuill theme="snow" value={text} onChange={setText} className='blog_area' />
                    <label>Content </label>
                    <ReactQuill theme="snow" value={content} onChange={setContent} className='blog_area' />
                    <div className="dmt__gradient-button">
                        <button onClick={postTraining}>Add</button>
                    </div>
                    <div className="dmt__gradient-button">
                        <button onClick={() => { setCatEdit(true); setAddTraining(false); }}>Go Back</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CRUD_TR