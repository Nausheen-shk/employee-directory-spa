import React, { createContext, useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

const DataContext = createContext();

function Header() {
  return (
    <nav style={{ padding: "15px", background: "#0d6efd", display: "flex", gap: "20px" }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight:"bold" }}>Employee Directory</Link>
      <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
    </nav>
  );
}

function EmployeeList() {
  const { employees, loading } = useContext(DataContext);
  if (loading) return <h2 style={{padding:20}}>Loading Employees...</h2>;
  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List (from API)</h2>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"15px"}}>
        {employees.map(emp => (
          <div key={emp.id} style={{ border: "1px solid #ddd", borderRadius:"10px", padding: "15px" }}>
            <img src={emp.image} width="80" style={{borderRadius:"50%"}} alt="emp" />
            <h3>{emp.firstName} {emp.lastName}</h3>
            <p><b>Department:</b> {emp.company.department}</p>
            <p><b>Role:</b> {emp.company.title}</p>
            <Link to={`/employee/${emp.id}`}>View Profile</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmployeeDetails() {
  const { id } = useParams();
  const { employees } = useContext(DataContext);
  const emp = employees.find(e => e.id === parseInt(id));
  if (!emp) return <h2>Employee not found</h2>;
  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Back to List</Link>
      <div style={{marginTop:"20px", border:"1px solid #ddd", padding:"20px", borderRadius:"10px", maxWidth:"500px"}}>
        <img src={emp.image} width="120" style={{borderRadius:"50%"}} alt="emp" />
        <h1>{emp.firstName} {emp.lastName}</h1>
        <p><b>Email:</b> {emp.email}</p>
        <p><b>Age:</b> {emp.age}</p>
        <p><b>Department:</b> {emp.company.department}</p>
        <p><b>Designation:</b> {emp.company.title}</p>
        <p><b>City:</b> {emp.address.city}</p>
        <p><b>Phone:</b> {emp.phone}</p>
      </div>
    </div>
  );
}

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then(res => res.json())
      .then(data => {
        setEmployees(data.users.slice(0, 12));
        setLoading(false);
      });
  }, []);

  return (
    <DataContext.Provider value={{ employees, loading }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
         <Route path="/about" element={
  <div style={{padding:20, maxWidth:"600px"}}>
    <h1>About Me</h1>
    <p><b>Name:</b> Nausheen shaikh </p>
    <p><b>Role:</b> Frontend Developer </p>
    <p><b>Skills:</b> React.js, JavaScript, React Router, Context API, API Integration</p>
    <p><b>Project:</b> This is a Single Page Application (SPA) built for the interview task. It fetches employee data from a public API, shows routing without page reload, and uses Context API for state management.</p>
  </div>
} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;