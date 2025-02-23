import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratings, setRatings] = useState({});
  const [feedback, setFeedback] = useState({});
  const [isRatingOpen, setIsRatingOpen] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [statusFilter]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8002/api/provider/jobs", {
        params: { status: statusFilter },
        withCredentials: true,
      });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Error submitting rating:', error);
      if (error.response && error.response.data && error.response.data.success === false) {
        toast.warn(error.response.data.message, { theme: "light", autoClose: 1000, position: "top-center", });
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.", { theme: "dark", autoClose: 1000, position: "top-center", });
      }
    }
  };

  const handleRatingToggle = (jobId) => {
    setIsRatingOpen((prev) => ({
      ...prev,
      [jobId]: !prev[jobId], // Toggle the rating form visibility
    }));
  };

  const handleRatingChange = (jobId, value) => {
    setRatings({ ...ratings, [jobId]: value });
  };

  const handleFeedbackChange = (jobId, value) => {
    setFeedback({ ...feedback, [jobId]: value });
  };

  const submitRating = async (jobId) => {
    try {
      await axios.post('http://localhost:8002/api/provider/submit-rating', {
        jobId,
        rating: ratings[jobId],
        feedback: feedback[jobId],
      }, { withCredentials: true });
      toast.success('Rating submitted successfully');
    } catch (error) {
      console.error('Error submitting rating:', error);
      if (error.response && error.response.data && error.response.data.success === false) {
        toast.warn(error.response.data.message, { theme: "light", autoClose: 1000, position: "top-center", });
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.", { theme: "dark", autoClose: 1000, position: "top-center", });
      }
    }
  };

  const changeJobStatus = async (jobId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8002/api/provider/jobs/${jobId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchJobs();
    } catch (error) {
      console.error('Error submitting rating:', error);
      if (error.response && error.response.data && error.response.data.success === false) {
        toast.warn(error.response.data.message, { theme: "light", autoClose: 1000, position: "top-center", });
      } else {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.", { theme: "dark", autoClose: 1000, position: "top-center", });
      }
    }
  };

  const handleJobApplicants = (jobId) => {
    navigate(`/provider/jobs/${jobId}`);
  };

  const renderJobSection = (title, status) => {
    const filteredJobs = jobs.filter(job => job.status === status);
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 mt-6">{title}</h2>
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No jobs available in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <div key={job._id} className="p-4 bg-white rounded-md shadow-md space-y-4">
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
                <div className="text-gray-500">
                  <strong>Location:</strong> {job.location.city}, {job.location.state}
                </div>
                <div className="text-gray-500">
                  <strong>Compensation:</strong> {job.compensation}
                </div>
                <div className="text-gray-500">
                  <strong>Status:</strong> {job.status}
                </div>

                <div className="flex gap-2 mt-4">
                  {/* For Open Jobs */}
                  {status === "open" && (
                    <>
                      <button
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={() => handleJobApplicants(job._id)}
                      >
                        View Applicants
                      </button>
                      <button
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                        onClick={() => changeJobStatus(job._id, "cancelled")}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {/* For In Progress Jobs */}
                  {status === "in progress" && job.applicants.length > 0 && (
                    <>
                      <button
                        className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-md text-center"
                        onClick={() => changeJobStatus(job._id, "completed")}
                      >
                        Completed
                      </button>
                      <button
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md text-center"
                        onClick={() => changeJobStatus(job._id, "cancelled")}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {/* For Completed Jobs */}
                  {status === "completed" && (
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                      onClick={() => handleRatingToggle(job._id)}
                    >
                      Rate Worker
                    </button>
                  )}
                </div>


                {isRatingOpen[job._id] && (
                  <div className="mt-4 space-y-4">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={ratings[job._id] || ""}
                      onChange={(e) => handleRatingChange(job._id, e.target.value)}
                      className="border p-2 rounded w-full"
                      placeholder="Rate (1-5)"
                    />
                    <textarea
                      value={feedback[job._id] || ""}
                      onChange={(e) => handleFeedbackChange(job._id, e.target.value)}
                      className="border p-2 rounded w-full"
                      placeholder="Leave feedback"
                    />
                    <button
                      onClick={() => submitRating(job._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      Submit Rating
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-4">Explore Available Jobs</h1>

      {renderJobSection("Open Jobs", "open")}
      {renderJobSection("In Progress Jobs", "in progress")}
      {renderJobSection("Completed Jobs", "completed")}
      {renderJobSection("Cancelled Jobs", "cancelled")}
    </div>
  );
};

export default JobListing;
