import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuthContext } from "../context/authContext";

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const {user} = useAuthContext()

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
      </div>
    </div>
  );
};

export default Home;