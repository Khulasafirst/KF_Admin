import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const Add_video = () => {
  const navigate = useNavigate();
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  // const [states, setStates] = useState();
  const [showDiv1, setShowDiv1] = useState("none");
  const [showDiv2, setShowDiv2] = useState("none");
  const [url, seturl] = useState();
  const [imageurl, setImageurl] = useState();
  const [filename, setfilename] = useState();
  const [showloader1, setShowLoader1] = useState("none");

  const [maindata, setMaindata] = useState({
    title: "",
    slug: "",
    description: "",
    videotype: "",
    youtubeurl: "",
    videourl: "",
    videolengthtype: "",
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
    setShowLoader1("block");

    e.preventDefault();
    const { title, slug, description, videotype, youtubeurl,videolengthtype } = maindata;
if(!imageurl)
{
  toast.error("Upload Thumbnail Image");
      setShowLoader1("none");
      return;
}
    if (!title || !slug  || !description || !videotype || !videolengthtype) {
      toast.error("Enter Details");
      setShowLoader1("none");
      return;
    }

    const fetchdata = fetch(`${URL}/admin/addVideoGallery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        imageurl:imageurl,
        description,
        videotype,
        youtubeurl,videolengthtype,
        videourl: url,
      }),
    });

    const response = await fetchdata;
    const res = await response.json();

    if (response.status === 200) {
      toast.success("Data Add Successful...");
      setShowLoader1("none");
      navigate("/Video");
    } else {
      setShowLoader1("none");
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
  const VideohandleChange = (e) => {
    const videotype = e.target.value;

    setMaindata({ ...maindata, videotype: videotype });
    // alert(videotype);
    // Youtube 1 Par
    // Upload 2 par
    if (videotype === "YOUTUBE") {
      setShowDiv1("block"); //Youtube show
      setShowDiv2("none"); //upload hide
    }
    if (videotype === "UPLOADED") {
      setShowDiv1("none"); //Youtube hide
      setShowDiv2("block"); //upload show
    }
  };

  const ImageUploadSubmit = async (e) => {
    setShowLoader1("block");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };
    const fetchdata = fetch(
      `${URL}/admin/videoUpload_Use/videoUpload`,
      requestOptions
    );
    const response = await fetchdata;
    if (response.status === 200) {
      toast.success("Data Uploaded Successfully...");
      setShowLoader1("none");
      // alert(response?.url);
      seturl(response?.url);
      setfilename(response?.filename);
    } else {
      setShowLoader1("none");
      toast.error("Fail To Load...");
    }
    // .then((response) => response.json())

    // .then((result) => seturl(result?.url))
    // .then((result) => setfilename(result?.filename));
    setShowLoader1("none");
  };
 
  const VideoUploadSubmit = async (e) => {
    setShowLoader1("block");
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
      setShowLoader1("none");

      seturl(response?.data?.url);
      setfilename(response?.data?.filename);
    } else {
      setShowLoader1("none");
      toast.error("Fail To Load...");
    }
    // .then((response) => response.json())

    // .then((result) => seturl(result?.url))
    // .then((result) => setfilename(result?.filename));
    setShowLoader1("none");
  };


  const ThumbnailImageUpload = async (e) => {
    setShowLoader1("block");
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
      setShowLoader1("none");
      setImageurl(response?.data?.url);
     
    } else {
      setShowLoader1("none");
      toast.error("Fail To Load...");
    }
    
    setShowLoader1("none");
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
        <div className="loader-container " style={{ display: showloader1 }}>
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
                <Link className="btn btn-primary" to="/Video">
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
                <h3 class="card-name">Add Video</h3>
                <div class="card-tools"></div>
              </div>

              <div class="card-body">
                <form onSubmit={Submit}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Video Title *</label>
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
                        <label for="exampleInputEmail1">Video Slug *</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="slug"
                          value={maindata.slug}
                          id="exampleInputEmail1"
                          placeholder="Enter slug"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="exampleInputEmail1">
                          Video Description *
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="description"
                          value={maindata.description}
                          id="exampleInputEmail1"
                          placeholder="Enter Description"
                        />
                      </div>{" "}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Video Type*</label>
                        <select
                          class="form-control select2"
                          onChange={VideohandleChange}
                          name="videotype"
                          value={maindata.videotype}
                          style={{ width: "100%" }}
                        >
                          <option>Select Option</option>
                          <option value="UPLOADED">Video Upload</option>
                          <option value="YOUTUBE">Youtube Video Link</option>
                        </select>
                      </div>
                    </div>
                    {/* ======================Y O U TU U B E ======================================== */}
                    {/* youtube or image upload */}
                    <div class="col-md-6" style={{ display: showDiv1 }}>
                      <div class="form-group">
                        <label for="exampleInputEmail1">You Tube Link *</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="youtubeurl"
                          value={maindata.youtubeurl}
                          id="exampleInputEmail1"
                          placeholder="Enter youtubeurl"
                        />
                      </div>
                    </div>
                    {/* ====================== U P L O A D  ======================================== */}

                    <div class="col-md-6" style={{ display: showDiv2 }}>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Upload Video *</label>
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
                    <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Video Length*</label>
                        <select
                          class="form-control select2"
                          onChange={handleChange}
                          name="videolengthtype"
                          value={maindata.videolengthtype}
                          style={{ width: "100%" }}
                        >
                          <option>Select Option</option>
                          <option value="SHORT">SHORT VIDEO</option>
                          <option value="LONG">LONG VIDEO</option>
                        </select>
                      </div>
                    </div>
                   <div class="col-md-6" >
                      <div class="form-group">
                        <label for="exampleInputEmail1">Thumbnails Upload </label>
                        <input
                          type="file"
                          class="form-control"
                          onChange={ThumbnailImageUpload}
                          name="file"
                          id="exampleInputEmail1"
                          placeholder="Upload Image"
                        />
                      </div>
                    </div>
                  
                  </div>
                  <button className="btn btn-primary mt-2" type="submit">
                    Add Video
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

export default Add_video;
