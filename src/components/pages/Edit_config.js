import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const Edit_config = () => {
  const navigate = useNavigate();
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  const [categories, setCategories] = useState();
  const location = useLocation();
  const { datas, id } = location.state;
 const [showDiv1, setShowDiv1] = useState("none");
 const [showloader, setShowLoader] = useState("none");
 const [maindata, setMaindata] = useState({
    title: datas.title,PortionData:datas.PortionData, DisplayNewsBy:datas.DisplayNewsBy,activeId:datas.activeId   
  });
  
  useEffect(() => {
    getcategory();
  }, []);
  const getcategory = () => {
    fetch(`${URL}/admin/getAllCategory`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
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
    const {
      title,PortionData, DisplayNewsBy,activeId   
    } = maindata;
if(!title || !PortionData || !DisplayNewsBy )
{
  toast.error("Enter All Data");
  setShowLoader("none");
    return ;
}

    const fetchdata = fetch(`${URL}/admin/updateConfiguration/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       title,PortionData, DisplayNewsBy,activeId      
      }),
    });

    const response = await fetchdata;
    const res = await response.json();
    
    if (response.status === 200) {
      toast.success("Data Update Successful...");
      setShowLoader("none");
      navigate("/Configuration");
    } else {
      setShowLoader("none");
      toast.error("Invalid Credentials...");
    }
  };

const handleChangeNewsByType = (e) => {
  const advttype = e.target.value;
 if (advttype === "All") {
  
    setShowDiv1("none"); //
    setMaindata({ ...maindata, DisplayNewsBy: advttype });
  }

  if (advttype === "CategoryId") {
    
    setShowDiv1("block"); //
    setMaindata({ ...maindata, DisplayNewsBy: advttype });
  }
  
};
const onGetData = (e) => {
  
 if (datas.DisplayNewsBy === "All") {
  
    setShowDiv1("none"); //
   
  }

  if (datas.DisplayNewsBy === "CategoryId") {
    
    setShowDiv1("block"); //
    
  }
  
};
useEffect(()=>{
  onGetData();
},[]);
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
                <Link className="btn btn-primary" to="/state">
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
                <h3 class="card-name">Edit Config</h3>
                <div class="card-tools">
                 
                </div>
              </div>

              <div class="card-body">
                <form onSubmit={Submit}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Title*</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="title"
                          value={maindata.title}
                          id="exampleInputEmail1"
                          placeholder="Enter Title"
                        />
                      </div>
                  
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Display Data to Portion</label>
                        <select
                          class="form-control select2"
                          onChange={handleChange}
                          name="PortionData"
                          value={maindata.PortionData}
                          
                          style={{ width: "100%" }}
                        >
                        <option>Select </option>
                         <option value="RightSide">RightSide</option>
                          <option value="BottomSide">BottomSide</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                  <div class="col-md-6">
                      <div class="form-group">
                        <label>Display News By </label>
                        <select
                          class="form-control select2"
                          onChange={handleChangeNewsByType}
                          name="DisplayNewsBy"
                          value={maindata.DisplayNewsBy}
                          style={{ width: "100%" }}
                        >
                        <option>Select </option>
                         <option value="All">All</option>
                          <option value="CategoryId">Category Id</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-6" style={{ display: showDiv1 }}>
                      <div class="form-group">
                        <label>Display News By this Category </label>
                        <select
                          class="form-control select2"
                          onChange={handleChange}
                          name="activeId"
                          value={maindata.activeId}
                          
                          style={{ width: "100%" }}
                        >
                        <option>Select Category</option>
                        {categories?.data?.map((val,index)=>{
                          return (
                            <option value={val?._id}>{val?.name}</option>
                         
                          );
                        })}
                         
                        </select>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary mt-2" type="submit">
                    Edit Configuration
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

export default Edit_config;
