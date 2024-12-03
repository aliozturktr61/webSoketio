import { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import Room from './components/Room';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:4000");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [chatScreen, setChatScreen] = useState(false);

  return (
    <div className="App">
      {
        !chatScreen ?
        <Room 
          userName={userName} 
          room={room} 
          setUserName={setUserName} 
          setRoom={setRoom} 
          setChatScreen={setChatScreen} 
          socket={socket}
        />
        : 
        <Chat 
          socket={socket} 
          username={userName} // userName'i doğrudan geçiyoruz
          room={room} // room'u doğrudan geçiyoruz
        />
      }
    </div>
  );
}

export default App;