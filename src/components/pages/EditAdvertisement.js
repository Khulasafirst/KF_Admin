import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const EditAdvertisement = () => {
  const location = useLocation();
  const { datas, id } = location.state;
  const navigate = useNavigate();
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  // const [states, setStates] = useState();
  const [showDiv1, setShowDiv1] = useState("none");
  const [showDiv2, setShowDiv2] = useState("none");
  const [showDiv3, setShowDiv3] = useState("none");
  const [url2, seturl] = useState();
  const [filename, setfilename] = useState();
  const [showloader, setShowLoader] = useState("none");
  // const[se]=useState(datas.status === true ?1:2);//for tru false

  const [maindata, setMaindata] = useState({
    title: datas.title,
    description: datas.description,
    advttype: datas.advttype,
    advtposition: datas.advtposition,
    adv_url: datas.adv_url,
    // status: datas.status,
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
    const { title, description, advttype, advtposition,adv_url } = maindata;

    if (!title || !description || !advttype || !advtposition || !adv_url) {
      toast.error("Enter Details2");
      setShowLoader("none");
      return;
    }

    //  const st2 = status === 1 ?'true':'false';
    const fetchdata = fetch(`${URL}/admin/updateadvertisementById/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,adv_url,
        advttype,
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
  };
  useEffect(() => {
    if (datas.advttype === "GOOGLEAD") {
      setShowDiv3("block"); //
      setShowDiv2("none"); //upload hide
      setShowDiv1("none"); //upload hide
    }
    if (datas.advttype === "IMAGE") {
      setShowDiv2("block"); //
      setShowDiv3("none"); // hide
      setShowDiv1("none"); // hide
    }
    if (datas.advttype === "VIDEO") {
      setShowDiv1("block"); //
      setShowDiv2("none"); // hide
      setShowDiv3("none"); // hide
    }
  }, []);
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
                <h3 class="card-name">Edit advertisement </h3>
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
                          <option
                            value="GOOGLEAD"
                            selected={
                              maindata.advttype === "GOOGLEAD" ? "selected" : ""
                            }
                          >
                            GOOGLEAD
                          </option>
                          <option
                            value="IMAGE"
                            selected={
                              maindata.advttype === "IMAGE" ? "selected" : ""
                            }
                          >
                            IMAGE
                          </option>
                          <option
                            value="VIDEO"
                            selected={
                              maindata.advttype === "VIDEO" ? "selected" : ""
                            }
                          >
                            VIDEO
                          </option>
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
                          <option
                            value="TOP"
                            selected={
                              maindata.advttype === "TOP" ? "selected" : ""
                            }
                          >
                            TOP
                          </option>
                          <option
                            value="RIGHT"
                            selected={
                              maindata.advttype === "RIGHT" ? "selected" : ""
                            }
                          >
                            RIGHT
                          </option>
                          <option
                            value="BOTTOM"
                            selected={
                              maindata.advttype === "BOTTOM" ? "selected" : ""
                            }
                          >
                            BOTTOM
                          </option>
                          <option
                            value="BOTTOMRIGHT"
                            selected={
                              maindata.advttype === "BOTTOMRIGHT" ? "selected" : ""
                            }
                          >
                            BOTTOMRIGHT
                          </option>
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
                        <label>Status{ maindata.status === true ?'1':'2'}</label>
                        <select
                          class="form-control select2"
                          onChange={handleChange}
                          name="status"
                          value={maindata.status}
                          style={{ width: "100%" }}
                        >
                          
                          <option value="1" selected={se == 1 ? 'selected':''}>Active</option>
                          <option value="2" selected={se ==2  ? 'selected':''}>In Active</option>
                         
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

export default EditAdvertisement;
