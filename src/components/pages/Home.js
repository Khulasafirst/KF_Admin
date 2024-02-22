import React, { useState, useEffect } from "react";

import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const Home = () => {
  const [nodata, setNodata] = useState("");
  const [showloader, setShowLoader] = useState("none");
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  const permission = localStorage.getItem("permission");
  const x = permission;

  useEffect(() => {
    getdashboard();
  }, []);
  const getdashboard = () => {
    setShowLoader("block");

    fetch(`${URL}/admin/Dashboardinfo`)
      .then((response) => {
        setShowLoader("none");
        return response.json();
      })
      .then((data) => {
        setNodata(data);
      });
  };
  if (!admintoken2 && WEBSITE2 !== 'KHULASAFIRST') {
    return <Login />
}

  return (
   
    <div class="wrapper">
      {/* top navbar */}
      <TopNavbar />

      {/* sidenavbar */}
      <SideNav />
      {/* <!-- Content Wrapper. Contains page content --> */}
      <div class="content-wrapper">
        {/* Loader start */}
        <div className="loader-container " style={{ display: showloader }}>
          <img src={loaderimg} alt="" className="loaderImage" />
        </div>
        {/* Loader End */}
        {/* <!-- Content Header (Page header) --> */}
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">Dashboard</h1>
              </div>
              {/* <!-- /.col --> */}
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li class="breadcrumb-item ">Dashboard </li>
                </ol>
              </div>
              {/* <!-- /.col --> */}
            </div>
            {/* <!-- /.row --> */}
          </div>
          {/* <!-- /.container-fluid --> */}
        </div>
        {/* <!-- /.content-header --> */}

        {/* <!-- Main content --> */}

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              {/* Card Start */}
              {x.includes("4") ? (
                <div class="col-lg-3 col-6">
                  <div class="small-box bg-danger">
                    <div class="inner">
                      <h3>{nodata?.data?.totalUser}</h3>

                      <p>Total User</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-pie-graph"></i>
                    </div>
                    <Link to="/user" class="small-box-footer">
                      More info <i class="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* Card End */}

              {/* Card Start */}
              {x.includes("1") ? (
                <div class="col-lg-3 col-6">
                  <div class="small-box bg-danger">
                    <div class="inner">
                      <h3>{nodata?.data?.totalSubStaff}</h3>

                      <p>Total SubStaff</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-pie-graph"></i>
                    </div>
                    <Link to="/substaff" class="small-box-footer">
                      More info <i class="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* Card End */}
              {/* Card Start */}
              {x.includes("2") ? (
                <div class="col-lg-3 col-6">
                  <div class="small-box bg-danger">
                    <div class="inner">
                      <h3>{nodata?.data?.totalNews}</h3>

                      <p>Total News</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-pie-graph"></i>
                    </div>
                    <Link to="/news" class="small-box-footer">
                      More info <i class="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* Card End */}
              {/* Card Start */}
              {x.includes("6") ? (
                <div class="col-lg-3 col-6">
                  <div class="small-box bg-danger">
                    <div class="inner">
                      <h3>{nodata?.data?.totalCategories}</h3>

                      <p>Total Categories</p>
                    </div>
                    <div class="icon">
                      <i class="ion ion-pie-graph"></i>
                    </div>
                    <Link to="/categories" class="small-box-footer">
                      More info <i class="fas fa-arrow-circle-right"></i>
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* Card End */}
            </div>
          </div>
        </section>

        {/* main page here */}

        {/* main page here */}

        {/* <!-- /.content --> */}
      </div>
      {/* <!-- /.content-wrapper --> */}

      <Footer />

      <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default Home;
