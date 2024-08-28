import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";

const ImageForm = ({ setImage, userType }) => {
  const preset_name = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_NAME;
  const [loading, setLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Verifica si hay una imagen almacenada para el usuario
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      const userData = JSON.parse(userFromStorage);
      if (userData.imageUrl) {
        setImageUploaded(true); // Si ya hay una imagen, establece el estado en true
        setImage(userData.imageUrl); // Opcional: establece la imagen en el estado del componente padre
      }
    }
  }, [setImage]); // Este efecto se ejecuta una vez cuando se monta el componente

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
      let addImage

      if(userType === "host") {

      addImage = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/host/upload`,
        {
          method: "POST",
          body: JSON.stringify({
            imageUrl: file.secure_url,
            user,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );}
      else {
        addImage = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/guest/upload`,
          {
            method: "POST",
            body: JSON.stringify({
              imageUrl: file.secure_url,
              user,
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      const finalRes = await addImage.json();
      console.log(finalRes);
      const userFromStorage = localStorage.getItem("user");
      let userData = JSON.parse(userFromStorage);
      console.log("User data: ", userData);
      userData.imageUrl = file.secure_url;
      localStorage.setItem("user", JSON.stringify(userData));
      setImage(file.secure_url);
      setImageUploaded(true); // Actualizar el estado para indicar que la imagen fue cargada
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const handleEditPhoto = () => {
    setImageUploaded(false); // Permitir subir una nueva imagen
  };

  return (
    <div className="relative">
      {imageUploaded ? (
        <button
          onClick={handleEditPhoto}
          className="text-lg font-semibold text-lime-200 bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg shadow-md transition-all"
        >
          Edit photo
        </button>
      ) : (
        <>
          <input
            type="file"
            id="fileInput"
            name="file"
            onChange={uploadImage}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="mb-4 bg-purple-500 hover:bg-purple-600 text-lime-200 py-2 px-4 rounded cursor-pointer"
          >
            Select File
          </label>
        </>
      )}

      {loading && <h3>Loading...</h3>}
    </div>
  );
};

ImageForm.propTypes = {
  setImage: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
};

export default ImageForm;
