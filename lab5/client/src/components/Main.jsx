import './main.css';
import Login from './Login';
import UserData from './UserData';
import { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

function Main() {
  const [loginOpen, setLoginOpen] = useState(true);
  const [userData, setUserData] = useState({})
  const [cookies, setCookie] = useCookies();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginContainerRef = useRef(null);
  const userDataContainerRef = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005' + '/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session_id: cookies.sessionID }),
          credentials: 'include'
        });
        if (response.status === 200) {
          const data = await response.json();
          //setUserData
          setUserData(data.user_data)
        } else if (response.status === 401) {
          //delete cookie, reload page
          document.cookie = 'sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.location.reload(false);
        } else {
          console.log('Some other error');
        }
      } catch (error) {
        console.log('Error while getting user data', error);
      }
    }
    if (cookies.sessionID) {
      setIsAuthenticated(true);
      fetchData().catch(console.error)
    } else {
      setIsAuthenticated(false);
    }
  }, [cookies]);


  return (
    <div className="App">
      <Login open={!isAuthenticated} setOpen={setLoginOpen} loginContainerRef={loginContainerRef} setUserData={setUserData} />
      <UserData open={isAuthenticated} userData={userData} dataContainerRef={userDataContainerRef} />
    </div>
  );
}

export default Main;
