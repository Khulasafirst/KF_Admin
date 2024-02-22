import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Login from './Login';
import loaderimg from "../../assets/image/loader.gif";

const URL = process.env.REACT_APP_URL;

const Add_advertisement = () => {
  const navigate = useNavigate();
  // const [states, setStates] = useState();
  const [showDiv1, setShowDiv1] = useState("none");
  const [showDiv2, setShowDiv2] = useState("none");
  const [showDiv3, setShowDiv3] = useState("none");
  const [url2, seturl] = useState();
  const [filename, setfilename] = useState();
  const [showloader, setShowLoader] = useState("none");
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  const [maindata, setMaindata] = useState({
    title: "",
    description: "",
    advttype: "",
    url: "",adv_url:"https://www.google.com/",
    advtposition: "",
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
    const { title, description, advttype, advtposition,adv_url, status } = maindata;

    if (
      !title ||
      !description ||
      !advttype ||!adv_url ||
      !advtposition
      // !status
    ) {
      toast.error("Enter Details");
      setShowLoader("none");
      return;
    }

    const st2 = status === 1 ? "true" : "false";
    const fetchdata = fetch(`${URL}/admin/addadvertisement`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        advttype,adv_url,
        url: url2,
        advtposition,
      }),
    });

    const response = await fetchdata;
    const res = await response.json();

    if (response.status === 200) {
      toast.success("Data Add Successful...");
      setShowLoader("none");
      navigate("/advertisement");
    } else {
      setShowLoader("none");
      toast.error("Enter All Details...");
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
  const handleChangeAdvtType = (e) => {
    const advttype = e.target.value;

    setMaindata({ ...maindata, advttype: advttype });

    if (advttype === "GOOGLEAD") {
      setShowDiv3("block"); //
      setShowDiv2("none"); //upload hide
      setShowDiv1("none"); //upload hide
    }
    if (advttype === "IMAGE") {
      setShowDiv2("block"); //
      setShowDiv3("none"); // hide
      setShowDiv1("none"); // hide
    }
    if (advttype === "VIDEO") {
      setShowDiv1("block"); //
      setShowDiv2("none"); // hide
      setShowDiv3("none"); // hide
    }
    // if (advttype === "UPLOADED") {
    //   setShowDiv1("none"); //Youtube hide
    // //   setShowDiv2("block"); //upload show
    // }
  };
  const handleChangeGoogle = (e) => {
    const du = e.target.value;
    seturl(du);
  };
  const ImageUploadSubmit = async (e) => {
    setShowLoader("block");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    var requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const fetchdata = axios.post(
      `${URL}/admin/imageUpload_Use/imageUpload`,
      formData,
      requestOptions
    );
    const response = await fetchdata;
    if (response.status === 200) {
      //toast.success("Data Uploaded Successfully...");
      setShowLoader("none");
      //  alert(response?.data?.imagename);
      seturl(response?.data?.url);
      setfilename(response?.data?.filename);
    } else {
      setShowLoader("none");
      toast.error("Fail To Load...");
    }
    setShowLoader("none");
  };
  const VideoUploadSubmit = async (e) => {
    setShowLoader("block");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    var requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const fetchdata = axios.post(
      `${URL}/admin/videoUpload_Use/videoUpload`,
      formData,
      requestOptions
    );
    const response = await fetchdata;
    if (response.status === 200) {
      //toast.success("Data Uploaded Successfully...");
      setShowLoader("none");

      seturl(response?.data?.url);
      setfilename(response?.data?.filename);
    } else {
      setShowLoader("none");
      toast.error("Fail To Load...");
    }
    // .then((response) => response.json())

    // .then((result) => seturl(result?.url))
    // .then((result) => setfilename(result?.filename));
    setShowLoader("none");
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
          {/* <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1> </h1>
              </div>
              <div class="col-sm-4"></div>
              <div class="col-sm-2">
                <Link className="btn btn-primary" to="/advertisement">
                  Back
                </Link>
              </div>
            </div>
          </div> */}
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="card card-default">
              <div class="card-header">
                <h3 class="card-name">Add advertisement </h3>
                <div class="card-tools"></div>
              </div>

              <div class="card-body">
                <form onSubmit={Submit}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">
                          Advertisement Title{" "}
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="title"
                          value={maindata.title}
                          id="exampleInputEmail1"
                          placeholder="Enter Title"
                        />
                      </div>{" "}
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Description</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="description"
                          value={maindata.description}
                          id="exampleInputEmail1"
                          placeholder="Enter Description"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Advertisement Type</label>
                        <select
                          class="form-control select2"
                          onChange={handleChangeAdvtType}
                          name="advttype"
                          value={maindata.advttype}
                          style={{ width: "100%" }}
                        >
                          <option>Select Option</option>
                          <option value="GOOGLEAD">GOOGLEAD</option>
                          <option value="IMAGE">IMAGE</option>
                          <option value="VIDEO">VIDEO</option>
                        </select>
                      </div>
                    </div>

                    {/* ====================== U P L O A D  ======================================== */}

                    <div class="col-md-6" style={{ display: showDiv1 }}>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Video Upload</label>
                        <input
                          type="file"
                          class="form-control"
                          onChange={VideoUploadSubmit}
                          name="file"
                          id="exampleInputEmail1"
                          placeholder="Upload Image"
                        />
                      </div>
                    </div>
                    <div class="col-md-6" style={{ display: showDiv2 }}>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Image Upload *(Image size 1080 x 1080 px OR 1500 X 117 px )</label>
                        <input
                          type="file"
                          class="form-control"
                          onChange={ImageUploadSubmit}
                          name="file"
                          id="exampleInputEmail1"
                          placeholder="Upload Image"
                        />
                      </div>
                    </div>
                    {/* ====================== Url   ======================================== */}
                    <div class="col-md-6" style={{ display: showDiv3 }}>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Google Link *</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChangeGoogle}
                          name="url"
                          value={url2}
                          id="exampleInputEmail1"
                          placeholder="Url"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Advertisement Placement</label>
                        <select
                          class="form-control select2"
                          onChange={handleChange}
                          name="advtposition"
                          value={maindata.advtposition}
                          style={{ width: "100%" }}
                        >
                          <option>Select Option</option>
                          <option value="TOP">TOP</option>
                          <option value="RIGHT">RIGHT</option>
                          <option value="BOTTOM">BOTTOM</option>
                          <option value="BOTTOMRIGHT">BOTTOMRIGHT</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Advertiser Url</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="adv_url"
                          value={maindata.adv_url}
                          id="exampleInputEmail1"
                          placeholder="Enter Url"
                        />
                      </div>
                    </div>
                    {/* <div class="col-md-6">
                      <div class="form-group">
                        <label>Status{maindata.status}</label>
                        <select
                          class="form-control select2"
                          onChange={handleChange}
                          name="status"
                          value={maindata.status}
                          style={{ width: "100%" }}
                        >
                          
                          <option value="1">Active</option>
                          <option value="2">In Active</option>
                         
                        </select>
                      </div>
                    </div> */}
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

                  <button className="btn btn-primary mt-2" type="submit">
                    Add Advt
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

export default Add_advertisement;
