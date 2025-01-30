  import './App.css';
  import { useState,useEffect } from 'react';
  import {useDispatch} from 'react-redux';
  import { login,logout } from './redux/authSlice/authSlice';
import authService from './appwrite/auth';

  function App() {
    const [isLoading,setIsLoading]=useState(true);

    const dispatch=useDispatch();

    useEffect(()=>{
      authService.getCurrentUser().then((userData)=>{
        if(userData){
          dispatch(()=>login(userData))
        }else{
          dispatch(()=>logout())
        }
      })
      .finally(()=> setIsLoading(false));
    },[])

return isLoading ?  (
  <div>is Loading ... </div>     
) : ( <div>Testing</div>)
  }

  export default App
