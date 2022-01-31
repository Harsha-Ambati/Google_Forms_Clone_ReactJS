import React, { Fragment, useState } from 'react';
import {  Redirect } from 'react-router-dom';
import {Nav,NavBtn} from './NavbarStyles';
import {useSelector} from 'react-redux';
import {Button} from "@material-ui/core";
import "./LoginandSignup.css"
import Home from './Home';
import {useDispatch} from 'react-redux';
import {logout} from "../Store/actions/user";

const LogoutBar = () => {
     const isAuthenticated = useSelector(state => state.loginReducer.isAuthenticated);
    const [redirect, setRedirect] = useState(false);
    
const logoutUser = () => {
    localStorage.clear();
    window.location = "/";
}

    const logout_user = () => {
        logoutUser();
        setRedirect(true);
    };

    const loginLink = () => (
        <>
            <Home/>
        </>
    );
    const logoutLink = () => (
        <>
         <Nav>
         <NavBtn>
          <Button variant="contained" color="primary" style={{fontSize:"18px"}} onClick={logout_user} id="lout-btn">Logout</Button>
         </NavBtn>
       </Nav>
        </>
    );

    return (
        <>
                <div>
                    <ul>
                        {isAuthenticated ? logoutLink() : loginLink()}
                    </ul>
                </div>
                {redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
        </>
    );
};
export default LogoutBar;