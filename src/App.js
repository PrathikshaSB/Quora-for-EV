import React, {useEffect} from 'react';
import './App.css';
import Quora from './component/Quora';
import { login, logout, selectUser } from './features/userSlice';
import Login from './component/auth/Login';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { auth } from "./firebase";

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          displayName: authUser.displayName,
          email: authUser.email
        }));
        console.log(authUser);
      } else {
        dispatch(logout())
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {
        user ? (<Quora />) : (<Login />)
        // <Quora />
      }
    
    </div>
  );
}

export default App;
