import './main.css';
import Login from './Login';
import UserData from './UserData';
import { useState, useEffect, useRef } from 'react';


function Main() {
  const [loginOpen, setLoginOpen] = useState(true);
  const [dataOpen, setDataOpen] = useState(false);
  const [userData, setUserData] = useState({})
  const loginContainerRef = useRef(null);
  const userDataContainerRef = useRef(null);


  useEffect(() => {
    setDataOpen(!loginOpen)
  }, [loginOpen]);

  return (
    <div className="App">
      <Login open={loginOpen} setOpen={setLoginOpen} loginContainerRef={loginContainerRef} setUserData={setUserData} />
      <UserData open={dataOpen} userData={userData} dataContainerRef={userDataContainerRef} />
    </div>
  );
}

export default Main;
