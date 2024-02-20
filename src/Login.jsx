import React, { useState } from 'react';
import LeaderBoard from './LeaderBoard';
import { encrypt } from './EncryptDecrypt';
import axios from 'axios'
import Rules from './Rules';
import PlayRules from './PlayRules';

const Login = () => {
  // State to manage form input values
  const [leaderboard, setLeaderBoard] = useState(false);
  const [errmsg, setErr] = useState("")
  const [pop, setPop] = useState(false)
  const [play, setPlay] = useState(false)
  

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    collegeName: '',
    currentQuestion: 0
  });


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Popup = () => {
    return (
      <>
    <div className="quiz-container" style={{maxWidth:"50vh",maxHeight: "50vh", marginTop: "20vh", overflow: "auto", scrollbarWidth: "none"}}>

      <Rules />
      <div style={{textAlign: "center"}}><button onClick={() => handlePopup()}>Go Back</button></div>
    </div>
    </>
  )
  }

  const Play = () => {
    return (
      <>
    <div className="quiz-container" style={{maxWidth:"50vh",maxHeight: "50vh", marginTop: "20vh", overflow: "auto", scrollbarWidth: "none"}}>

      <PlayRules />
      <div style={{textAlign: "center"}}><button onClick={() => handlePlay()}>Go Back</button></div>
    </div>
    </>
  )
  }

  const handlePopup = () => {
    setPop(!pop)
  }

  const handlePlay = () => {
    setPlay(!play)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_API}` + "api/register",
    {
      username: formData.username,
      email: formData.email,
      college: formData.collegeName,
      score: 0
    }
    ).then(res => {
      // console.log(res)
      if(res.data.msg === "emailidused") {
        setErr("Email ID already used!!");
        setTimeout(() => {
          setErr("")
        }, 3000)
      }
      else {
        const encrypt_text = encrypt(formData, `${import.meta.env.VITE_ENCRYPTION_KEY}`)
        localStorage.setItem(`${import.meta.env.VITE_KEY}`, encrypt_text);
        window.location.reload()
      }
    }).catch((err) => {
      console.log("err")
    })
  };

  const showLeaderBoard =  () => {
    setLeaderBoard(!leaderboard)
  }

  return <>
    {pop && <Popup/> }
    {play && <Play />}

    {!play && !pop &&
    <div className="quiz-container" style={{width: "max-content", marginTop: "20vh", scrollbarWidth: "none"}}>
      {
      leaderboard ? 
      <>
        <LeaderBoard />
      </>  
      :
      (
        <>
        
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
            <div style={{display: "flex"}}>
              <div style={{marginRight: "1vh"}}>
                <input
                  style={{margin: "2vh 0"}}
                  type="checkbox"
                  name="collegeName"
                  value="Terms and Conditions"
                  required
                />
              </div>
              <div style={{margin: "2vh 0"}}>
                <a href='#' onClick={handlePopup}>
                  Terms and Conditions
                </a>
              </div>
              <div style={{ marginTop: "2vh", marginLeft: "6vh"}}>
                <a href='#' onClick={handlePlay}>
                  How to play
                </a>
              </div>
            </div>
            
          </div>

          <div className="footer">
            <button type="submit" style={{margin: "auto"}}>Submit</button>
          </div>
          
        </form>
        
        </>
        )
      }
      <div style={{textAlign: "center"}}><button onClick={() => showLeaderBoard()}>{!leaderboard ? "LeaderBoard" : "Go Back"}</button></div>
    </div>}
    </>
  ;
};

export default Login;
