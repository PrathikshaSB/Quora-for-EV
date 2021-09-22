import React, { useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import SearchIcon from "@material-ui/icons/Search";
import '../css/Navbar.css';
import { Avatar, Button, Input, Link } from "@material-ui/core";
import { useSelector, useStore } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';
import Modal from "react-modal";
import { ExpandMore } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';
import firebase from 'firebase';
import logo from './auth/logo.png';

function Navbar() {

    const user = useSelector(selectUser);
    const [openModal, setOpenModal] = useState(false);
    const [input, setInput] =useState("");
    const [inputUrl, setInputUrl]=useState("");
    const [inputC, setInputC]=useState("");
    const [contactModal, setContactModal]=useState(false);

    const handleQuestion =(e)  => {
        e.preventDefault();

        setOpenModal(false)

        db.collection('questions').add({
            question: input,
            imageUrl: inputUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user,
        })
        setInput("");
        setInputUrl("");
    }

    const handleContact =(e) =>{
        e.preventDefault();
        setContactModal(false);

        if(inputC===""){
            window.alert("Please give some feedback...");
            setContactModal(true);
        }else{
            db.collection('contact').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user,
                feedback: inputC,
            })
            setInputC("");
            window.alert("Feedback sent! That means a lot! Thank you!");
        }
    }

    return (
        <div className='qHeader'>
            <div className="qHeader_logo">
                <img
                    src={logo} alt='logo'
                />
            </div>
            <div className="qHeader_icons">
                <div className="qHeader_icon">
                <HomeIcon />
                </div>
            </div>
            <div className="qHeader_input">
                <SearchIcon />
                <input type="text" placeholder="Search Quora" />
            </div>
            <div className="qHeader_Rem">
                <Button onClick={() => auth.signOut()}>Logout</Button>
                <Button onClick={() => setOpenModal(true)}>Add Question</Button>
                <Button onClick={() => setContactModal(true)}>Contact Us!</Button>
                <Modal
                    isOpen={openModal}
                    onRequestClose = {() => setOpenModal(false)}
                    shouldCloseOnOverlayClick={false}
                    style={{
                        overlay:{
                            width:700,
                            height:600,
                            backgroundColor:"rgba(0,0,0,0.8)",
                            zIndex:"1000",
                            top:"50%",
                            left:"50%",
                            marginTop:"-300px",
                            marginLeft:"-350px",
                        },
                    }}
                >
                    <div className="modal_title">
                        <h5>Add Question</h5>
                        <h5>Share link</h5>
                        </div>
                        <div className="modal_info">
                            <Avatar className="avatar" src={user.photo}/>
                            <p>{user.displaName ? user.displaName : user.email} asked</p>
                            <div className="modal_scope">
                                <PeopleAltOutlinedIcon />
                                <p>Public</p>
                                <ExpandMore/>
                            </div>
                        </div>
                        <div className="modal_Field">
                            <Input
                                value={input}
                                required
                                onChange={(e) => setInput(e.target.value)}
                                type="text"
                                placeholder="Start your question with 'What', 'How' and 'Why' stc.."
                            />
                        <div className="modal_fieldLink">
                            <LinkIcon/>
                            <input
                                value={inputUrl}
                                onChange={(e) => setInputUrl(e.target.value)}
                                type="text"
                                placeholder="Optional: include a link that gives context"
                            ></input>
                        </div>
                    </div>
                    <div className="modal_buttons">
                        <button onClick={() => setOpenModal(false)} className="cancle">Close</button>
                        <button onClick={handleQuestion} type="submit" className="add">Add Question</button>
                    </div>
                </Modal>

                <Modal
                    isOpen={contactModal}
                    onRequestClose = {() => setContactModal(false)}
                    shouldCloseOnOverlayClick={false}
                    style={{
                        overlay:{
                            width:700,
                            height:600,
                            backgroundColor:"rgba(0,0,0,0.8)",
                            zIndex:"1000",
                            top:"50%",
                            left:"50%",
                            marginTop:"-300px",
                            marginLeft:"-350px",
                        },
                    }}
                >
                    <div className="modal_title">
                        <h5>Contact Us!</h5>
                        </div>
                        <div className="modal_info">
                            <Avatar className="avatar" src={user.photo}/>
                            <p>{user.displaName ? user.displaName : user.email}</p>
                        </div>
                        <div className="modal_Field">
                            <Input
                                value={inputC}
                                required
                                onChange={(e) => setInputC(e.target.value)}
                                type="text"
                                placeholder="Give feedback here..."
                            />
                    </div>
                    <div className="modal_buttons">
                        <button onClick={() => setContactModal(false)} className="cancle">Close</button>
                        <button onClick={handleContact} type="submit" className="add">Send!</button>
                    </div>
                </Modal>

            </div>
        </div>
    )
}
export default  Navbar;