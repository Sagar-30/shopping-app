import React from 'react';
import loginStyle from "./login.module.css";
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className={loginStyle.top}>
        <div className={loginStyle.container}>
            <div className={loginStyle.header}>
                <h1><span className={loginStyle.l}>L</span>OGIN</h1>
            </div>
            <form>
                <label htmlFor="uname">Username</label>
                <input type="text" className={loginStyle.inp} name="uname" required />
                <label htmlFor="psw">Password</label>
                <input type="password" className={loginStyle.inp} name="psw" required />
                <button type="submit">Enter</button>
            </form>
            <div className={loginStyle.signup}>
                <b>Don't have an account?</b>
                <Link to="/signup">
                <a href="/signup">Sign up</a></Link>
            </div>
        </div>
        </div>
    );
};

export default Login;
