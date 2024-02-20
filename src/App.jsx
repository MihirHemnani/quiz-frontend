import Quiz from "./Quiz";
import { jsQuizz } from "./constants";
import Login from "./Login";

function App() {
  var user = localStorage.getItem(`${import.meta.env.KEY}`) || null;
  if(user) {
    user = decrypt(user, `${import.meta.env.ENCRYPTION_KEY}`) || null
  }

  return user ? 
  <Quiz questions={jsQuizz.questions} /> 
  : 
  <Login />;
}

export default App;
