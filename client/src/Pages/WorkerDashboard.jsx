import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SummarySection from '../component/worker/SummarySection.jsx';
import AppliedJobs from '../component/worker/AppliedJobs.jsx';
import Analytics from '../component/worker/Analytics.jsx';
import Reviews from '../component/worker/Reviews.jsx';
import CompletedJobs from '../component/worker/CompletedJobs.jsx';

const WorkerDashboard = () => {
  const [worker, setWorker] = useState(null); // Worker data

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const res = await axios.get('http://localhost:8002/api/worker/dashboard', {
          withCredentials: true,
        });

        if (res.data.success) {
          toast.success(res.data.message, {
            theme: "dark",
            autoClose: 1000,
            position: "top-center",
          });

          setWorker(res.data.worker);
        }

      } catch (error) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.success === false) {
          toast.warn(error.response.data.message, { theme: "dark", autoClose: 1000, position: "top-center", });
        } else {
          console.error("Error:", error);
          toast.error("Something went wrong. Please try again.", { theme: "dark", autoClose: 1000, position: "top-center", });
        }
      }
    };
    fetchWorkerData();
  }, []);


  if (!worker) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded shadow p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{worker.name}'s Dashboard</h1>
          <p className="text-gray-600">Rating: {worker.rating || 'No ratings yet'}</p>
          <p className="text-gray-600">Experience: {worker.experience || 0} years</p>
        </div>
      </div>

      <SummarySection/>
      <Analytics/>
      <AppliedJobs/>
      {/* <CompletedJobs/> */}
      <Reviews/>

    </div>
  );
};

export default WorkerDashboard;