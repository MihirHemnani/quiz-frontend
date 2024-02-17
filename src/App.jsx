import Quiz from "./Quiz";
import { jsQuizz } from "./constants";
import Login from "./Login";
import { decrypt } from "./EncryptDecrypt";
import Key from "./Key";

function App() {
  var user = localStorage.getItem(Key) || null;
  if(user) {
    user = decrypt(user, 'mihirhemnanijitumal') || null
  }

  return user ? 
  <Quiz questions={jsQuizz.questions} /> 
  : 
  <Login />;
}

export default App;
