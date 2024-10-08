import { useState } from "react";
import PropTypes from "prop-types";

const ImageFormAccommodation = ({ accommodationId, onSave }) => {
  const preset_name = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloud_name = import.meta.env.VITE_CLOUDINARY_NAME;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = Array.from(e.target.files);

    setLoading(true);

    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", preset_name);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            {
              method: "POST",
              body: data,
            }
          );

          const fileData = await response.json();
          return fileData.secure_url;
        })
      );

      setImages([...images, ...uploadedImages]);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
    }
  };

  const handleSaveImages = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/accommodation/${accommodationId}/images`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ images }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save images");
      }

      const data = await response.json();
      onSave(data.images);
    } catch (error) {
      console.error("Error saving images:", error);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        id="fileInput"
        name="file"
        onChange={uploadImage}
        className="hidden"
      />
      <label
        htmlFor="fileInput"
        className="mb-4 bg-purple-500 hover:bg-purple-600 text-lime-200 py-2 px-4 rounded cursor-pointer flex justify-center items-center"
      >
        Select File
      </label>

      {loading && <h3>Loading...</h3>}

      <div className="grid grid-cols-2 gap-2 mt-5">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Uploaded ${index + 1}`}
            className="w-full h-auto rounded-lg"
          />
        ))}
      </div>

      <button
        onClick={handleSaveImages}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Save Changes
      </button>
    </div>
  );
};

ImageFormAccommodation.propTypes = {
  accommodationId: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ImageFormAccommodation;
