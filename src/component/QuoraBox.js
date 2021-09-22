import React from 'react';
import { Avatar, Button, Input } from "@material-ui/core";
import '../css/QuoraBox.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function QuoraBox() {
    const user=useSelector(selectUser)
    return (
        <div className="quoraBox">
            <div className='quoraBox_info'>
                <Avatar 
                src={user.photo}
                />
                <h5>{user.email}</h5>
            </div>
            <div className='quoraBox_quora'>
                <p>Welcome {user.email}!</p>
            </div>
        </div>
    )
}

export default QuoraBox;
