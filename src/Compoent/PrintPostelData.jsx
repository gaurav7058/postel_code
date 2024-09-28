import React, { useEffect, useState } from 'react';
import { postel_API } from '../Constant';
import { useParams } from 'react-router-dom';

export default function PrintPostelData() {
  const [pincodeData, setPinCodeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for filtering input
  const { pincode } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(postel_API + pincode);
      const json = await response.json();
      setPinCodeData(json[0].PostOffice);
    };
    getData();
  }, [pincode]);

  // Filter the data based on the search term
  const filteredData = pincodeData.filter(item =>
    item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.BranchType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="">
        <h3>PinCode: {pincode}</h3>
        <p><strong>Message</strong>: Number of pincode(s) found: {filteredData.length}</p>
        {/* Filter input */}
        <input
          type="text"
          placeholder="Filter by name or branch type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input" // Add this class for styling
        />
      </div>
      <div className="grid-container">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div className="grid-item" key={item.Name}>
              <p><strong>Name:</strong> {item.Name}</p>
              <p><strong>Branch Type:</strong> {item.BranchType}</p>
              <p><strong>Delivery Status:</strong> {item.DeliveryStatus}</p>
              <p><strong>District:</strong> {item.District}</p>
              <p><strong>Division:</strong> {item.Division}</p>
            </div>
          ))
        ) : (
          <h2>Couldn’t find the postal data you’re looking for…</h2>
        )}
      </div>
    </>
  );
}
