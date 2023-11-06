import React from "react";
import errImg from "../Assets/Images/Error.png";
import { Button } from "@mui/material";

function ErrorCard(props) {

    const handleClick = () => {
        window.location.reload('false');
    }

    const handleHome = () => {
        window.location = '/Home';
    }

    return (
        <>
            <div>
                <img src={errImg} alt="Error Image" style={{width: '100%'}}/>
                <h1>Error {props.code}: {props.text}</h1>
                <br></br>
                <Button variant="contained" onClick={handleClick} style={{marginRight: '25px'}}>Reload Page</Button>
                <Button variant="contained" onClick={handleHome}>Return Home</Button>
            </div>
        </>
    )
}

export default ErrorCard;
