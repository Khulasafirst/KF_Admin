import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
// import { Link } from "react-router-dom";
// import dateFormat from "dateformat";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import axios from "axios";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const OrderedNews = () => {
  const [OrderedNews, setOrderedNews] = useState();
  const [showloader, setShowLoader] = useState("none");
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  const getOrderedNews = () => {
    setShowLoader("block");

    fetch(`${URL}/admin/getOrderedNews`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setShowLoader("none");

        setOrderedNews(data);
      });
  };

  useEffect(() => {
    getOrderedNews();
  }, []);
  const handleStatus = async (id,e) => {
    const value = e.target.value;
  
     const patchdata = await axios.put(
       `${URL}/admin/updateNewsOrder/${id}`,
       { orderby: value }
     );
     if (patchdata?.status === 200) {
       toast.success("Update Successful...");
       getOrderedNews();
     }
      e.target.value = '';
  
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
                                <h1>Total OrderedNews</h1>
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
                <h1>Total OrderedNews</h1>
              </div>
              <div class="col-sm-4"></div>
             
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
                          <th>Title</th>
                          <th>Order</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {OrderedNews?.data?.map((val, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{val?.title?.slice(0, 60)} ...</td>
                              <td>{
                                  val?.orderby == "A" ? 1 :'' ||
                                  val?.orderby == "B" ? 2 :''||
                                  val?.orderby == "C" ? 3 :''||
                                  val?.orderby == "D" ? 4 :''||
                                  val?.orderby == "E" ? 5 :''||
                                  val?.orderby == "F" ? 6 :''||
                                  val?.orderby == "G" ? 7 :''||
                                  val?.orderby == "H" ? 8 :''||
                                  val?.orderby == "I" ? 9 :''||
                                  val?.orderby == "J" ? 10 :''
                              
                              }</td>
                              <td>
                              <select
                                    className="form-control"
                                    id="exampleSelectGender"
                                    name="ordered"
                                    onChange={(e)=>handleStatus(val?._id,e)}
                                  >
                                    <option>Select</option>
                                    <option value="REMOVE" selected={val?.orderby == "REMOVE" ? "selected" : null}>Remove</option>
                                    <option value="A" selected={val?.orderby == "A" ? "selected" : null}>1</option>
                                    <option value="B" selected={val?.orderby == "B" ? "selected" : null} >2</option>
                                    <option value="C" selected={val?.orderby == "C" ? "selected" : null} >3</option>
                                    <option value="D" selected={val?.orderby == "D" ? "selected" : null}>4</option>
                                    <option value="E" selected={val?.orderby == "E" ? "selected" : null} >5</option>
                                    <option value="F" selected={val?.orderby == "F" ? "selected" : null} >6</option>
                                    <option value="G" selected={val?.orderby == "G" ? "selected" : null} >7</option>
                                    <option value="H" selected={val?.orderby == "H" ? "selected" : null}>8</option>
                                    <option value="I" selected={val?.orderby == "I" ? "selected" : null} >9</option>
                                    <option value="J" selected={val?.orderby == "J" ? "selected" : null} >10</option>
                               
                                  </select>
                              </td>
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
      <Footer />

      <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
};

export default OrderedNews;
