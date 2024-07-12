export async function cloudinaryUpload(fileimg) {
  const formData = new FormData();
  
  formData.append("file", fileimg);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

  return fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, {
    method:"POST",
    body : formData
  })
  .then((response) => response.json()) //Promise response를 return한다.
  .then(data =>{
    console.log("cloudinary에 업로드 완료", data);
    return data.url;
  })
  .catch(console.error)

}

