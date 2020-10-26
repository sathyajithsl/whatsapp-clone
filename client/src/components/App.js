import Login from "./Login";
import Dashboard from "./Dashboard"
import ChangeLocalStorage from './hooks/changeLocalStorage';
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ChatsProvider } from '../contexts/ChatsProvider'
import { SocketProvider } from "../contexts/SocketProvider";
function App() {
  const [id,setId] = ChangeLocalStorage('id');
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ChatsProvider id={id}>
          <Dashboard id={id} />
          </ChatsProvider>
      </ContactsProvider>
    </SocketProvider>
  )
  return (
      id ? dashboard : <Login onIdSubmit={setId} />
  )
}

export default App;
