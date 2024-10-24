import React, { useState } from 'react';
import loginStyle from "./login.module.css";
import { Link, useNavigate } from 'react-router-dom';
import db from '../../firebaseinit';
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useValue } from '../../AppContext';

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {isLogin, setIsLogin} = useValue();
  const notify = () => toast.success("Signup Successfull!",{autoClose: 2000,style:{ width: '500px', margin: '10px',fontSize: '16px'}});
  const Navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();

    if(name && email && password){
        await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            password: password
          });
          notify();
          setIsLogin(true);
          setTimeout(()=>{
            Navigate("/");
          },2000)
          
    }
  }

    return (
        <div className={loginStyle.top}>
            <ToastContainer />
        <div className={loginStyle.container}>
            <div className={loginStyle.header}>
                <h1><span className={loginStyle.l}>S</span>IGN UP</h1>
            </div>
            <form>
                <label htmlFor="uname">Username</label>
                <input type="text" className={loginStyle.inp} name="uname" required  onChange={(e)=> setName(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input type="email" className={loginStyle.inp} name="email" required onChange={(e)=> setEmail(e.target.value)} />
                <label htmlFor="psw">Password</label>
                <input type="password" className={loginStyle.inp} name="psw" required onChange={(e)=> setPassword(e.target.value)} />
                <button type="submit" onClick={(e)=>handleSubmit(e)}>Create Account</button>
            </form>
            <div className={loginStyle.signup}>
                <b>Already have an account?</b>
                <Link to="/login">Login</Link>
            </div>
        </div>
        </div>
    );
};

export default Signup;
