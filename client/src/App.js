import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from "react"
const socket = io.connect("http://localhost:3001")

function App() {
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])


  return (
    <div className="App">

      <h1>Chat</h1>

      <button className='close'><span>&#9747;</span></button>


      <div class="dropdown">
        <button class="dropbtn">Rooms</button>
        <div class="dropdown-content">
          <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}> Join Room</button>

        </div>
        <hr></hr>
      </div>
      <div>
        <h3> Message:</h3>
        {messageReceived}
      </div>
      <hr></hr>

      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
    </div>
  );
}

export default App;
