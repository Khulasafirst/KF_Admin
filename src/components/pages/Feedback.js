import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
// import { Link } from "react-router-dom";
import dateFormat from "dateformat";
// import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const Feedback = () => {
  const [Feedback, setFeedback] = useState();
  const [showloader, setShowLoader] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [description, setDescripton] = useState(null);
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  const handleClose = () => {
    setShowModal(false);
    setDescripton(null);
  };
  const handleShow = async (farm,id) => {
    setShowModal(true);
    setDescripton(farm);
    const patchdata = await axios.put(
        `${URL}/users/feedbackstatus/${id}`,
      );
      if (patchdata?.status === 200) {
      getFeedback();
      }
  };

  const getFeedback = () => {
    setShowLoader("block");

    fetch(`${URL}/users/getAllFeedback`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setShowLoader("none");

        setFeedback(data?.data);
      });
  };

  useEffect(() => {
    getFeedback();
  }, []);
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
                                <h1>Total Feedback</h1>
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
                <h1>Total Feedback</h1>
              </div>
              <div class="col-sm-4"></div>
              <div class="col-sm-2">
                {/* <Link className="btn btn-primary" to="/add-Feedback">
                  + Add Feedback
                </Link> */}
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
                            <th>Email</th>
                            <th>Phone</th>
                            <th> Description</th>
                            <th> Date</th>
                            <th> Reading Status</th>
                            {/* <th>Actions</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {Feedback?.map((val, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>

                                <td>{val.name}</td>
                                <td>{val.email}</td>
                                <td>{val.mobile}</td>
                               
<td onClick={() => handleShow(val.message,val._id)}>View</td>
<td>
                                  {dateFormat(
                                    `${val?.createdAt}`,
                                    "mmmm dS, yyyy"
                                  )}
                                </td>
                                <td>{val.readstatus === true ? <span class="badge badge-success">Success</span>:<span class="badge badge-primary">Pending</span>}</td>
                                {/* <td><Link to={`/edit-Feedback/${val._id}`} state={{datas:val,id:val._id}} > Edit Feedback </Link></td> */}
                              </tr>

                            );
                          })}
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
      <Modal show={showModal} onHide={handleClose}>
      
        <Modal.Header>
         
          <Modal.Title>
         
            <span className="text-red modalhead">Description</span>
          </Modal.Title>
      
          <button
            type="button modalbtn"
            className="close"
            onClick={handleClose}
          >
           
            <span aria-hidden="true">&times;</span>
          
          </button>
          
        </Modal.Header>
    
        <Modal.Body>
         
          <div className="container">
          
            <div className="row">
             
              <div className="col-md-12">
               
                <div className="row">
                
                  <div className="farm-gallery w-100">
                    
                    {description && (
                        description
                    )}
                   
                  </div>
                 
                </div>
               
              </div>
              
            </div>
        
          </div>
         
        </Modal.Body>
       
      </Modal>
      <Footer />

      <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default Feedback;
