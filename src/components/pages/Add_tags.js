import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const Add_tags = () => {
  const navigate = useNavigate();
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
 // const [states, setStates] = useState();
 const [showloader, setShowLoader] = useState("none");

 const [maindata, setMaindata] = useState({
    name: ""
   
  });
 
  useEffect(() => {
    //getstates();
  }, []);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMaindata({ ...maindata, [name]: value });
  };

  const Submit = async (e) => {
    setShowLoader("block");

    e.preventDefault();
    const {
      name
     
    } = maindata;
if(!name)
{
    alert("Enter Tag");
    return ;
}

    const fetchdata = fetch(`${URL}/admin/addTags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
       
      }),
    });

    const response = await fetchdata;
    const res = await response.json();
   
    if (response.status === 200) {
      toast.success("Data Add Successful...");
 setShowLoader("none");

     navigate("/tags");
    } else {
      setShowLoader("none");
 toast.error("Invalid Credentials...");
    }
  };
//   const getstates = () => {
//     fetch("http://206.189.130.102:8080/api/v1/admin/getAllState")
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         setStates(data);
//       });
//   };
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
                <h1> </h1>
              </div>
              <div class="col-sm-4"></div>
              <div class="col-sm-2">
                <Link className="btn btn-primary" to="/tags">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="card card-default">
              <div class="card-header">
                <h3 class="card-name">Add Tags</h3>
                <div class="card-tools">
                 
                
                  
                </div>
              </div>

              <div class="card-body">
                <form onSubmit={Submit}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Tag Name *</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="name"
                          value={maindata.name}
                          id="exampleInputEmail1"
                          placeholder="Enter name"
                        />
                      </div>
                    </div>

                    {/* <div class="col-md-6">
                      <div class="form-group">
                        <label>State *</label>
                        <select
                          class="form-control select2"
                          onChange={handleChange}
                          name="stateid"
                          value={maindata.stateid}
                          
                          style={{ width: "100%" }}
                        >
                        <option>Select State</option>
                          {states?.data?.map((val, index) => {
                            return (
                              <option value={val._id} key={index}>
                                {val.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div> */}
                  </div>

                  <button className="btn btn-primary mt-2" type="submit">
                    Add Tags
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

export default Add_tags;
