import Header from './Header'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widget from './Widget'
import Login from './Login'
import './App.css';

import { useStateValue } from './StateProvider'

function App() {
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className="app">
      {!user 
        ? <Login />
        : <>
          <Header />

          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widget />
          </div>
        </>
      }

    </div>
  );
}

export default App;
