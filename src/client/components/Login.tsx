import { json } from 'body-parser';
import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Login(): JSX.Element {
    // const [login, setLogin] = useState<string[]>([])

    const { setAuth } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

        // Allows us to navigate users programatically. Its a hook
        const navigate = useNavigate();
        // useLocation hook, we attach the state to the location in ProtectedRoutes
        const location = useLocation()

    function loginFunc(user: string, pass: string){
        console.log('test');
        if(user.length === 0 || pass.length === 0){
            alert('you must pass in a username and password');
        }
        // setUsername(user);
        // setPassword(pass);
        fetch('/api/loginAuthentication', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: username, passId: password})
        })
        .then(res=> res.json())
        .then(data=>{
            setAuth(user, password)
            setUsername('')
            setPassword('')
        })
        .catch(err=>console.log('error with login,', err));
    }

    return(
        <div>
            <form onSubmit={()=>loginFunc(username, password)}>
                <label htmlFor='username'>Input username here</label>
                <input className='username' id='username' type='text' name='username' onChange={(e)=>setUsername(e.target.value)}/>
                <label htmlFor='password'>Input password here</label>
                <input className='password' type="Password" id='password' name='password' onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Login;