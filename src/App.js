import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
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

  const data = [
    {
      lastName: 'Manalo',
      firstName: 'Diane',
      course: 'IT',
      birthdate: '1995-05-12',
      age: calculateAge('1995-05-12'),
    },
    {
      lastName: 'Bolivar',
      firstName: 'Nestcel',
      course: 'CS',
      birthdate: '1997-08-25',
      age: calculateAge('1997-08-25'),
    },
    {
      lastName: 'Remoroza',
      firstName: 'Elena',
      course: 'IS',
      birthdate: '1994-11-03',
      age: calculateAge('1994-11-03'),
    },
    {
      lastName: 'Modequillo',
      firstName: 'Ken',
      course: 'DS',
      birthdate: '1999-04-15',
      age: calculateAge('1999-04-15'),
    }
  ];

  const getMinDate = () => {
    return data.reduce((min, person) => (new Date(person.birthdate) < new Date(min) ? person.birthdate : min), data[0].birthdate);
  };

  const getMaxDate = () => {
    return data.reduce((max, person) => (new Date(person.birthdate) > new Date(max) ? person.birthdate : max), data[0].birthdate);
  };

  const [filterText, setFilterText] = useState("");
  const [minDate, setMinDate] = useState(getMinDate());
  const [maxDate, setMaxDate] = useState(getMaxDate());

  useEffect(() => {
    setMinDate(getMinDate());
    setMaxDate(getMaxDate());
  }, []);

  const isBirthdateInRange = (birthdate) => {
    if (!minDate && !maxDate) return true; 
    const birthDate = new Date(birthdate);
    const min = minDate ? new Date(minDate) : null;
    const max = maxDate ? new Date(maxDate) : null;

    return (!min || birthDate >= min) && (!max || birthDate <= max);
  };

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

      {}
      <input
        type="text"
        placeholder="Filter by Last Name, First Name, Course, or Age"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      {}
      <label>Min Date:</label>
      <input
        type="date"
        value={minDate}
        onChange={(e) => setMinDate(e.target.value)}
        min={getMinDate()} 
        max={getMaxDate()} 
      />

      {}
      <label>Max Date:</label>
      <input
        type="date"
        value={maxDate}
        onChange={(e) => setMaxDate(e.target.value)}
        min={getMinDate()} 
        max={getMaxDate()} 
      />

      {}
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
