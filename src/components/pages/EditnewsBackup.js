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
const URL = process.env.REACT_APP_URL;

const Editnews = () => {
  const location = useLocation();
  const { datas, id } = location.state;
  const navigate = useNavigate();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [maindata, setMaindata] = useState({
    title: datas?.title,
    slug: datas?.slug,
    imagename: "tree-736885_1280.jpg",
    imageurl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    categoryid: datas?.categoryid,
    tags: datas?.tags,
    city: datas?.city,
    country: "",
    postedby: "",
    breakingnews: "false",
  });
  const [data, setData] = useState(datas?.description); // ye vala ck eitor ka he
  const [categories, setCategories] = useState();
  const [tags, setTags] = useState();
  const [multi_tags, set_multi_Tags] = useState(datas?.tags);
  const [multi_categories, set_multi_Categories] = useState(datas?.categoryid);
  const [multi_City, set_multi_City] = useState(datas?.city);
  const [states, setStates] = useState();
  const [country1, setCountry] = useState();
  const [cities, setcities] = useState();
  const [url, seturl] = useState();
  const [showloader, setShowLoader] = useState("none");

  const [filename, setfilename] = useState("");

  // Editor start
  const [value, setValue] = useState("");
  const getValue = (value) => {
    setValue(value);
    setData(value);
  };

  // Editor end

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
     //   alert(response?.data?.imagename);
      seturl(response?.data?.url);
      setfilename(response?.data?.filename);
    } else {
      setShowLoader("none");
      toast.error("Fail To Load...");
    }
    setShowLoader("none");
  };

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

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setMaindata({ ...maindata, [name]: value });
  };

  const Submit = async (e) => {
    setShowLoader("block");

    e.preventDefault();
    const {
      title,
      slug,
     
      subcategoryid,
      state,
      breakingnews,
    } = maindata;

    const fetchdata = fetch(`${URL}/admin/updateNews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        slug: slug,
        description: data,
        imagename: filename,
        imageurl: url,
        categoryid: multi_categories,
        subcategoryid: subcategoryid,
        tags: multi_tags,
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
    const res1=await query.data;
    console.log(res1);
   // setMaindata(res1.data);
    // setData(res1.data.data.description);
    // setCategories(res1.data.data.categoryid);
    // setTags(res1.data.data.tags);
    // set_multi_Tags(res1.data.data.tags);
    // set_multi_Categories(res1.data.data.categoryid);
    // set_multi_City(res1.data.data.city);
      
  };

useEffect(()=>{
  getNewsDataById();
},[]);

 


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
                        <label>State *</label>
                        <select
                          class="form-control select2"
                          onChange={getcity}
                          style={{ width: "100%" }}
                        >
                          {states?.data?.map((val, index) => {
                            return (
                              <option value={val._id} key={index}>
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

                        <Multiselect
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
                          // placeholder="Enter title"
                        />
                      </div>
                    </div>
                  </div>

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
        <div className="loader-container " style={{ display: showloader }}>
          <img src={loaderimg} alt="" className="loaderImage" />
        </div>
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
