import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './components/Chat';
import { Button, MenuItem, Select, TextField } from '@mui/material'



const socket = io.connect("http://localhost:3001");




function App() {
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [validation, setValidation] = useState(false)

  var vreme = new Date()
  const milisek = vreme.getMilliseconds()


const Join = () => {
if (username !=="" && room !== "") {
socket.emit('join_room', room)
setValidation(true)
setFullname(username + milisek)
console.log(fullname)
}
}





  return (
    <div className="App">
      
      {!validation? (
        <div className='project'>
      <div className='login'>
     <h2>Join a chat</h2>
     <TextField  className='username' inputProps={{ style: {color: '#1976d2', fontSize: '25px', }}}  
     id="outlined-textarea"
          label="Username"
         
           onChange={(e) => 
        {setUsername(e.target.value )}} />
       <br></br> <br></br>


       <TextField  className='room' inputProps={{ style: {color: '#1976d2', fontSize: '25px',  }}}  
     id="outlined-textarea"
          label="Room"
          
          onChange={(e)=> {setRoom(e.target.value)}}
            />
       <br></br>

      <Button variant="outlined" id='butt' className='btn'  onClick={Join}> Join </Button> 
    </div> 
    </div>)
      : ( <Chat socket={socket} username={username} fullname = {fullname}  room={room}></Chat> )}
    </div>
   
  );
}

export default App;
