import React, {useState, useEffect, useRef} from 'react'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AccountCreation, ResetPassword } from '../models/Accountobj';

import { LoginCredentials } from '../models/LoginCredentials';

const USER_REGEX = /^[a-azA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/ 

function Register(): JSX.Element{
    // const [username, setUsername] = useState<string>('');
    // const [password1, setpassword1] = useState<string>('');
    // const [password2, setpassword2] = useState<string>('');

    const userRef = React.useRef<HTMLInputElement>(null);
    const errRef = React.useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    //Do we have focus on that input field
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMachPwd] = useState('');
    const [validMatch, setValidMatch]= useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        //focus, when component loads. Focus is on username.
        userRef.current?.focus();
    }, []);

    //Applied to username, validate username.
    useEffect(()=>{
        const result= USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    //If either the pwd or matchPwd changes the values will be updated
    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(()=>{
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const [register, setRegister] = useState<boolean>(false)
    const [forgotPass, setForgotPass] = useState<boolean>(false)

    function check(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const user= (event.currentTarget.elements[0] as HTMLInputElement).value;
        const pass1 = (event.currentTarget.elements[1] as HTMLInputElement).value;
        const pass2 = (event.currentTarget.elements[2] as HTMLInputElement).value;
        
        if(pass1 !== pass2){
            alert('Passwords must match');
        }
        const obj = {
            username: user,
            password1 : pass1,
            password2: pass2,
        }
        fetch(forgotPass ? `/api/registeruser`: `/api/forgotpassword`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        //Should get a res.redirect if successful
        .then((response:Response) => response.json())
        .then((data : AccountCreation | ResetPassword)=>{
            
            if('success' in data){
                return alert('Reset successful! You should write your password down somewhere if you have any common sense.')
            }
            if(data.message === true){
                //make page alert you that your profile already exists
                return alert('A profile already exists for this user. You should reset your password if you forgot it.')

            }
            return
        })
        .catch(err=> console.log('Error with function check,', err));
    }
    if(forgotPass){
        return(
            <section className="Registration">
                <p ref={errRef} className={errMsg ? 'errrmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>
                <form className="Reset_Pass" onSubmit={check}>
                    <label htmlFor='username'>What is your username?</label>
                    <input type='text' name='username' id='username' required/>
                    <label htmlFor='password1'>Put in your password, must be between 8-16 characters.</label>
                    <input type='password' name='password1' id='password1' minLength={8} maxLength={16} required/>
                    <label htmlFor='password2'>Retype your password</label>
                    <input type='password' name='password2' id='password2' minLength={8} maxLength={16} required/>
                    <button type='submit'>Submit</button>
                </form>
            </section>            
        )
    }
    else return(
        <div className="Registration">
            <form className="Register_Form" onSubmit={check}>
                <input type='text' name='username' id='username' required/>
                <input type='password' name='password1' id='password1' minLength={8} maxLength={16} required/>
                <input type='password' name='password2' id='password2' minLength={8} maxLength={16} required/>
                <button type='submit'>Submit</button>
            </form>
            <button onClick={()=>setForgotPass(true)}>Forgot Password</button>
        </div>
    )
}

export default Register;