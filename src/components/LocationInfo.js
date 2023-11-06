import React from 'react';
import './LocationInfo.css';

const LocationInfo = ({ location }) => {
  const { country, 'country abbreviation': countryAbbreviation, places, 'post code': postalCode } = location;

  // Extract all states and place names from the places array
  const states = [...new Set(places.map(place => place['state']))];
  const placeNames = places.map(place => place['place name']);

  return (
    <div className="location"> 
      <div className="inner-container"> 
        <h2>Location Information</h2>
        <p>Country: &nbsp;<span>{country}</span></p>
        <p>Country Abbreviation: &nbsp;<span>{countryAbbreviation}</span></p>
        <p>Postal Code: &nbsp;<span>{postalCode}</span></p>
        <p>States: &nbsp;<span>{states.join(', ')}</span></p>
        <p>Place Names: &nbsp;<span>{placeNames.join(', ')}</span></p>
      </div>
    </div>
  );
}

export default LocationInfo;