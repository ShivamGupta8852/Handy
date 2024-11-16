import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
// import { loginWorker } from '../redux/authSlice';

const WorkerSignup = () => {
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    skills: '',
    experience: '',
    location: {
      city: '',
      state: '',
      coordinates: { lat: '', lng: '' },
    },
    range: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          location: {
            ...formData.location,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/worker/signup', formData);
      // dispatch(loginWorker(data));
      alert('Signup successful!');
    } catch (err) {
      console.error(err);
      alert('Error during signup');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Worker Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Full Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Password"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Skills (comma separated)"
        />
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="Years of Experience"
        />
        <div className="flex justify-between mb-2">
          <input
            type="text"
            name="city"
            value={formData.location.city}
            onChange={handleChange}
            className="w-5/12 p-2 border border-gray-300 rounded"
            placeholder="City"
          />
          <input
            type="text"
            name="state"
            value={formData.location.state}
            onChange={handleChange}
            className="w-5/12 p-2 border border-gray-300 rounded"
            placeholder="State"
          />
          <button
            type="button"
            onClick={handleLocationFetch}
            className="w-1/12 p-2 bg-blue-500 text-white rounded"
          >
            🗺️
          </button>
        </div>
        <input
          type="number"
          name="range"
          value={formData.range}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Preferred Work Range (km)"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default WorkerSignup;
