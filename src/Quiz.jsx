import { useEffect, useState } from "react";
import axios from "axios";
import CurrentPosition from "./CurrentPosition";
import { decrypt, encrypt } from "./EncryptDecrypt";
import { Spinner } from "./Spinner";

const Quiz = ({ questions }) => {

  const data = localStorage.getItem(`${import.meta.env.VITE_KEY}`)
  const user = decrypt(data, `${import.meta.env.VITE_ENCRYPTION_KEY}`)


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [leaderboard, setLeaderBoard] = useState(false);
  const [err, setErr] = useState("")

  const { type, photo } = questions[currentQuestion];


  const handleTextFieldChange = (event) => {
    let cleanedStr = event.target.value.replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
    cleanedStr = cleanedStr.toLowerCase()
    setTextFieldValue(cleanedStr)
  };

  const onClickNext = () => {
    
    axios.post(`${import.meta.env.VITE_API}` + "api/answer",
    {
      questionId: currentQuestion,
      answer: textFieldValue,
      email: user.email
    }
    ).then(res => {
      if(res.data.msg) {
        if(questions.length !== currentQuestion) {
          setCurrentQuestion((prev) => prev + 1);
        }
        setTextFieldValue("")
      } else {
        setErr("Incorrect Answer")
        setTimeout(() => {
          setErr("")
        }, 3000)
      }
    }).catch((err) => {
      console.log("err")
    })
  };

  const showLeaderBoard =  () => {
    setLeaderBoard(!leaderboard);
  }

  // useEffect(() => {
  // }, [currentQuestion])

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API}` + 'api/getscore', 
    {
      email: user.email,
    }).then((res) => {
      setCurrentQuestion(res.data.score)
      console.log(res.data.score)
    }
    ).catch((err) => {
      console.log("err")
    })
  }, [])


  return (
    <div className="quiz-container">
      {!leaderboard ? (
        <>
        <div style={{textAlign: "center", marginTop: "1vh"}}>
          <span style={{color: "red"}} className="active-question-no">{err}
          </span>
        </div>


          {/* <div style={{textAlign: "center"}}><button onClick={() => showLeaderBoard()}>LeaderBoard</button></div> */}
          <div style={{textAlign: "center", marginTop: "1vh", marginBottom: "1vh"}}><span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span></div>
          {/* <h2>{question}</h2> */}
          {currentQuestion === questions.length - 1 &&  <div style={{textAlign: "center", marginTop: "1vh"}}>
          <span style={{color: "black"}} className="active-question-no">Scan QR Code and Fill the Form
          </span>
        </div>
        }
          {type === "PHOTO" 
          && 
          <div style={{scrollbarWidth: "none", textAlign: "center"}}>
            <img style={{ margin: "auto",maxWidth: "100%", maxHeight: "45vh"}} 
            src={'images/' + photo} 
            alt="photo" />
          </div> 
          }
          {/* <ul>
            {choices.map((choice, index) => (
              <li
                onClick={() => onAnwswerClick(choice, index)}
                key={choice}
                className={answerIdx === index ? "selected-answer" : null}
              >
                {choice}
              </li>
            ))}
          </ul> */}
          {currentQuestion !== questions.length - 1 && <input
            style={{width: "99%", padding: '0.5vh', margin: "2vh 0"}}
            type="text"
            value={textFieldValue}
            onChange={handleTextFieldChange}
          />}
          <div className="footer">

            {
              currentQuestion === questions.length - 1 ? 
              <></>
              :
              <button onClick={() => onClickNext()} disabled={textFieldValue === ""}>
              Next
            </button>
            }
            
          </div>
        </>
      ) : (
        <CurrentPosition props={questions.length}/>
      )}
      <div style={{textAlign: "center"}}><button onClick={() => showLeaderBoard()}>{!leaderboard ? "Current Rank" : "Go Back"}</button></div>
    </div>
  );
};

export default Quiz;
