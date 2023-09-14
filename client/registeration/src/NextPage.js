import React from 'react';

const NextPage = ({ location }) => {
  const { formData } = location.state; // Get the form data from the location prop

  return (
    <div>
      <h1>User Information</h1>
      <p>First Name: {formData.firstName}</p>
      <p>Last Name: {formData.lastName}</p>
      <p>Email: {formData.email}</p>
      <p>Country: {formData.country}</p>
      <p>State: {formData.state}</p>
      <p>City: {formData.city}</p>
      <p>Gender: {formData.gender}</p>
      <p>Date of Birth: {formData.dateOfBirth}</p>
      <p>Age: {formData.age}</p>
      {/* Replace the placeholders below with other form fields */}
      {/* <p>Field Name 1: {formData.fieldName1}</p> */}
      {/* <p>Field Name 2: {formData.fieldName2}</p> */}
    </div>
  );
};

export default NextPage;
