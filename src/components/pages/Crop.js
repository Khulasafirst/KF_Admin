import React, { useState } from 'react';
import axios from 'axios';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
const URL = process.env.REACT_APP_URL;

const Crop = () => {
    const [imageOne, setImageOne] = useState();
    const [data1, setdata1] = useState();
    var a = useState(""), image = a[0], setImage = a[1];
    var b = useState(), cropper = b[0], setCropper = b[1];
    var c = useState(), cropData = c[0], setCropData = c[1];

    const fileCreationFromURL = (inputURI) => {
        console.log(inputURI);
        if (inputURI !== '') {
            let arr = inputURI.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];
            let data1 = arr[1];
            let dataStr = atob(data1);
            let n = dataStr.length;
            let dataArr = new Uint8Array(n);
            while (n--) {
                dataArr[n] = dataStr.charCodeAt(n);
            }
            let file = new File([dataArr], 'output.jpg', { type: mime });
            return file;
        }
        return;
    }
    
   var onChange = function (e) {
        e.preventDefault();
        var files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        }
        else if (e.target) {
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
                src: (cropData),
                alt: cropData.name,
            });
        }

        var file = fileCreationFromURL(cropData);
        const myurl = `${URL}/admin/imageUpload_Use/imageUpload`;
        var bodyFormData = new FormData();
        bodyFormData.append('file', file);
        axios({
            method: 'post',
            url: myurl,
            data: bodyFormData,
        })
            .then((result) => {
                setImageOne(result?.data?.url);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const resetone = () => {
        setImage(null);
        const imageOne = document.getElementById('imageOne');
        if (imageOne) {
            imageOne.value = null;
        }
        setImg({
            src: ('/assets/images/no-image.png'),
            alt: null,
        });
    };
    const [{ alt, src }, setImg] = useState({
        src: '/assets/images/no-image.png',
        alt: '',
    });

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'>
                        <label className="form-label">Image 1</label>
                        <input id="imageOne" type="file" className="form-control" onChange={onChange} />
                    </div>
                    <div className="col-md-3">
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
                    
                    <div className='row'>
                       
                                <div className="col-md-2 my-5">
                                    <div className="tba-input-file-preview">
                                        <img
                                            src={imageOne}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                </div>
                           
                    </div>
                </div>
            </div>
        </>
    )
}

export default Crop