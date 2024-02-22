import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link, useNavigate } from "react-router-dom";
// import dateFormat from "dateformat";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const News = () => {
  const [news, setnews] = useState();
  const [showloader, setShowLoader] = useState("none");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState("");
  const navigate = useNavigate();
  const PER_PAGE = 10;
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const getnews = () => {
    setShowLoader("block");

    fetch(
      `${URL}/admin/getAllNews_Admin_Side?page=${currentPage}&perPage=${PER_PAGE}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setShowLoader("none");
        setnews(data);
        setTotalPages(data?.totalPages > 220 ? 220 : 200);
        //  setCurrentPage(data?.currentPage);
      });
  };

  const handleStatus = async (id, e) => {
    const value = e.target.value;

    const patchdata = await axios.put(`${URL}/admin/updateNewsStatus/${id}`, {
      isapproved: value,
    });
    if (patchdata?.status === 200) {
      toast.success("Update Successful...");
      getnews();
    }
  };

  const handleStatusOrder = async (id, e) => {
    const value = e.target.value;

    const patchdata = await axios.put(`${URL}/admin/updateNewsOrder/${id}`, {
      orderby: value,
    });
    if (patchdata?.status === 200) {
      toast.success("Update Successful...");
      getnews();
      navigate("/OrderedNews");
    }
    e.target.value = '';
  
  };

  useEffect(() => {
    getnews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
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
                                <h1>Total News</h1>
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
                <h1>Total News </h1>
              </div>
              <div class="col-sm-4"></div>
              <div class="col-sm-2">
                <Link className="btn btn-primary" to="/add-news">
                  + Add News
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
                    <h3 class="card-title">.</h3>
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
                            <th>Category</th>
                            <th>Status</th>
                            <th>Change Status</th>
                            <th>Order</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {news?.data?.map((val, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{val?.title?.slice(0, 60)} ...</td>
                                <td>
                                  {val?.categoryid.map((catnm, index) => {
                                    return (
                                      <>
                                        {" "}
                                        {catnm?.name} {catnm?.name ? "," : null}
                                        <br />
                                      </>
                                    );
                                  })}
                                </td>
                                <td>{val?.isapproved}</td>

                                <td>
                                  <select
                                    className="form-control"
                                    id="exampleSelectGender"
                                    name="isapproved"
                                    onChange={(e) => handleStatus(val?._id, e)}
                                  >
                                    <option>Select</option>
                                    <option
                                      value="Approved"
                                      selected={
                                        val?.isapproved === "Approved"
                                          ? "selected"
                                          : null
                                      }
                                    >
                                      Approved
                                    </option>
                                    <option
                                      value="Rejected"
                                      selected={
                                        val?.isapproved === "Rejected"
                                          ? "selected"
                                          : null
                                      }
                                    >
                                      Rejected
                                    </option>
                                    <option
                                      value="Pending"
                                      selected={
                                        val?.isapproved === "Pending"
                                          ? "selected"
                                          : null
                                      }
                                    >
                                      Pending
                                    </option>
                                  </select>
                                </td>
                                <td>
                                  {" "}
                                  {/* {dateFormat(
                                  `${val?.createdAt}`,
                                  "mmmm dS, yyyy"
                                )} */}
                                  <select
                                    className="form-control"
                                    id="exampleSelectGender"
                                    name="ordered"
                                    onChange={(e) =>
                                      handleStatusOrder(val?._id, e)
                                    }
                                  >
                                    <option>Select</option>
                                    <option
                                      value="REMOVE"
                                      selected={
                                        val?.orderby == "REMOVE"
                                          ? "selected"
                                          : null
                                      }
                                    >
                                      Remove
                                    </option>
                                    <option
                                      value="A"
                                      selected={
                                        val?.orderby == "A" ? "selected" : null
                                      }
                                    >
                                      1
                                    </option>
                                    <option
                                      value="B"
                                      selected={
                                        val?.orderby == "B" ? "selected" : null
                                      }
                                    >
                                      2
                                    </option>
                                    <option
                                      value="C"
                                      selected={
                                        val?.orderby == "C" ? "selected" : null
                                      }
                                    >
                                      3
                                    </option>
                                    <option
                                      value="D"
                                      selected={
                                        val?.orderby == "D" ? "selected" : null
                                      }
                                    >
                                      4
                                    </option>
                                    <option
                                      value="E"
                                      selected={
                                        val?.orderby == "E" ? "selected" : null
                                      }
                                    >
                                      5
                                    </option>
                                    <option
                                      value="F"
                                      selected={
                                        val?.orderby == "F" ? "selected" : null
                                      }
                                    >
                                      6
                                    </option>
                                    <option
                                      value="G"
                                      selected={
                                        val?.orderby == "G" ? "selected" : null
                                      }
                                    >
                                      7
                                    </option>
                                    <option
                                      value="H"
                                      selected={
                                        val?.orderby == "H" ? "selected" : null
                                      }
                                    >
                                      8
                                    </option>
                                    <option
                                      value="I"
                                      selected={
                                        val?.orderby == "I" ? "selected" : null
                                      }
                                    >
                                      9
                                    </option>
                                    <option
                                      value="J"
                                      selected={
                                        val?.orderby == "J" ? "selected" : null
                                      }
                                    >
                                      10
                                    </option>
                                  </select>
                                </td>
                                <td>
                                  <Link
                                    to={`/edit-news/${val?._id}`}
                                    state={{ datas: val, id: val?._id }}
                                  >
                                    {" "}
                                    <i
                                      class="fa fa-edit"
                                      style={{ color: "red" }}
                                    ></i>{" "}
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4">
                      <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        pageCount={totalPages}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                      />
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

export default News;
