import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Function to calculate age based on birthdate
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Data array with calculated age
  const data = [
    {
      lastName: 'Smith',
      firstName: 'John',
      course: 'IT',
      birthdate: '1995-05-12',
      age: calculateAge('1995-05-12'),
    },
    {
      lastName: 'Doe',
      firstName: 'Jane',
      course: 'CS',
      birthdate: '1997-08-25',
      age: calculateAge('1997-08-25'),
    },
    {
      lastName: 'Garcia',
      firstName: 'Maria',
      course: 'IS',
      birthdate: '1994-11-03',
      age: calculateAge('1994-11-03'),
    },
    {
      lastName: 'Lee',
      firstName: 'Kim',
      course: 'DS',
      birthdate: '1999-04-15',
      age: calculateAge('1999-04-15'),
    }
  ];

  // Helper function to get the minimum birthdate from the data
  const getMinDate = () => {
    return data.reduce((min, person) => (new Date(person.birthdate) < new Date(min) ? person.birthdate : min), data[0].birthdate);
  };

  // Helper function to get the maximum birthdate from the data
  const getMaxDate = () => {
    return data.reduce((max, person) => (new Date(person.birthdate) > new Date(max) ? person.birthdate : max), data[0].birthdate);
  };

  // State to store filter text
  const [filterText, setFilterText] = useState("");
  // State to store min and max date filters
  const [minDate, setMinDate] = useState(getMinDate());
  const [maxDate, setMaxDate] = useState(getMaxDate());

  // Update the minDate and maxDate whenever data changes (optional)
  useEffect(() => {
    setMinDate(getMinDate());
    setMaxDate(getMaxDate());
  }, []);

  // Function to check if a birthdate is within the range of minDate and maxDate
  const isBirthdateInRange = (birthdate) => {
    if (!minDate && !maxDate) return true; // No filters applied
    const birthDate = new Date(birthdate);
    const min = minDate ? new Date(minDate) : null;
    const max = maxDate ? new Date(maxDate) : null;

    // Check if birthdate is between min and max dates
    return (!min || birthDate >= min) && (!max || birthDate <= max);
  };

  // Filter data based on filter text and date range
  const filteredData = data.filter(person => 
    (person.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
    person.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
    person.course.toLowerCase().includes(filterText.toLowerCase()) ||
    person.age.toString().includes(filterText)) &&
    isBirthdateInRange(person.birthdate)
  );

  return (
    <div className="App">
      <h1>DATA TABLE</h1>

      {/* Input filter for text (name, course, age) */}
      <input
        type="text"
        placeholder="Filter by Last Name, First Name, Course, or Age"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      {/* Min Date Filter */}
      <label>Min Date:</label>
      <input
        type="date"
        value={minDate}
        onChange={(e) => setMinDate(e.target.value)}
        min={getMinDate()} // Set the minimum selectable date
        max={getMaxDate()} // Set the maximum selectable date
      />

      {/* Max Date Filter */}
      <label>Max Date:</label>
      <input
        type="date"
        value={maxDate}
        onChange={(e) => setMaxDate(e.target.value)}
        min={getMinDate()} // Set the minimum selectable date
        max={getMaxDate()} // Set the maximum selectable date
      />

      {/* Table displaying filtered data */}
      <table>
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((person, index) => (
            <tr key={index}>
              <td>{person.lastName}</td>
              <td>{person.firstName}</td>
              <td>{person.course}</td>
              <td>{person.birthdate}</td>
              <td>{person.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
