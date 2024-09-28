import React, { useState } from 'react';
import { postel_API } from '../Constant';
import { useNavigate } from 'react-router-dom';
import "../Styles/PostelPinCode.css";
import "../Styles/PrintPostelData.css";

export default function PostelPinCode() {
  const [pinCode, setPinCode] = useState("");
  const [error, setError] = useState("");
  const [pincodeData, setPinCodeData] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  async function Validation(e) {
    e.preventDefault();
    // Field validation
    if (pinCode === "") {
      setError("Please fill the field");
      return false;
    }

    if (pinCode.length !== 6) {
      setError("Please enter a 6-digit postal code");
      return false;
    }

    // If validation passes, clear the error
    setError("");

    // Set loading to true before fetching data
    setLoading(true);

    // Fetch postal data
    try {
      const response = await fetch(postel_API + pinCode);
      const json = await response.json();
      if (json[0].PostOffice && json[0].PostOffice.length > 0) {
        setPinCodeData(json[0].PostOffice);
        navigate(`/postel/${pinCode}`); // Navigate only if the postal code is valid
      } else {
        setError("Invalid postal code. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching postal data:", error);
      setError("Failed to fetch postal data. Please try again later.");
    } finally {
      // Set loading to false after the fetch operation
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={Validation}>
        <div className="form-section">
          <div className='form-input'>
            <label htmlFor="pincode">Enter pincode</label><br />
            <input
              type="text"
              value={pinCode}
              id='pincode'
              onChange={(e) => setPinCode(e.target.value)}
              placeholder='pincode'
            />
            <div className='input-error'>
              {error ? <p>{error}</p> : ""}
            </div>
          </div>
          <div className="btn">
            <button className='loookup' disabled={loading}>
              {loading ? "Loading..." : "LookUp"} {/* Change button text based on loading state */}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
