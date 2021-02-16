import React, {useEffect, useState} from 'react'
import './Style.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button , TextField} from '@material-ui/core'
import Slide from '@material-ui/core/Slide';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { IconButton, InputAdornment, Input, InputLabel, FormControl } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function LoginForm() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });
    const [DialogStatus, setDialogStatus] = React.useState(false);


    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
    };


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = {
            'Project-ID': "6658e403-cec0-4585-ada3-a9aae5d67aa6",
            'User-Name': values.username,
            'User-Secret': values.password
        }
        try {
            await axios("https://api.chatengine.io/chats", {headers: authObject})
            localStorage.setItem('username', values.username)
            localStorage.setItem('password', values.password)
            window.location.reload();
        } catch (err) {
            setDialogStatus(true)
        }
    }


    return (
        <section className="admnh_login_main">
            <form class="admin_login_form py-4" onSubmit={handleSubmit}>
                <h2 className="text-center mb-5">Login To Your Account</h2>
                <div style={{ width: '60%', margin: '5px auto', display: 'flex' }}>
                    <TextField onChange={handleChange("username")} value={values.username} id="standard-basic" label="User Name" className="AdminUserField w-100" type="text" required />
                </div><br />
                <FormControl style={{ width: '60%', margin: '0 auto', display: 'flex' }} variant="fille">
                    <InputLabel htmlFor="filled-adornment-password">Password *</InputLabel>
                    <Input
                        id="filled-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        required
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    /><br />
                </FormControl>
                <Button type="submit" variant="contained" className="mx-auto my-4 d-flex px-5 py-2" color="primary">
                    Log In
                </Button>
            </form>
            <Dialog
                open={DialogStatus}
                TransitionComponent={Transition}
                keepMounted
                maxWidth="xs"
                fullWidth="true"
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" className="py-3 text-center h3">Error</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Please Enter Valid Username or Password
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogStatus(false)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    )
}


export default LoginForm;
