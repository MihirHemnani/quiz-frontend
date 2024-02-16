import Quiz from "./Quiz";
import { jsQuizz } from "./constants";
import Login from "./Login";
import { useEffect } from "react";
import { decrypt } from "./EncryptDecrypt";

function App() {
  var storedData = localStorage.getItem('quizUser');
  const user = decrypt(storedData, 'mihirhemnanijitumal')

  useEffect(() => {

  }, [localStorage.getItem("quizUser")])

  return user ? 
  <Quiz questions={jsQuizz.questions} /> 
  : 
  <Login />;
}

export default App;
