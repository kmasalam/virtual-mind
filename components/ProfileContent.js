import React, { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function ProfileContent(props) {
    
    const {name,age,email} = props.profileData
    console.log('props is',name);
    return (
        <Card >
            <CardContent>
                <h4> <span>Name:</span> {name}</h4>
                <ul>
                    <li><span>Age:</span> {age}</li>
                    <li><span>Email:</span> {email}</li>
                </ul>
            </CardContent>
        </Card>
    );
}

export default ProfileContent;