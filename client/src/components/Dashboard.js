import React from 'react'
import OpenChat from './OpenChat'
import Sidenav from './Sidenav'
import { useChats } from '../contexts/ChatsProvider'
export default function Dashboard({ id }) {
    const { selectedChat } = useChats();
    return (
        <div className="d-flex" style={{ height:'100vh' }}>
            <Sidenav id={id} />
            {selectedChat && <OpenChat/>}
        </div>
    )
}
