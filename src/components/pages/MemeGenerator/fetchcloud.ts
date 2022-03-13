import axios from "axios";

const imageUpload = (imageFile: any, callback: any) => {
  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append("cloud_name","dsrpn6k2o");
  formData.append(
    "upload_preset",
    "g473fiwy"
  );

  axios
    .post(
       "https://api.cloudinary.com/v1_1/dsrpn6k2o/image/upload",
      formData
    )
    .then((resp: any) => resp.data.url)
    .then(url => callback(url))
    .catch(err => console.log(err))
};

export default imageUpload;