import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import axios from "axios";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const EditCategories = () => {
  const location = useLocation();
  const { datas, id } = location.state;
  const [showloader, setShowLoader] = useState("none");

  const navigate = useNavigate();
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  //const { id } = useParams();
  const [url, seturl] = useState();
  const [maindata, setMaindata] = useState({
    name: datas.name,
    name2: datas?.name2,
    categoryorder: datas.categoryorder,
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
    setShowLoader("block");

    const { name, name2, categoryorder } = maindata;

    const fetchdata = fetch(`${URL}/admin/updateCategoryById/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        name2: name2,
        categoryorder: categoryorder,
        imageurl: url,
      }),
    });

    const response = await fetchdata;
    const res = await response.json();

    if (response.status === 200) {
      toast.success("Data Add Successfully...");
      setShowLoader("none");
      navigate("/categories");
    } else {
      setShowLoader("none");
      toast.error("Invalid Credentials...");
    }
  };  if (!admintoken2 && WEBSITE2 !== 'KHULASAFIRST') {
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
                <Link className="btn btn-primary" to="/categories">
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
                <h3 class="card-name">Update Categori</h3>
                <div class="card-tools"></div>
              </div>

              <div class="card-body">
                <form onSubmit={Submit}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">
                          Categorie Name (Hindi)
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="name"
                          value={maindata.name}
                          id="exampleInputEmail1"
                          placeholder="Enter Category"
                        />
                      </div>{" "}
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">
                          Categorie Name (English){" "}
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="name2"
                          value={maindata.name2}
                          id="exampleInputEmail1"
                          placeholder="Enter Category "
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Order Number *</label>
                        <input
                          type="number"
                          class="form-control"
                          onChange={handleChange}
                          name="categoryorder"
                          value={maindata.categoryorder}
                          id="exampleInputEmail1"
                          placeholder="Enter Order Number"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">
                          Main Image Upload
                        </label>
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
                  </div>
                  <button className="btn btn-primary mt-2" type="submit">
                    Update Category
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

export default EditCategories;
