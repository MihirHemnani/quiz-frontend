import Quiz from "./Quiz";
import { jsQuizz } from "./constants";
import Login from "./Login";
import { useEffect } from "react";

function App() {
  const user = JSON.parse(localStorage.getItem("quizUser")) || null

  useEffect(() => {

  }, [localStorage.getItem("quizUser")])

  return user ? 
  <Quiz questions={jsQuizz.questions} /> 
  : 
  <Login />;
}

export default App;
