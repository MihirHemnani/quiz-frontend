import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
  // State to manage form input values

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    collegeName: '',
  });

  const [errmsg, setErr] = useState("")

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://quiz-backend-4o3h.onrender.com/api/user', 
    {
      username: formData.username,
      college: formData.collegeName
    }).then(res => {
      const msg = res.data.msg
      if(msg === "YES") {
        setErr("User Already Exists....")
      } else {       
        localStorage.setItem('quizUser', JSON.stringify(formData));
        window.location.reload()
      }
    }).catch((err) => {
      console.log(err)
    })

  };

  return (
    <div className="quiz-container">
      <>
        <span className="active-question-no">Enter Your Details</span>
        <p style={{color: "red"}}>{errmsg}</p>

        <form onSubmit={handleSubmit}>
          <div style={{ margin: "2vh 0vh" }}>
            <h2>Username</h2>
            <input
              style={{ width: "80%", padding: '0.5vh', margin: "0.5vh 0" }}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />

            <h2>Email</h2>
            <input
              style={{ width: "80%", padding: '0.5vh', margin: "0.5vh 0" }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <h2>College Name</h2>
            <input
              style={{ width: "80%", padding: '0.5vh', margin: "0.5vh 0" }}
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="footer">
            <button type="submit">Submit</button>
          </div>
        </form>
      </>
    </div>
  );
};

export default Login;
