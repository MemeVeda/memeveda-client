//@ts-nocheck
import React, { useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading';
import CropFunctionality from './crop';
import Button from '@material-ui/core/Button'
import "./UploadImage.scss"

function UploadImage() {
    const [images, setImages] = useState([]);
    const [showimage, setshowimage] = useState(false);
    const maxNumber = 1;

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
      ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
      };

  return (
    <div className="main">
      <ImageUploading
       
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          
        }) => (
          // write your building UI
        

          <div className="upload__image-wrapper">
           
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button>Use existing template</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
              {showimage?<CropFunctionality title = {image.dataURL}/>:<img src={image.dataURL} alt="" width="1000" />}
                <div className="image-item__btn-wrapper">
                  <Button style={{marginBottom: "10px"}} variant="contained"  color="primary"  onClick={()=>setshowimage(!showimage)}>Crop</Button >
                  <Button variant="contained"  color="primary"  onClick={() => onImageRemove(index)}>Remove</Button >
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default UploadImage