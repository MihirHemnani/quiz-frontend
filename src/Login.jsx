import React, { useState } from 'react';
import LeaderBoard from './LeaderBoard';
import { encrypt } from './EncryptDecrypt';
import axios from 'axios'
import { KEY } from './Key';

const Login = () => {
  // State to manage form input values
  const [leaderboard, setLeaderBoard] = useState(false);
  const [errmsg, setErr] = useState("")
  const [pop, setPop] = useState(false)
  

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
    <div className="quiz-container" style={{maxWidth:"50vh",maxHeight: "50vh", marginTop: "20vh", overflow: "auto", scrollbarWidth: "none"}}>

      <h2 style={{textAlign: "center"}}>Terms & Conditions</h2>

      <p class=" fs-3">1.	The Unmaad Virtual Expedition is open to participants of all ages.
      </p>

      <p class=" fs-3">
          2.	Participants must provide accurate and complete information during
registration.
      </p>

      <p class=" fs-3">
          3.	The link will be provided closer to the launch of the event.
      </p>

      <p class=" fs-3">
          4.	Each participant can register only once.
      </p>

      <p class=" fs-3">
          5.	The event will be hosted exclusively on unmaad.com
      </p>

      <p class=" fs-3">
          6.	Ǫuestions will be presented in image format, and participants are required to
enter their answers in the provided text field in small case without space and
special characters (Numbers are allowed).

      </p>

      <p class=" fs-3">
          7.	Participants are responsible for submitting their answers within the specified
time frame.

      </p>

      <p class=" fs-3">
          8.	Correct answers will be awarded points based on the scoring system outlined
on unmaad.com
      </p>

      <p class=" fs-3">
          9.	The first player to complete the 60 questions with correct answers will be
declared the winner
      </p>

      <p class=" fs-3">
          10.	For eg if the image is Nike logo <br/>
          &nbsp; &nbsp; &nbsp;a. Answer could be justdoit.
      </p>

      <p class=" fs-3">
          11.	The organizer's decision on scoring and winners is final and binding.
      </p>

      <p class=" fs-3">
          12.	Prizes will be awarded to the participants with the highest scores.
      </p>

      <p class=" fs-3">
          13.	Prize distribution details will be communicated on the event website and email.
      </p>

      <p class=" fs-3">
          14.	Unmaad is not responsible for any technical issues, including but not limited to
internet connectivity problems, server downtimes, or platform malfunctions.

      </p>

      <p class=" fs-3">
          15.	Unmaad reserves the right to modify event rules, format, or any other aspect of the Virtual Expedition at its discretion.
      </p>

      <p class=" fs-3">
          16.	Unmaad reserves the right to disqualify any participant who violates the terms and conditions or engages in any form of misconduct.
      </p>

      <p class=" fs-3">
          17.	Unmaad is not liable for any loss, injury, or damages incurred by participants during or as a result of the Virtual Expedition.
      </p>

      <p class=" fs-3">
          18.	By participating in the Unmaad Virtual Expedition, participants acknowledge and agree to abide by these terms and conditions.
      </p>
      
      <div style={{textAlign: "center"}}><button onClick={() => handlePopup()}>Go Back</button></div>
    </div>
  )
  }

  const handlePopup = () => {
    setPop(!pop)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(URL + 'api/register',
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
        const encrypt_text = encrypt(formData, 'mihirhemnanijitumal')
        localStorage.setItem(KEY, encrypt_text);
        window.location.reload()
      }
    }).catch((err) => {
      console.log(err)
    })
  };

  const showLeaderBoard =  () => {
    setLeaderBoard(!leaderboard)
  }

  return (
    pop 
    ?
    <Popup/> 
    :
    <div className="quiz-container" style={{width: "max-content", marginTop: "20vh"}}>
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
    </div>
  );
};

export default Login;
