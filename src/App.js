import logo from './logo.svg';
import './App.css';
import {ChatEngine} from 'react-chat-engine'
import LoginForm from './components/LoginForm'


function App() {
  if (!localStorage.getItem("username")) return <LoginForm />
  return (
    <ChatEngine 
      height="100vh"
      projectID="6658e403-cec0-4585-ada3-a9aae5d67aa6"
      userName={localStorage.getItem("username")}
      userSecret={localStorage.getItem("password")}
    />
  );
}

export default App;
