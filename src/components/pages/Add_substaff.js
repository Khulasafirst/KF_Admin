import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link, useNavigate } from "react-router-dom";
import Editor from "./Editor";
import Multiselect from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const Add_substaff = () => {
  const navigate = useNavigate();
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [permission, setPermission] = useState([]);
  const [showloader, setShowLoader] = useState("none");

  const [maindata, setMaindata] = useState({
    name:"",
    username:"",
    email:"",
    password:"",
    phone:"",
    loginType:"",
    permission:""
  });

 
 
 
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMaindata({ ...maindata, [name]: value });
  };

  const Submit = async (e) => {
    setShowLoader("block");

    e.preventDefault();
    const {
      name,
    username,
    email,
    password,
    phone,
    loginType,
         
    } = maindata;
if(!name || !username ||!email ||!password ||!phone ||!loginType)
{
  setShowLoader("none");
  toast.error("All Field Required ...");
  return;
}
    const fetchdata = fetch(
      `${URL}/admin/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          phone,
          loginType,
          permission:permission
          
        }),
      }
    );

    const response = await fetchdata;
    const res = await response.json();
   
    if (response.status === 200) {
     // sessionStorage.setItem("token", res.token);
      toast.success("Data Add Successful...");
      setShowLoader("none");
      navigate("/substaff");
    } else {
      setShowLoader("none");
      toast.error("Invalid Credentials...");
    }
  };

  const handleCheckboxChange = (e) => {
    let data = permission;
    const value = e.target.value;
    const checkdata = data.includes(value);
    console.log(checkdata);
    if (checkdata) {
      data.pop(value);
      setPermission(data);

      //  console.log("true");
    } else {
      data.push(value);
      setPermission(data);

      //  console.log("false");
    }
    console.log(permission);
  };
 
  if (!admintoken2 && WEBSITE2 !== 'KHULASAFIRST') {
    return <Login />
}

  return (
    <div class="wrapper">
      <TopNavbar />
      <SideNav />

      <div class="content-wrapper">
       {/* Loader start */}
       <div className="loader-container " style={{ display: showloader }}>
        <img src={loaderimg} alt="" className="loaderImage" />
      </div>
       {/* Loader End */}
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Add Staff</h1>
              </div>
              <div class="col-sm-4"></div>
              <div class="col-sm-2">
                {/* <Link className="btn btn-primary" to="/Staff">
                  //Back
                </Link> */}
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="card card-default">
              <div class="card-header">
                <h3 class="card-title">Add Staff </h3>
                <div class="card-tools"></div>
              </div>

              <div class="card-body">
                <form onSubmit={Submit}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="name"
                          value={maindata.name}
                          id="exampleInputEmail1"
                          placeholder="Enter title"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">User Name*</label>
                        <input
                          type="text"
                          onChange={handleChange}
                          name="username"
                          value={maindata.username}
                          class="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter Username"
                        />
                      </div>
                    </div>
                  </div>


                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          onChange={handleChange}
                          name="email"
                          value={maindata.email}
                          id="exampleInputEmail1"
                          placeholder="Enter Email"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Phone</label>
                        <input
                          type="number"
                          onChange={handleChange}
                          name="phone"
                          value={maindata.phone}
                          class="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter phone"
                        />
                      </div>
                    </div>
                  </div>
                
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          onChange={handleChange}
                          name="password"
                          value={maindata.password}
                          id="exampleInputEmail1"
                          placeholder="Enter password"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Login Type</label>
                        <select
                    name="loginType"
                    value={maindata.loginType}
                    onChange={handleChange}
                    class="form-control"
                  >
                    <option value="">Select</option>
                    <option value="SuperAdmin">SuperAdmin</option>
                    <option value="SubAdmin">SubAdmin</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Editor">Editor</option>
                    <option value="Reporter">Reporter</option>
                  </select>
                      </div>
                    </div>
                  </div>
                
                  <div class="row">
                    <div class="col-md-6">
                    <div className="form-group">
                  <label for="exampleInputEmail1">PERMISSIONS : -</label>
                  <div className="ml-5">
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value="1"
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                      Sub Staff
                    </label>
                    <br />
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value="2"
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                      News 
                    </label>
                    <br />
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value="3"
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                      Video 
                    </label>
                    <br />
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value="4"
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                    Users 
                    </label>
                    <br />
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value="5"
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                      E paper
                    </label>
                    <br />
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value="6"
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                      Categories
                    </label>
                    <br />
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value="7"
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                      Advertisement
                    </label>
                    <br />
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value="8"
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                     Configuration
                    </label>
                    <br />
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value="9"
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                     City
                    </label>
                    <br />
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value="10"
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                     State
                    </label>
                    <br />
                  </div>
                </div>
                    </div>

                   
                  </div>
                
                  <button className="btn btn-primary mt-2" type="submit">
                    Add Staff
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default Add_substaff;
