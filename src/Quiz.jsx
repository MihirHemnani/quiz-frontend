import { useState } from "react";
import { resultInitalState } from "./constants";
import {topper} from './result'
import axios from "axios";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [ toppers, setToppers ] = useState(topper)
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [leaderboard, setLeaderBoard] = useState(false);
  const user = JSON.parse(localStorage.getItem('quizUser'))

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

  const onAnwswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
    
    // console.log(answerIdx)
  };

  // const sendResult = () => {
  //   // const response = await fetch(`http://localhost:8000/api/leaderboard`, {
  //   //   method: "POST",
  //   //   body: JSON.stringify(result)
  //   // });

  //   // console.log(response)
  //   axios.post('http://localhost:8000/api/leaderboard', result)
  // }

  const onClickNext = () => {
    setAnswerIdx(null);
    setTextFieldValue("");
    setResult((prev) =>
      answer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    if(answer !== true){
      showLeaderBoard()
      setShowResult(true);
      alert("OOPs Incorrect Answer!!! Quiz Over!!!")
    }
  };

  const onExit = () => {
    setResult(resultInitalState);
    setShowResult(false);
    localStorage.removeItem('quizUser')
    window.location.reload()
  };

  const showLeaderBoard =  () => {
    setLeaderBoard(true)
    axios.post('https://quiz-backend-4o3h.onrender.com/api/leaderboard', 
    {
      score: result.score, 
      correctAnswers: result.correctAnswers, 
      username: user.username,
      college: user.collegeName
    }).then(res => {
        // console.log(res)
        setToppers(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          {type === "PHOTO" 
          && 
          <div>
            <img style={{maxWidth: "100%", maxHeight: "100%"}} 
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
          <input
            style={{width: "99%", padding: '0.5vh', margin: "2vh 0"}}
            type="text"
            value={textFieldValue}
            onChange={handleTextFieldChange}
          />
          <div className="footer">
            <button onClick={() => onClickNext()} disabled={textFieldValue === ""}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        leaderboard ? 
        <div className="result" style={{height: "70vh", overflowY:"scroll", scrollbarWidth: "none"}}>
          <h3>LeaderBoard</h3>


          <table style={{width: "100%",height: "20vh", border: "solid", overflow:"scroll"}}>
            <thead style={{borderBottom: "solid"}}>
              <tr>
                <th style={{borderBottom: "dashed"}}><h2>Username</h2></th>
                <th style={{borderBottom: "dashed"}}><h2>College</h2></th>
                <th style={{borderBottom: "dashed"}}><h2>Score</h2></th>
              </tr>
            </thead>

            <tbody>
            {
              toppers.map((res, index) => (
                <tr id={index} key={index}>
                  <td>{res.username}</td>
                  <td>{res.college}</td>
                  <td>{res.score}</td>
                </tr>
              ))
            
            }
            </tbody>
          </table>

          <button onClick={onExit}>Exit</button>
        </div>
        :
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Your Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <button onClick={() => showLeaderBoard()}>LeaderBoard</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
