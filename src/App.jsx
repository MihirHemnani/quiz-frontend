import Quiz from "./Quiz";
import { jsQuizz } from "./constants";
import Login from "./Login";
import { decrypt } from "./EncryptDecrypt";

function App() {
  var user = localStorage.getItem(`${import.meta.env.VITE_KEY}`) || null;
  if(user) {
    user = decrypt(user, `${import.meta.env.VITE_ENCRYPTION_KEY}`) || null
  }

  return user ? 
  <Quiz questions={jsQuizz.questions} /> 
  : 
  <Login />;
}

export default App;
