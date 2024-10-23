import React from 'react';
import loginStyle from "./login.module.css";
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div className={loginStyle.top}>
        <div className={loginStyle.container}>
            <div className={loginStyle.header}>
                <h1><span className={loginStyle.l}>S</span>IGN UP</h1>
            </div>
            <form>
                <label htmlFor="uname">Username</label>
                <input type="text" className={loginStyle.inp} name="uname" required />
                <label htmlFor="email">Email</label>
                <input type="email" className={loginStyle.inp} name="email" required />
                <label htmlFor="psw">Password</label>
                <input type="password" className={loginStyle.inp} name="psw" required />
                <button type="submit">Create Account</button>
            </form>
            <div className={loginStyle.signup}>
                <b>Already have an account?</b>
                <Link to="/login">
                <a href="/login">Login</a></Link>
            </div>
        </div>
        </div>
    );
};

export default Signup;
