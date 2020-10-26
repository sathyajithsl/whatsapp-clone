import React, {useState} from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Chats from './Chats';
import Contacts from './Contacts';
import NewChats from './NewChats';
import NewContact from './NewContact';
const chat_key = "chats";
const contact_key = "contacts"
export default function Sidenav({ id }) {
    const [activeKey,setActiveKey] = useState(chat_key);
    const [modalOpen,setModalOpen] = useState(false);
    const chatTabOpen = activeKey === chat_key;
    var closeModal = () =>{ setModalOpen(false); }
    return (
        <div style={{width:'250px'}} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
            <Nav variant="pills" className="justify-content-center">
                <Nav.Item>
                    <Nav.Link eventKey={chat_key}>{chat_key}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={contact_key}>{contact_key}</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content className="border-right overflow-auto flex-grow-1">
                <Tab.Pane eventKey={chat_key}>
                    <Chats />
                </Tab.Pane>
                <Tab.Pane eventKey={contact_key}>
                    <Contacts />
                </Tab.Pane>
            </Tab.Content>
            <div className="p2 border small">
                    Your Id:
                    <span>{id}</span>
            </div>
            <Button onClick={ () => setModalOpen(true) } className="rounded-0">
                New { chatTabOpen ? chat_key : contact_key }
            </Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal}>
                {chatTabOpen ? <NewChats closeModal={closeModal} />: <NewContact closeModal={closeModal} />}
            </Modal>
        </div>
    )
}
