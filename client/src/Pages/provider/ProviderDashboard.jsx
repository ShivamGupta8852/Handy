import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobAnalytics from '../../component/provider/JobAnalytics.jsx';
import JobListing from '../../component/provider/JobListing.jsx';
import CompletedJobsHistory from '../../component/provider/CompletedJobsHistory.jsx';
import Summary from '../../component/provider/Summary.jsx';
import Payment from '../../component/provider/Payment.jsx';


const ProviderDashboard = () => {
  const [provider, setProvider] = useState({
    name : "Bittu Gupta"
  });

  // useEffect(() => {
  //   // Fetch provider data for dashboard
  //   const fetchProviderData = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:8002/api/provider/dashboard', { withCredentials: true });
  //       if (res.data.success) {
  //         setProvider(res.data.provider);
  //         setJobApplications(res.data.jobApplications);
  //         setActiveJobs(res.data.activeJobs);
  //         setCompletedJobs(res.data.completedJobs);
  //         setPayments(res.data.payments);
  //         setChatData(res.data.chatData);
  //       }
  //     } catch (error) {
  //       toast.error('Error fetching provider data', { theme: 'dark', position: 'top-center' });
  //     }
  //   };
  //   fetchProviderData();
  // }, []);

  if (!provider) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6 py-20">
      {/* <h1 className="text-2xl font-bold">{provider?.name}'s Dashboard</h1> */}
      <Summary/>
      <JobAnalytics />
      <JobListing/>
      {/* <CompletedJobsHistory/> */}
      <Payment/>

    </div>
  );
};

export default ProviderDashboard;
