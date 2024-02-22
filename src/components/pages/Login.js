import React from "react";
import { useState,  } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";

const URL = process.env.REACT_APP_URL;

const initialState = {
    email: "",
    password: "",
  };
  
const Login = () => {
    const navigate = useNavigate();
    const [showloader, setShowLoader] = useState("none");

    const [values, setValues] = useState(initialState);
    // const [localStorageValue, SetlocalStorageValue] = useState("");
    const [z, SetlocalStorageValue] = useState("");
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({ ...values, [name]: value });
      };
      const AddData = async (userData) => {
        try {
          setShowLoader("block");

          const add = await axios.post(`${URL}/admin/login`, userData);
          if (add.status === 200) {
            toast.success("Login Successfully...");
            setShowLoader("none");
           
            const okcheck = await add.data;
            console.log(okcheck);
            localStorage.setItem("token", okcheck.token);
            localStorage.setItem("WEBSITE", "KHULASAFIRST");
            localStorage.setItem("admin", okcheck.token);
            localStorage.setItem("permission", okcheck.admindata.permission);
           
            sessionStorage.setItem("token", okcheck.token);
            sessionStorage.setItem("WEBSITE", "KHULASAFIRST");
           
            // sessionStorage.setItem("token", okcheck.token);
            // sessionStorage.setItem("admin", okcheck.token);
            // sessionStorage.setItem('token', JSON.stringify(data.token));
            SetlocalStorageValue(localStorage.getItem("sessiondata"));
    
            navigate("/dashboard");
         
          
          }
        } catch (error) {
          setShowLoader("none");

 toast.error('Details Not Match...');
          }
      };
    
      const onSubmit = (e) => {
        e.preventDefault();
    
        const { email, password } = values;
        if (!email || !password) {
          toast.error("All Fields Required");
          return;
        }
        console.log(values);
        AddData(values);
      };
      
  return (
    <div class="hold-transition login-page">
      <div class="login-box">
  {/* Loader start */}
  <div className="loader-container " style={{ display: showloader }}>
        <img src={loaderimg} alt="" className="loaderImage" />
      </div>
       {/* Loader End */}
  <div class="card card-outline card-primary">
    <div class="card-header text-center">
      <a href="../../index2.html" class="h1"><b> Admin</b></a>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Sign in to start your session</p>

      <form onSubmit={onSubmit}>
        <div class="input-group mb-3">
          <input type="email" class="form-control"
         placeholder="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
            />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control"
             placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}

           />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            {/* <div class="icheck-primary">
              <input type="checkbox" id="remember" />
              <label for="remember">
                Remember Me
              </label>
            </div> */}
          </div>
        
          <div class="col-12">
            <button type="submit" class="btn btn-primary btn-block">Sign In</button>
          </div>
       
        </div>
      </form>

     
     
      <p class="mb-1">
        {/* <a href="forgot-password.html">I forgot my password</a> */}
      </p>
      {/* <p class="mb-0">
        <a href="register.html" class="text-center">Register a new membership</a>
      </p> */}
    </div>
  
  </div>
  
</div>
    </div>
  )
}

export default Login
