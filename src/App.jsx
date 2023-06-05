import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './dashboard';
import jwt_decode from 'jwt-decode';

function App() {
  const [user, setUser] = useState("");
  const [login, setLogin] = useState(true);
  const [title, setTitle] = useState({ "tit1": "Better Data", "tit2": " Stockz" });

  let handleCallbackResponse = (response) => {
    console.log(response.credential)
    let userObject = jwt_decode(response.credential)
    setLogin(false)
    setUser(userObject)
    setTitle({ "tit1": "Hello ", "tit2": userObject.name });
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "283866295095-qbicr9bpdhqv2tlahd8cviip7mplniqd.apps.googleusercontent.com",
      callback: handleCallbackResponse
    },[])

    google.accounts.id.renderButton(document.getElementById("signInDiv"),
      {
        theme: 'outline',
        size: 'large'
      })

    google.accounts.id.prompt()

  }, [])

  const handleLogout = () => {
    setUser({});
    setLogin(true)
    setTitle({ "tit1": "Better Data", "tit2": " Stockz" });
  }

  return (
    <>
      <div className="bg-gradient-to-r from-slate-500 to-yellow-100 bg-cover w-screen h-screen">
        {login && (
        <div id="signInDiv" className="flex justify-end p-10">
        </div>
        )}

        {Object.keys(user).length !== 0 && (
          <>
          <button
          className="ml-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-300 w-60 h-16 text-center font-bold text-3xl hover:ring-2 ring-red-600 mt-10"
          onClick={handleLogout}>SignOut</button>
          </>
        )
        
        }

        <Dashboard title={title} />
      </div>
    </>
  );
}

export default App;
