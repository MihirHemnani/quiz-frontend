import React, { useState } from 'react';
import LeaderBoard from './LeaderBoard';
import { encrypt } from './EncryptDecrypt';

const Login = () => {
  // State to manage form input values
  const [leaderboard, setLeaderBoard] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    collegeName: '',
    currentQuestion: 0
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
    const encrypt_text = encrypt(formData, 'mihirhemnanijitumal')
    localStorage.setItem('iimbUnmaad', encrypt_text);
    window.location.reload()
  };

  const showLeaderBoard =  () => {
    setLeaderBoard(!leaderboard)
  }

  return (
    <div className="quiz-container" style={{width: "max-content", marginTop: "20vh"}}>
      {
      leaderboard ? 
      <>
        <LeaderBoard />
      </>  
      :
      (<>
        <span className="active-question-no" style={{margin: "auto"}}>Set Your Username</span>
        <p style={{color: "red"}}>{errmsg}</p>

        <form onSubmit={handleSubmit}>
          <div style={{ margin: "2vh 0vh" }}>
            <h2>Username</h2>
            <input
              style={{ width: "100%", padding: '0.5vh', margin: "0.5vh 0" }}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />

            <h2>Email</h2>
            <input
              style={{ width: "100%", padding: '0.5vh', margin: "0.5vh 0" }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required  
            />

            <h2>College/Organization</h2>
            <input
              style={{ width: "100%", padding: '0.5vh', margin: "0.5vh 0" }}
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="footer">
            <button type="submit" style={{margin: "auto"}}>Submit</button>
          </div>
          
        </form>
        
        </>
        )
      }
      <div style={{textAlign: "center"}}><button onClick={() => showLeaderBoard()}>{!leaderboard ? "LeaderBoard" : "Go Back"}</button></div>
    </div>
  );
};

export default Login;
