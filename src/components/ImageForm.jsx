import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";

const ImageForm = ({ setImage }) => {
  const preset_name = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_NAME;
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", preset_name);

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const file = await response.json();
      console.log(file);

      const addImage = await fetch(`${import.meta.env.VITE_API_URL}/auth/host/upload`, {
        method: "POST",
        body: JSON.stringify({
          imageUrl: file.secure_url,
          user,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const finalRes = await addImage.json();
      console.log(finalRes);
      const userFromStorage = localStorage.getItem("user");
      let userData = JSON.parse(userFromStorage);
      console.log("User data: ", userData);
      userData.imageUrl = file.secure_url;
      localStorage.setItem("user", JSON.stringify(userData));
      setImage(file.secure_url);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
        className="mb-4"
      />

      {loading && <h3>Loading...</h3>}
    </div>
  );
};

ImageForm.propTypes = {
  setImage: PropTypes.func.isRequired,
};
export default ImageForm;

