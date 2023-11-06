import React from "react"

import './Footer.css'

// MUI 
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Footer = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1, background: '#fff', boxShadow: '0px -6px 9px 0px #FF3F00', marginTop: '60px' }}>
                <Grid container spacing={0}>
                    <Grid xs={12}>
                        <p>Copyright ©OpenDev All Rights Reserved</p>
                    </Grid>
                    <Grid xs={6}>
                        <p>Contact us at OpenDev@gmail.com</p>
                    </Grid>
                    <Grid xs={6}>
                        <p>Follow us on Facebook, Instagram and GitHub</p>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default Footer