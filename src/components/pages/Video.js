import React, { useEffect, useState } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import axios from "axios";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const Video = () => {
  const [Video, setVideo] = useState();
  const [showloader, setShowLoader] = useState("none");
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  const getVideo = () => {
    setShowLoader("block");

    fetch(`${URL}/admin/getAllVideoGallery`)
      .then((response) => {
        setShowLoader("none");

        return response.json();
      })
      .then((data) => {
        setVideo(data);
      });
  };

  useEffect(() => {
    getVideo();
  }, []);
  const handleStatus = async (id,e) => {
    const value = e.target.value;
    
     const patchdata = await axios.put(
       `${URL}/admin/updateVideoStatusById/${id}`,
       { status: value }
     );
     if (patchdata?.status === 200) {
       toast.success("Update Successful...");
       getVideo();
     }
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
        {/* 
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1>Total Video</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
                                    <li class="breadcrumb-item active">DataTables</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section> */}
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Total Video</h1>
              </div>
              <div class="col-sm-4"></div>
              <div class="col-sm-2">
                <Link className="btn btn-primary" to="/addvideo">
                  + Add Video
                </Link>
              </div>
            </div>
          </div>
        </section>

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
                          <th>Sr.</th>
                          <th>Name</th>
                          <th>Video Type</th>
                          <th>Lenght Type</th>
                          <th>Status</th>
                          <th>Change Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Video?.data?.map((val, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{val?.title}</td>
                              <td>{val?.videotype}</td>
                              <td>{val?.videolengthtype}</td>
                              <td>{val?.status=== true ?'Active':'InActive'}</td>
                              <td>
                                  <select
                                    className="form-control"
                                    id="exampleSelectGender"
                                    name="status"
                                    
                                    onChange={(e)=>handleStatus(val._id,e)}
                                  >
                                    <option>Select</option>
                                    <option value="true" selected={val?.status === true ? "selected" : null}>Active</option>
                                    <option value="false" selected={val?.status === false ? "selected" : null} >Inactive</option>
                                  </select>
                                </td>
                              <td>
                                <Link
                                  to={`/edit-Video/${val._id}`}
                                  state={{ datas: val, id: val._id }}
                                >
                                  <i class="fa fa-edit" style={{color: "red"}} ></i> 
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div></div>
                </div>
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

export default Video;
