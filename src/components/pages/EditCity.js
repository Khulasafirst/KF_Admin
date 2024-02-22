import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const EditCity = () => {
  const location = useLocation();
  const { datas, id ,stateid} = location.state;
  const [showloader, setShowLoader] = useState("none");

  const navigate = useNavigate();
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  //const { id } = useParams();
  const [maindata, setMaindata] = useState({
    name: datas.name,
     stateid: datas.stateid.id,
     countryid: "64c3a183c52afe2aeead30ec",
  });
  const [states, setStates] = useState();
  useEffect(() => {
    getstates();
  }, []);
  const getstates = () => {
    setShowLoader("block");

    fetch(`${URL}/admin/getAllState`)
      .then((response) => {
        setShowLoader("none");

        return response.json();
      })
      .then((data) => {
        setStates(data);
      });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMaindata({ ...maindata, [name]: value });
  };

  const Submit = async (e) => {
    setShowLoader("block");

    e.preventDefault();
    const { name, stateid } = maindata;

    const fetchdata = fetch(
      `${URL}/api/v1/admin/updateCityById/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          stateid: stateid,
          countryid: "64c3a183c52afe2aeead30ec",
        }),
      }
    );

    const response = await fetchdata;
    const res = await response.json();
    alert("Add Successfully");
    if (response.status === 200) {
      toast.success("Data Add Successfully...");
      setShowLoader("none");
      
      navigate("/city");
    } else {
      setShowLoader("none");
      toast.error("Invalid Credentials...");
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
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1> </h1>
              </div>
              <div class="col-sm-4"></div>
              <div class="col-sm-2">
                <Link className="btn btn-primary" to="/city">
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
                <h3 class="card-name">Edit city</h3>
                <div class="card-tools"></div>
              </div>

              <div class="card-body">
                <form onSubmit={Submit}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">city Name *</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="name"
                          value={maindata.name}
                          id="exampleInputEmail1"
                          placeholder="Enter name"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>State *</label>
                        <select
                          class="form-control select2"
                          onChange={handleChange}
                          name="stateid"
                        //  value={maindata.stateid}
                          style={{ width: "100%" }}
                        >
                         
                          {states?.data?.map((val, index) => {
                            return (
                              <option value={val._id} selected={val._id == datas.stateid._id ?'selected':''} key={index}>
                                {val.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary mt-2" type="submit">
                    Add city
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

export default EditCity;
