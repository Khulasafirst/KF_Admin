import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import axios from "axios";

const URL = process.env.REACT_APP_URL;

const Add_epaper = () => {
  const navigate = useNavigate();
  const [showloader, setShowLoader] = useState("none");
  const [url, seturl] = useState("");
  const [maindata, setMaindata] = useState({
    name: "",
    name2: "",
    slug: "",
    imageurl: "",
  });

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
    } else {
      setShowLoader("none");
      toast.error("Fail To Load...");
    }
    setShowLoader("none");
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMaindata({ ...maindata, [name]: value });
  };

  const Submit = async (e) => {
    e.preventDefault();
    if (!url) {
      toast.error("Please Upload Image...");
      return;
    }

    const { name, name2 } = maindata;
    setShowLoader("block");
    const fetchdata = fetch(`${URL}/admin/addCategory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        name2: name2,
        imageurl: url,
      }),
    });

    const response = await fetchdata;
    const res = await response.json();
    // alert("Add Successfully");
    if (response.status === 200) {
      toast.success("Data Add Successful...");
      setShowLoader("none");
      navigate("/categories");
    } else {
      setShowLoader("none");
      toast.error("Invalid Credentials...");
      //alert("Invalid Credentials");
    }
  };
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
              {/* <div class="col-sm-2">
                <Link className="btn btn-primary" to="/categories">
                  Back
                </Link>
              </div> */}
            </div>
          </div>
        </section>

        <section class="content">
          <div class="container-fluid">
            <div class="card card-default">
              <div class="card-header">
                <h3 class="card-name">Add Paper</h3>
                <div class="card-tools"></div>
              </div>

              <section class="content">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12">
                      <div class="card">
                        <div class="card-header">
                          {/* <h3 class="card-title">
                      DataTable with minimal features & hover style
                    </h3> */}
                        </div>

                        <div class="card-body">
                          <div className="table-responsive" id="collapse1">
                            <table
                              id="example2"
                              class="table table-bordered table-hover tableFixHead"
                            >
                              <thead>
                                <tr>
                                  <th>Page Number</th>
                                  <th>Image</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>page 1</td>
                                  <td>
                                    <img
                                      src="http://206.189.130.102:8080/uploads/image/1693221985984-1693221985984.png"
                                      alt=""
                                      style={{ width: "20%", height: "20%" }}
                                    />
                                  </td>
                                  <td>
                                    <Link to="/epaperimageupload">
                                      Upload Paper Image
                                    </Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td>page 2</td>
                                  <td>
                                    <img
                                      src="http://206.189.130.102:8080/uploads/image/1693221985984-1693221985984.png"
                                      alt=""
                                      style={{ width: "20%", height: "20%" }}
                                    />
                                  </td>
                                  <td>
                                    <Link to="/epaperimageupload">
                                      Upload Paper Image
                                    </Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td>page 3</td>
                                  <td>
                                    <img
                                      src="http://206.189.130.102:8080/uploads/image/1693221985984-1693221985984.png"
                                      alt=""
                                      style={{ width: "20%", height: "20%" }}
                                    />
                                  </td>
                                  <td>
                                    <Link to="/epaperimageupload">
                                      Upload Paper Image
                                    </Link>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default Add_epaper;
