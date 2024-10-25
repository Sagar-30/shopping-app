import React, { useState } from 'react';
import loginStyle from "./login.module.css";
import { Link, useNavigate } from 'react-router-dom';
import db from '../../firebaseinit';
import { collection, doc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useValue } from '../../AppContext';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const SuccessNotify = () => toast.success("Login Successfull!", { autoClose: 2000, style: { width: '500px', margin: '10px', fontSize: '16px' } });
    const declineNotify = () => toast.error("Invalid credentials!", { autoClose: 2000, style: { width: '500px', margin: '10px', fontSize: '16px' } });
    const Navigate = useNavigate();
    const {setIsLogin} = useValue();

    async function handleLogin(e) {
        if (email && password) {
            e.preventDefault();
            onSnapshot(collection(db, "users"), (snapshot) => {
                const allUsers = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                const user = allUsers.find(user => user.email === email && user.password === password);
                if (user) {
                    SuccessNotify();
                    setTimeout(() => {
                        setIsLogin(true);
                        Navigate("/");
                    },1500)
                } else {
                    declineNotify();
                }

            })
        }
    }

    return (
        <div className={loginStyle.top}>
            <ToastContainer />
            <div className={loginStyle.container}>
                <div className={loginStyle.header}>
                    <h1><span className={loginStyle.l}>L</span>OGIN</h1>
                </div>
                <form>
                    <label htmlFor="uname">Username</label>
                    <input type="text" className={loginStyle.inp} name="uname" required onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="psw">Password</label>
                    <input type="password" className={loginStyle.inp} name="psw" required onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" onClick={(e) => handleLogin(e)}>Enter</button>
                </form>
                <div className={loginStyle.signup}>
                    <b>Don't have an account?</b>
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
