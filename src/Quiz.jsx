import { useEffect, useState } from "react";
import axios from "axios";
import CurrentPosition from "./CurrentPosition";
import URL from "./URL";
import { decrypt, encrypt } from "./EncryptDecrypt";
import {KEY} from "./Key";

const Quiz = ({ questions }) => {

  const data = localStorage.getItem('iimbUnmaadquiz')
  const user = decrypt(data, 'mihirhemnanijitumal')


  const [currentQuestion, setCurrentQuestion] = useState(user.currentQuestion || 0);
  const [answer, setAnswer] = useState(null);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [leaderboard, setLeaderBoard] = useState(false);
  const [err, setErr] = useState("")

  const { question, type, photo, correctAnswer } = questions[currentQuestion];

  const handleTextFieldChange = (event) => {
    let cleanedStr = event.target.value.replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
    cleanedStr = cleanedStr.toLowerCase()
    
    if (cleanedStr === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
    setTextFieldValue(cleanedStr);
  };

  const onClickNext = () => {
    setTextFieldValue("");

    if (currentQuestion !== questions.length - 1) {
      if(answer) {
        setCurrentQuestion((prev) => prev + 1);
        var storedData = localStorage.getItem(KEY);
        const parsedData = decrypt(storedData, 'mihirhemnanijitumal')
        parsedData.currentQuestion = parsedData.currentQuestion + 1;
        const encrypt_text = encrypt(parsedData, 'mihirhemnanijitumal')
        localStorage.setItem(KEY, encrypt_text);
      }
    } else {
      setCurrentQuestion(0);
    }

    if(!answer){
      // alert("OOPs Incorrect Answer!!! Quiz Over!!!")
      setErr("Incorrect Answer")
      setTimeout(() => {
        setErr("")
      }, 3000)
      // setCurrentQuestion(0);
      // setShowResult(true);
    }
  };

  const showLeaderBoard =  () => {
    setLeaderBoard(!leaderboard);
  }

  useEffect(() => {
    axios.post( URL + 'api/updatescore', 
    {
      email: user.email,
      score: user.currentQuestion, 
    }).then().catch((err) => {
      console.log(err)
    })
  }, [currentQuestion])

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
          <span style={{color: "black"}} className="active-question-no">Scan this QR code
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
        <CurrentPosition />
      )}
      <div style={{textAlign: "center"}}><button onClick={() => showLeaderBoard()}>{!leaderboard ? "Current Rank" : "Go Back"}</button></div>
    </div>
  );
};

export default Quiz;
