/* The API is fetching the data by https://api.zippopotam.us/${countryAbbreviation}/${postalCode} so that's why I have added 
the additional  field which is countryAbbreviation. For now I added few options. And there is no validation added for postal code because different countries have different postal code format.  */

import React, { useState } from 'react';
import styled from 'styled-components';
import './ZipCodeForm.css';
import LocationInfo from "./LocationInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const StyledSelect = styled.select`
appearance: none;
  cursor: pointer;
  border: 1px solid #50d1c0;
  border-radius:  100px;
  margin: 0 5px;
  padding: 12px 35px;
  outline: none;
  color: black;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
  box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.5);
  @media (max-width:767px) {
    font-size:14px;
    width: 160px;
    height: 37px;
    padding: 9px 10px;
  }
  @media (max-width:351px) {
 margin-bottom: 15px;
 font-size: 13px;
  }

  @media (max-width:826px) {
    margin-bottom: 15px;
  }
`;
// Create a styled option element
const StyledOption = styled.option
`
margin-top:5px !important;
background-color: white;
color: black;
font-size: 16px;
padding: 8px !important;
cursor: pointer;
text-align:center !important;
`;

library.add(faSpinner);

function ZipCodeForm() {
  const [postalCode, setPostalCode] = useState('');
  const [countryAbbreviation, setCountryAbbreviation] = useState(''); 
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const countries = [
    { abbreviation: 'US', name: 'United States' },
    { abbreviation: 'CA', name: 'Canada' },
    { abbreviation: 'AU', name: 'Australia' },
    { abbreviation: 'IN', name: 'India' },
    { abbreviation: 'AR', name: 'Argentina' },
    { abbreviation: 'BD', name: 'Bangladesh' },
    { abbreviation: 'BR', name: 'Brazil' },
    { abbreviation: 'CH', name: 'Switzerland' },
    { abbreviation: 'DE', name: 'Germany' },
    { abbreviation: 'ES', name: 'Spain' },
    { abbreviation: 'IT', name: 'Italy' },
    { abbreviation: 'JP', name: 'Japan' },
    { abbreviation: 'LK', name: 'Sri Lanka' },
   
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  /*  if (!validatePostalCode(postalCode)) {
      setError('Invalid postal code format');
      return;
    }*/
    setLoading(true);

    try {
      const response = await axios.get(`https://api.zippopotam.us/${countryAbbreviation}/${postalCode}`);
      if (response.status === 200) {
        const data = response.data;
        setLocation(data);
        setError(null);
        console.log('Response Data:', data);
      } else {
        setError('Postal code not found. Please check and try again.');
        setLocation(null);
      }
    } catch (err) {
      setError('An error occurred. Enter valid postal code.');
      setLocation(null);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPostalCode('');
    setCountryAbbreviation('');
    setLocation(null);
    setError(null);
  };

  /*const validatePostalCode = (code) => {
    // Regular expression to check for six-digit postal code
    const postalCodePattern = /^\d{6}$/;
    return postalCodePattern.test(code);
  };
*/
  return (
    <div>
      <form onSubmit={handleFormSubmit} className="form">
        <input
          type="text"
          className="input"
          placeholder="Enter Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <StyledSelect
          value={countryAbbreviation}
          onChange={(e) => setCountryAbbreviation(e.target.value)}
          required
        >
          <StyledOption value="" disabled>Select a Country</StyledOption>
          {countries.map((country) => (
            <StyledOption key={country.abbreviation} value={country.abbreviation}>
              {country.name}
            </StyledOption>
          ))}
        </StyledSelect>
        <button type="submit" className="btn">
          Get Location
        </button>
        <button type="button" className="btn" onClick={handleClear}>
          Clear
        </button>
      </form>
      {loading && (
        <p className="msg">
          <FontAwesomeIcon icon={['fas', 'spinner']} spin style={{ fontSize: "40px", marginBottom: "7px" }} />
          <br></br>Loading....
        </p>
      )}
      {error && <p className="msg">{error}</p>}
      {location && <LocationInfo location={location} />}
    </div>
  );
}

export default ZipCodeForm;

