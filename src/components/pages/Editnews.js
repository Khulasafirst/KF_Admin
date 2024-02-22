import React, { useState, useEffect } from "react";
import TopNavbar from "../Template/TopNavbar";
import SideNav from "../Template/SideNav";
import Footer from "../Template/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Editor from "./Editor";
import Multiselect from "multiselect-react-dropdown";
import { toast } from "react-toastify";
import loaderimg from "../../assets/image/loader.gif";
import RichTextEditor from "./RichTextEditor";
import axios from "axios";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Login from './Login';
const URL = process.env.REACT_APP_URL;

const Editnews = () => {
  const location = useLocation();
  const admintoken2 = sessionStorage.getItem('token');
  const WEBSITE2 = sessionStorage.getItem('WEBSITE');
  const { datas, id } = location.state;
  const navigate = useNavigate();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [maindata, setMaindata] = useState({
    title: "",
    slug: "",
    imagename: "tree-736885_1280.jpg",
    imageurl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    categoryid: "",
    tag: "",
    state: "",
    city: "",
    country: "",
    postedby: "",
    breakingnews: "false",
  });
  const [data, setData] = useState(); // ye vala ck eitor ka he
  const [categories, setCategories] = useState();
  const [tags, setTags] = useState();
  const [multi_tags, set_multi_Tags] = useState();
  const [multi_categories, set_multi_Categories] = useState();
  const [multi_City, set_multi_City] = useState();
  const [states, setStates] = useState();
  const [states1, setStates1] = useState();
  const [country1, setCountry] = useState();
  const [cities, setcities] = useState();
  const [url, seturl] = useState();
  const [showloader, setShowLoader] = useState("none");

  const [filename, setfilename] = useState("");
  // ==============================image cropper start
  const [imageOne, setImageOne] = useState();
  const [data1, setdata1] = useState();
  var a = useState(""),
    image = a[0],
    setImage = a[1];
  var b = useState(),
    cropper = b[0],
    setCropper = b[1];
  var c = useState(),
    cropData = c[0],
    setCropData = c[1];

  const fileCreationFromURL = (inputURI) => {
    console.log(inputURI);
    if (inputURI !== "") {
      let arr = inputURI.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let data1 = arr[1];
      let dataStr = atob(data1);
      let n = dataStr.length;
      let dataArr = new Uint8Array(n);
      while (n--) {
        dataArr[n] = dataStr.charCodeAt(n);
      }
      let file = new File([dataArr], "output.jpg", { type: mime });
      return file;
    }
    return;
  };

  var onChange = function (e) {
    e.preventDefault();
    var files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    var reader = new FileReader();
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  var getCropData = function () {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      setdata1(cropper.cropBoxData);
    }
  };

  const handleImage = (cropData) => {
    if (cropData) {
      setImg({
        src: cropData,
        alt: cropData.name,
      });
    }

    var file = fileCreationFromURL(cropData);
    const myurl = `${URL}/admin/imageUpload_Use/imageUpload`;
    var bodyFormData = new FormData();
    bodyFormData.append("file", file);
    axios({
      method: "post",
      url: myurl,
      data: bodyFormData,
    })
      .then((result) => {
        setImageOne(result?.data?.url);
      })
      .catch((error) => {
        alert(
          `Error Message : ${error?.response?.data?.message} , Error Code : ${error?.response?.data?.status} ,Error : ${error}`
        );
        console.error("Error:", error);
      });
  };

  const resetone = () => {
    setImage(null);
    const imageOne = document.getElementById("imageOne");
    if (imageOne) {
      imageOne.value = null;
    }
    setImg({
      src: "/assets/images/no-image.png",
      alt: null,
    });
  };
  const [{ alt, src }, setImg] = useState({
    src: "/assets/images/no-image.png",
    alt: "",
  });
  // ++++++++++++Image Cropper end ++++++++++++++++++++++++++++

  // Editor start
  const [value, setValue] = useState("");
  const getValue = (value) => {
    setValue(value);
    setData(value);
  };

  // Editor end
  // Original belwo this file
  const ImageUploadSubmit = async (e) => {
    setShowLoader("block");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    var requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(
        `${URL}/admin/imageUpload_Use/imageUpload`,
        formData,
        requestOptions
      )
      .then((response) => {
        setShowLoader("none");
        seturl(response?.data?.url);
        setfilename(response?.data?.filename);
        setShowLoader("none");
      })
      .catch((error) => {
        setShowLoader("none");
        toast.error("Image Size Too large .Please Select Small Size Image...");
      });

    // var requestOptions = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
    // const fetchdata = axios.post(
    //   `${URL}/admin/imageUpload_Use/imageUpload`,
    //   formData,
    //   requestOptions
    // );
    // const response = await fetchdata;
    // if (response.status === 200) {

    //   setShowLoader("none");

    //   seturl(response?.data?.url);
    //   setfilename(response?.data?.filename);
    //   if (response.status === 413)
    //   {
    //   toast.error("Image Size Too large .Please Select Small Size Image...");
    //   setShowLoader("none");
    //   }
    // } else {
    //   setShowLoader("none");
    //   toast.error("Fail To Load...");
    // }
  };

  const ImageUpload2Submit = async (e) => {
    setShowLoader("block");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    var requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(
        `${URL}/admin/imageUpload_Use/imageUpload`,
        formData,
        requestOptions
      )
      .then((response) => {
        setShowLoader("none");
        seturl(response?.data?.url);
        setfilename(response?.data?.filename);
        setShowLoader("none");
      })
      .catch((error) => {
        setShowLoader("none");
        toast.error("Image Size Too large .Please Select Small Size Image...");
      });

    // var requestOptions = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
    // const fetchdata = axios.post(
    //   `${URL}/admin/imageUpload_Use/imageUpload`,
    //   formData,
    //   requestOptions
    // );
    // const response = await fetchdata;
    // if (response.status === 200) {

    //   setShowLoader("none");

    //   seturl(response?.data?.url);
    //   setfilename(response?.data?.filename);
    //   if (response.status === 413)
    //   {
    //   toast.error("Image Size Too large .Please Select Small Size Image...");
    //   setShowLoader("none");
    //   }
    // } else {
    //   setShowLoader("none");
    //   toast.error("Fail To Load...");
    // }
  };

  //  ================original Start
  // original
  // const ImageUploadSubmit = async (e) => {
  //   setShowLoader("block");
  //   const formData = new FormData();
  //   formData.append("file", e.target.files[0]);
  //   var requestOptions = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   const fetchdata = axios.post(
  //     `${URL}/admin/imageUpload_Use/imageUpload`,
  //     formData,
  //     requestOptions
  //   );
  //   const response = await fetchdata;
  //   if (response.status === 200) {
  //     //toast.success("Data Uploaded Successfully...");
  //     setShowLoader("none");
  //     //   alert(response?.data?.imagename);
  //     seturl(response?.data?.url);
  //     setfilename(response?.data?.filename);
  //   } else {
  //     setShowLoader("none");
  //     toast.error("Fail To Load...");
  //   }
  //   setShowLoader("none");
  // };

  //  ================original edn

  const getcategory = () => {
    fetch(`${URL}/admin/getAllCategory`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      });
  };
  const gettags = () => {
    fetch(`${URL}/admin/getAllTags`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTags(data);
        console.log(data);
      });
  };
  const getstates = () => {
    fetch(`${URL}/admin/getAllState`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStates(data);
      });
  };
  const getcountry = () => {
    fetch(`${URL}/admin/getAllCountry`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountry(data.data[0]._id);
      });
  };
  const getcity = (e) => {
    const id = e.target.value;
    fetch(`${URL}/admin/getCityByStateId/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setcities(data);
      });
  };

  useEffect(() => {
    getcategory();
    getstates();
    gettags();
    getcountry();
    setEditorLoaded(true);
  }, []);
  const getcity2 = () => {
    const id = states1;
    fetch(`${URL}/admin/getCityByStateId/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setcities(data);
      });
  };
  useEffect(() => {
    getcity2();
  }, [states1]);
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMaindata({ ...maindata, [name]: value });
  };

  const Submit = async (e) => {
    setShowLoader("block");

    e.preventDefault();
    const { title, slug, subcategoryid, state, breakingnews, tag } = maindata;

    const fetchdata = fetch(`${URL}/admin/updateNews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        slug: slug,
        description: data,
        imagename: filename,
        thumbnailImage: imageOne,
        imageurl: url,
        categoryid: multi_categories,
        subcategoryid: subcategoryid,
        // tags: multi_tags,
        tag: tag,
        state: state,
        city: multi_City,
        country: country1,
        postedby: "64c26f5e6ba8684c49816503",
        breakingnews: breakingnews,
      }),
    });

    const response = await fetchdata;
    const res = await response.json();

    if (response.status === 200) {
      sessionStorage.setItem("token", res.token);
      toast.success("Data Add Successful...");
      setShowLoader("none");

      navigate("/news");
    } else {
      setShowLoader("none");
      toast.error("Invalid Credentials...");
    }
  };

  const getNewsDataById = async () => {
    const query = await axios.get(`${URL}/admin/getSingleNewsById/${id}`);
    const res1 = await query.data;
    console.log(res1);
    setMaindata(res1.data);
    setData(res1.data.description);
    setValue(res1.data.description);
    set_multi_Categories(res1.data.categoryid);
    setTags(res1.data.tags);
    set_multi_Tags(res1.data.tags);
    set_multi_City(res1.data.city);
    setStates1(res1.data.state._id);
    setImageOne(res1?.data?.thumbnailImage);
  };

  useEffect(() => {
    getNewsDataById();
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
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>News </h1>
              </div>
              <div class="col-sm-4"></div>
              <div class="col-sm-2">
                <Link className="btn btn-primary" to="/news">
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
                <h3 class="card-title">Edit News</h3>
                <div class="card-tools">
                  <button
                    type="button"
                    class="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-tool"
                    data-card-widget="remove"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>

              <div class="card-body">
                <form onSubmit={Submit}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">News Title *</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="title"
                          value={maindata.title}
                          id="exampleInputEmail1"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">News Slug *</label>
                        <input
                          type="text"
                          onChange={handleChange}
                          name="slug"
                          value={maindata.slug}
                          class="form-control"
                          id="exampleInputEmail1"
                          placeholder="Enter slug"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>News Category *</label>

                        <Multiselect
                          className="inputHead"
                          onRemove={(event) => {
                            console.log(event);
                          }}
                          onSelect={(event) => {
                            set_multi_Categories(event);
                          }}
                          options={categories?.data}
                          selectedValues={multi_categories}
                          displayValue="name"
                          showCheckbox
                        />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <label>State </label>
                        <select
                          class="form-control select2"
                          onChange={getcity}
                          style={{ width: "100%" }}
                        >
                          {states?.data?.map((val, index) => {
                            return (
                              <option
                                value={val._id}
                                selected={
                                  states1 === val._id ? "selected" : null
                                }
                                key={index}
                              >
                                {val.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label>City *</label>
                        <Multiselect
                          className="inputHead"
                          onRemove={(event) => {
                            console.log(event);
                          }}
                          onSelect={(event) => {
                            set_multi_City(event);
                          }}
                          options={cities?.data}
                          selectedValues={multi_City}
                          displayValue="name"
                          showCheckbox
                        />

                        {/* <select
                          class="form-control select2"
                          style={{ width: "100%" }}
                        >
                          {cities?.data?.map((val, index) => {
                            return (
                              <option value={val._id} key={index}>
                                {val.name}
                              </option>
                            );
                          })}
                        </select> */}
                      </div>
                    </div>
                    {/* <div class="col-md-3">
                      <div class="form-group">
                        <label>Featured Photo/Video</label>
                        <select
                          class="form-control select2"
                          style={{ width: "100%" }}
                        >
                          <option selected="selected">Alabama</option>
                          <option>Alaska</option>
                          <option>California</option>
                          <option>Delaware</option>
                          <option>Tennessee</option>
                          <option>Texas</option>
                          <option>Washington</option>
                        </select>
                      </div>
                    </div> */}
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>TAGS *</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={handleChange}
                          name="tag"
                          value={maindata.tag}
                          id="exampleInputEmail1"
                        />
                        {/* <Multiselect
                          className="inputHead"
                          onRemove={(event) => {
                            console.log(event);
                          }}
                          onSelect={(event) => {
                            set_multi_Tags(event);
                          }}
                          options={tags?.data}
                          selectedValues={multi_tags}
                          displayValue="name"
                          showCheckbox
                        /> */}
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
                          // placeholder="Enter title"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Thumbnail Image</label>
                        <input
                          type="file"
                          class="form-control"
                          onChange={ImageUpload2Submit}
                          name="file"
                          id="exampleInputEmail1"
                          placeholder="Upload Image"
                        />{" "}
                      </div>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-md-12">
                    {image && <>
                            <Cropper
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                src={image}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false}
                                onInitialized={(instance) => {
                                    setCropper(instance);
                                }}
                                guides={true}
                            />
                            <div className="cropimgbtn">
                                <button className="btn btn-primary " type='button' onClick={getCropData}>Crop Image</button>
                                <button className="btn btn-primary mr-2" type='button' onClick={() => handleImage(cropData)}>  Upload Image</button>
                            </div>
                        </>
                        } 
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                    <img
                       src={imageOne}
                       className="img-fluid"
                       alt=""
                      />
                    </div>
                  </div> */}
                  <div class="row">
                    <div class="col-md-12">
                      {/* <Editor
                        name="description"
                        onChange={(data) => {
                          setData(data);
                        }}
                        value={data}
                        editorLoaded={editorLoaded}
                      /> */}
                      <RichTextEditor initialValue={data} getValue={getValue} />
                    </div>
                  </div>
                  <button className="btn btn-primary mt-2" type="submit">
                    Update News
                  </button>
                </form>
                {/* Loader start */}
                {/* <div
                  className="loader-container "
                  style={{ display: showloader }}
                >
                  <img src={loaderimg} alt="" className="loaderImage" />
                </div> */}
                {/* Loader End */}
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

export default Editnews;
