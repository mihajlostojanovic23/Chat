import React, { useEffect, useState } from 'react'
import './Chat.css'
import { socket } from "socket.io-client";
import { TextField, Button, Switch } from '@mui/material';
import ScrollToBottom  from 'react-scroll-to-bottom'


function Chat({socket, username, room, fullname}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    

var vreme = new Date()
const sati = vreme.getHours()
const minuti = vreme.getMinutes()


const sendMessage = async (e) => {
    if (currentMessage !== "") {
        const messageData = {
            fullName: fullname,
            room: room,
            author: username,
            message: currentMessage,
            time: sati + ":" + minuti 
        }
    await socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
    setCurrentMessage("");
        }
    };

    useEffect( () => {
        socket.on('receive_message', (data) => {
            console.log(data)
            setMessageList((list) => [...list, data])
             setCurrentMessage("");
        })
    }, [socket])

  return (
    
    <div className='chat'>
        <div>Change color</div>
        <div className='chat_header'><a href='http://localhost:3000/'>Live Chat </a> <br/> Welcome to room <br/> <span className='room'> {room} </span> </div>
        
        <div className="chat-body">
        <ScrollToBottom>
        {messageList.map((messageContent) => {
            return <div> 
                <div id={fullname === messageContent.fullName? "you" : "other" }>
                    <div className='chat_mess'>
                        <p className='name'>{messageContent.author}</p>
                    <p className='mess'>{messageContent.message}</p>
                    <p className='time'>{messageContent.time}</p>
                    </div>
                    </div>
            </div> })}
            </ScrollToBottom>
        </div>
        <div className='chat_footer'>
            
        
           
        </div>
        <div className='controlls'>
        <TextField  className='room' inputProps={{ style: {color: 'white', fontSize: '20px',  }}}  
     id="textArea"
          placeholder='Text'
          variant="standard"
            color="warning"
            value={currentMessage}
            focused
          onChange={(e) => {setCurrentMessage(e.target.value)}}/>
            
        <Button id="send" variant="contained" onClick={sendMessage}> Send </Button>
        </div>
    </div>
  
  )
  
}


export default Chat