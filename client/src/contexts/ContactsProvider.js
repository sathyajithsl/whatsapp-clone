import React,{ useContext } from 'react'
import ChangeLocalStorage from '../components/hooks/changeLocalStorage';
const ContactsContext = React.createContext();

export function useContacts() {
    return useContext(ContactsContext)
}
 
export function ContactsProvider({ children }) {
    const [contacts, setContacts] = ChangeLocalStorage('contacts', []);
    function createContact(id, name) {
            setContacts(prevContacts => {
                return [...prevContacts, { id, name }]
            })
    }
    return (
        <ContactsContext.Provider value = {{ contacts, createContact}}>
            {children}
        </ContactsContext.Provider>
    )
}
