import React,{ useContext, useState, useEffect, useCallback  } from 'react'
import ChangeLocalStorage from '../components/hooks/changeLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';
const ChatsContext = React.createContext();

export function useChats() {
    return useContext(ChatsContext)
}
 
export function ChatsProvider({ id, children }) {
    const [chats, setChats] = ChangeLocalStorage('chats', []);
    const [selectedChatIndex, setSelectedChatIndex] = useState(0);
    const { contacts } = useContacts()
    const socket = useSocket()

    function createChats(recipients) {
            setChats(prevChats => {
                return [...prevChats, { recipients, messages: [] }]
            })
    }
    //const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
    const addMessageToChat = useCallback(({recipients, text, sender}) => {
        setChats(prevChats => {
            let madeChange = false;
            const newMessage = { sender, text }
            const newChat = prevChats.map(chat => {
                if(arraysAreEqual(chat.recipients,recipients)) {
                    madeChange = true;
                    return {
                        ...chat,
                        messages:[...chat.messages,newMessage]
                    }
                }
                return chat;
            })
            if(madeChange){
                return newChat;
            } else {
                return [...prevChats, { recipients, messages:[newMessage]}]
            }
        })
    },[setChats])

    
    useEffect(() => {
        if (socket == null) return
    
        socket.on('receive-message', addMessageToChat)
    
        return () => socket.off('receive-message')
      }, [socket, addMessageToChat])

    function sendMessage(recipients, text){
        socket.emit('send-message',{recipients, text});
        addMessageToChat({recipients, text, sender:id})

    }

    const formattedChats = chats.map((chat, index) => {
        const recipients = chat.recipients.map(recipient => {
          const contact = contacts.find(contact => {
            return contact.id === recipient
          })
          const name = (contact && contact.name) || recipient
          return { id: recipient, name }
        })

        const messages = chat.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender
              })
              const name = (contact && contact.name) || message.sender
              const fromMe = id === message.sender
              return {...message, senderName: name, fromMe}
        })

        const selected = index === selectedChatIndex
        console.log("selected:",selected);
        return { ...chats, messages, recipients, selected }
    })

    const value = {
        chats:formattedChats,
        selectedChat:formattedChats[selectedChatIndex],
        sendMessage,
        selectChatIndex: setSelectedChatIndex,
        createChats
    }
    return (
        <ChatsContext.Provider value = {value}>
            {children}
        </ChatsContext.Provider>
    )
}

var arraysAreEqual = (array1, array2) => {
    if (array1.length !== array2.length) return false

    array1.sort()
    array2.sort()
  
    return array1.every((element, index) => {
      return element === array2[index]
    })
}