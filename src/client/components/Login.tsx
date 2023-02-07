import { json } from 'body-parser';
import React, {useRef, useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Login(): JSX.Element {
    // const [login, setLogin] = useState<string[]>([])
    const userRef = React.useRef<HTMLParagraphElement>(null);
    const errRef = React.useRef<HTMLParagraphElement>(null);

    // const { setAuth } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
    
    //The [] tells useEffect that we only clean up once. Our effect does not depend on any values from props or state so it never needs to re-run.
    useEffect(()=>{
        //Focus?
        userRef.current?.focus();
    }, [])

    useEffect(()=>{
        setErrMsg('');
    }, [username, password])

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
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={()=>loginFunc(username, password)}>
                <label htmlFor='username'>Input username here</label>
                <input className='username' id='username' type='text' name='username' onChange={(e)=>setUsername(e.target.value)}/>
                <label htmlFor='password'>Input password here</label>
                <input className='password' type="Password" id='password' name='password' onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit'>Submit</button>
            </form>
        </section>
    )
}

export default Login;