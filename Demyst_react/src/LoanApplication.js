import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function LoanApplication() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['loggedIn']); // Specify the cookie name
  const [reviewData, setReviewData] = useState(null); // State to hold review data
  const [businessData, setBusinessData] = useState({
    businessName: '',
    place: '',
    establishmentYear: '',
    loanAmount: '',
    sheet: [],
    preAssessment: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBusinessData({ ...businessData, [name]: value });
  };

  const fetchBalanceSheet = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/fetchBalanceSheet', businessData);
      if(response.status === 200) {
          setBusinessData({ ...businessData, sheet: response.data.sheet });
          setReviewData({ ...businessData });
        }
        else{
            alert(response.data.message);
        }
    } catch (error) {
      console.error(error);
    }
  };

  const processApplication = async () => {
    try {
        const response = await axios.post('http://localhost:8080/api/processApplication', businessData);
        if(response.status==200){
            setBusinessData({ ...businessData, preAssessment: response.data.preAssessment });
        }
        else{
            alert(response.data.message);
        }
    }
    catch (error) {
        console.error(error);
    }
  };
  const handleLogout = () => {
    // Clear the "loggedIn" cookie
    removeCookie('loggedIn', { path: '/' });
    // Redirect to the login page after logout
    navigate('/login');
  };


  useEffect(() => {
    // Check if the "loggedIn" cookie is not set or is not "true"
    if (!cookies.loggedIn || cookies.loggedIn !== 'true') {
      // Redirect to the login page
      console.log(cookies);
      navigate('/login');
    }
  }, [cookies, navigate]);

  return (
    <div>
      <h2>Loan Application</h2>
      <div>
        <label>Business Name:</label>
        <input
          type="text"
          name="businessName"
          value={businessData.businessName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Place:</label>
        <input
          type="text"
          name="place"
          value={businessData.place}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Establishment Year:</label>
        <input
          type="text"
          name="establishmentYear"
          value={businessData.establishmentYear}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Loan Amount:</label>
        <input
          type="number"
          name="loanAmount"
          value={businessData.loanAmount}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={fetchBalanceSheet}>Fetch Balance Sheet</button>
      <button onClick={processApplication}>Process Application</button>
      {reviewData && (
        <div>
          <h3>Review Your Application</h3>
          <p>Business Name: {reviewData.businessName}</p>
          {/* Add other review fields */}
          <p>Pre-assessment: {businessData.preAssessment}</p>
        </div>
      )}

    <button onClick={handleLogout}>Logout</button>

    </div>
  );
}

export default LoanApplication;
