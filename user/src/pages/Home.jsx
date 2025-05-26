import React, { useState, useEffect } from "react";
import api, { uploadApi } from "../api/axios";
import { useAuthContext } from "../context/authContext";

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/home");
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadMessage("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadApi.post("/upload-image", formData);
      setUploadMessage(response.data.message);
      setFile(null);
      // Reset input
      document.getElementById("image-upload").value = "";
    } catch (err) {
      setUploadMessage(err.response?.data?.message || "Failed to upload image");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Home</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {data && (
          <div className="text-center">
            <p className="text-green-500 mb-4">{data.message}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
        <form onSubmit={handleUpload} className="mt-6">
          <div className="mb-4">
            <label htmlFor="image-upload" className="block text-gray-700 text-sm font-bold mb-2">
              Upload Image
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Upload Image
          </button>
          {uploadMessage && (
            <p className={`text-center mt-4 ${uploadMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
              {uploadMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;``