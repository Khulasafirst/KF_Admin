import React, { useState } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
 import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
// import axios from "axios";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const Add_epaper = () => {
   const navigate = useNavigate();
   const admintoken2 = sessionStorage.getItem('token');
   const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  const [showloader, setShowLoader] = useState("none");

  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [file4, setFile4] = useState("");
  const [file5, setFile5] = useState("");
  const [file6, setFile6] = useState("");
  const [file7, setFile7] = useState("");
  const [file8, setFile8] = useState("");
  const [file9, setFile9] = useState("");
  const [file10, setFile10] = useState("");
  const [file11, setFile11] = useState("");
  const [file12, setFile12] = useState("");
  const [file13, setFile13] = useState("");
  const [file14, setFile14] = useState("");
  const [file15, setFile15] = useState("");
  const [file16, setFile16] = useState("");
  const [file17, setFile17] = useState("");
  const [file18, setFile18] = useState("");
  const [file19, setFile19] = useState("");
  const [file20, setFile20] = useState("");

  function handleChange1(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile1(result?.url));
      }
    }
  }
  function handleChange2(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile2(result?.url));
      }
    }
  }
  function handleChange3(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile3(result?.url));
      }
    }
  }
  function handleChange4(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile4(result?.url));
      }
    }
  }
  function handleChange5(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile5(result?.url));
      }
    }
  }
  function handleChange6(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile6(result?.url));
      }
    }
  }
  function handleChange7(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile7(result?.url));
      }
    }
  }
  function handleChange8(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile8(result?.url));
      }
    }
  }
  function handleChange9(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile9(result?.url));
      }
    }
  }
  function handleChange10(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile10(result?.url));
      }
    }
  }
  function handleChange11(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile11(result?.url));
      }
    }
  }
  function handleChange12(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile12(result?.url));
      }
    }
  }
  function handleChange13(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile13(result?.url));
      }
    }
  }

  function handleChange14(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile14(result?.url));
      }
    }
  }
  function handleChange15(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile15(result?.url));
      }
    }
  }
  function handleChange16(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile16(result?.url));
      }
    }
  }
  function handleChange17(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile17(result?.url));
      }
    }
  }
  function handleChange18(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile18(result?.url));
      }
    }
  }
  function handleChange19(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile19(result?.url));
      }
    }
  }
  function handleChange20(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 1024 * 1024 * 1024;
      if (fileSize > maxSize) {
        alert("File size exceeds the maximum limit.");
      } else {
        var formdata = new FormData();
        formdata.append("file", e?.target?.files[0]);
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };
        fetch(`${URL}/admin/imageUpload_Use/imageUpload`, requestOptions)
          .then((response) => response.json())
          .then((result) => setFile20(result?.url));
      }
    }
  }

 

  // const handleChange = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   setMaindata({ ...maindata, [name]: value });
  // };

  const Submit = async (e) => {
    e.preventDefault();

    // const { name, name2 } = maindata;
    setShowLoader("block");
    const fetchdata = fetch(`${URL}/admin/addPaper`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paperdate: "27/09/2023",
        paperimages: [
          {
            pagenumber: "1",
            mainimage_url: file1,
          },
          {
            pagenumber: "2",
            mainimage_url: file2,
          },
          {
            pagenumber: "3",
            mainimage_url: file3,
          },
          {
            pagenumber: "4",
            mainimage_url: file4,
          },
          {
            pagenumber: "5",
            mainimage_url: file5,
          },
          {
            pagenumber: "6",
            mainimage_url: file6,
          },
          {
            pagenumber: "7",
            mainimage_url: file7,
          },
          {
            pagenumber: "8",
            mainimage_url: file8,
          },
          {
            pagenumber: "9",
            mainimage_url: file9,
          },
          {
            pagenumber: "10",
            mainimage_url: file10,
          },
          {
            pagenumber: "11",
            mainimage_url: file11,
          },
          {
            pagenumber: "12",
            mainimage_url: file12,
          },
          {
            pagenumber: "13",
            mainimage_url: file13,
          },
          {
            pagenumber: "14",
            mainimage_url: file14,
          },
          {
            pagenumber: "15",
            mainimage_url: file15,
          },
          {
            pagenumber: "16",
            mainimage_url: file16,
          },
          {
            pagenumber: "17",
            mainimage_url: file17,
          },
          {
            pagenumber: "18",
            mainimage_url: file18,
          },
          {
            pagenumber: "19",
            mainimage_url: file19,
          },
          {
            pagenumber: "20",
            mainimage_url: file20,
          },
        ],
      }),
    });

    const response = await fetchdata;
    await response.json();
    // alert("Add Successfully");
    if (response.status === 200) {
      toast.success("Data Add Successful...");
      setShowLoader("none");
      navigate("/getallepaper");
    } else {
      setShowLoader("none");
      toast.error("Fail..");
      //alert("Invalid Credentials");
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
                      
                      <div className="container">
                        <div className="row">
                          <div className="col-md-1"></div>
                          <div className="col-md-10 post-form-border">
                            <form
                              className="add-post"
                              onSubmit={Submit}
                              action="/"
                            >
                              <div className="mb-3 mt-3 upload-photo">
                                <h6>UPLOAD PAGES</h6>
                                <span className="text-danger">
                                  (max 30 mb for each photo only)
                                </span>
                                <div className="row mt-3">
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange1}
                                      />
                                      <img src={file1} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange2}
                                      />
                                      <img src={file2} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange3}
                                      />
                                      <img src={file3} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange4}
                                      />
                                      <img src={file4} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange5}
                                      />
                                      <img src={file5} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange6}
                                      />
                                      <img src={file6} alt="xyz" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange7}
                                      />
                                      <img src={file7} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange8}
                                      />
                                      <img src={file8} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange9}
                                      />
                                      <img src={file9} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange10}
                                      />
                                      <img src={file10} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange11}
                                      />
                                      <img src={file11} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange12}
                                      />
                                      <img src={file12} alt="xyz" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange13}
                                      />
                                      <img src={file13} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange14}
                                      />
                                      <img src={file14} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange15}
                                      />
                                      <img src={file15} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange16}
                                      />
                                      <img src={file16} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange17}
                                      />
                                      <img src={file17} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange18}
                                      />
                                      <img src={file18} alt="xyz" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange19}
                                      />
                                      <img src={file19} alt="xyz" />
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="upload-img-box">
                                      <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                        onChange={handleChange20}
                                      />
                                      <img src={file20} alt="xyz" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-md-4"></div>
                                  <div className="col-md-4">
                                    {" "}
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                      style={{
                                        cursor: "pointer",
                                        width: "100%",
                                      }}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                  <div className="col-md-4"></div>
                                </div>
                              </div>
                            </form>
                          </div>
                          {/* <div className='col-md-5'></div>  */}
                          <div className="col-md-1"></div>
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
