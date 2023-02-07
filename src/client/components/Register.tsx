import React, {useState, useEffect, useRef} from 'react'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AccountCreation, ResetPassword } from '../models/Accountobj';

import { LoginCredentials } from '../models/LoginCredentials';

const USER_REGEX = /^[a-azA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/ 

function Register(): JSX.Element{
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

    // const [register, setRegister] = useState<boolean>(false)
    // const [forgotPass, setForgotPass] = useState<boolean>(false)

    function registerUser(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        
        // What is this, its additional validation. Currently the submit button is the only thing preventing or enforcing regex validation. That can be hacked by someone just grabbing it through the console.

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd)
        
        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }

        // const user= (event.currentTarget.elements[0] as HTMLInputElement).value;
        // const pass1 = (event.currentTarget.elements[1] as HTMLInputElement).value;
        // const pass2 = (event.currentTarget.elements[2] as HTMLInputElement).value;
        
        // if(pass1 !== pass2){
        //     alert('Passwords must match');
        // }
        // const obj = {
        //     username: user,
        //     password1 : pass1,
        //     password2: pass2,
        // }

        // fetch(`/api/registeruser`, {
        //     method: 'POST',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(obj)
        // })
        // //Should get a res.redirect if successful
        // .then((response:Response) => response.json())
        // .then((data : AccountCreation | ResetPassword)=>{
            
        //     if('success' in data){
        //         return alert('Reset successful! You should write your password down somewhere if you have any common sense.')
        //     }
        //     if(data.message === true){
        //         //make page alert you that your profile already exists
        //         return alert('A profile already exists for this user. You should reset your password if you forgot it.')

        //     }
        //     return
        // })
        // .catch(err=> console.log('Error with function check,', err));
    }
    return(
        <section className="Registration">
        <p ref={errRef} className={errMsg ? 'errrmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
        <h1>Register</h1>
        <form className="Register" onSubmit={registerUser}>

            <label htmlFor='username'>What is your username?
                <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                {/* We have !user since we don't want to show the 'X' until the user has enetered data */}
                <span className={validName || !user ? "hide" : "valid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>

            {/* aria-invalid, is our input valid or not. aria-described by, full description. Screenreader will read them.  */}
            <input type='text' name='username' id='username' ref={userRef} autoComplete="off" onChange={(e)=>setUser(e.target.value)} required aria-invalid={validName ? "false" : "true"} aria-describedby="uidnote" onFocus={()=>setUserFocus(true)} onBlur={()=>setUserFocus(false)}/>

            {/* uid note, what is this? Is our userFocus is true on the input, make sure that they have typed into user, and if the username isn't valid keep the instrucitons, otherwise hide them. This className is linked with the CSS to make it displayed  */}
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                4 to 24 characters <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens, allowed.
            </p>

            <label htmlFor='password1'>Put in your password, must be between 8-16 characters.
                <span className={validPwd ? "valid": "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>

                <span className={validPwd || !pwd ? "hide" : "valid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>

            {/* One easy way to force user passwords is to just put in minLength and maxLength parameters. There is no autocomplete here since type"password" doesn't support it anyway. There is no reference here either as we don't want to set the focus on this field when it loads.*/}
            <input type='password' name='password1' id='password1' onChange={(e)=>setPwd(e.target.value)}  required aria-invalid={validPwd ? "false" : "true"} aria-describedbhy="pwdnote" onFocus={()=> setPwdFocus(true)} onBlur={()=>setPwdFocus(false)}/>
            
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number and a special character. <br />
                    {/* Okay what the hack is all the spans. They are for the screen reader. The aria-label attribute allows us the screen reader to read each special character. */}
                    Allowed special characters: <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span><span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>
            
            <label htmlFor='password2'>Retype your password
                <span className={validMatch && matchPwd ? 'valid': 'hide'}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validMatch || !matchPwd ? 'hide' : 'valid'}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>
            <input type='password' name='password2' id='password2' onChange={(e)=>setMachPwd(e.target.value)} aria-invalid={validMatch ? 'false' : 'true'} aria-describedby={'confirmnote'} required onFocus={()=>setMatchFocus(true)} onBlur={()=>setMatchFocus(false)}/>
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
            </p>

            {/* Keep the button disabled until everything is validated */}
            <button disabled={!validName || !validPwd || !validMatch ? true : false}>Submit and get signed up!</button>
        </form>
        <p>
            Already registered?<br />
            <span className="line">
                {/* put router link here */}
                {/* <a href="#">Sign In</a> */}
            </span>
        </p>
    </section>            

        // <div className="Registration">
        //     <form className="Register_Form" onSubmit={check}>
        //         <input type='text' name='username' id='username' required/>
        //         <input type='password' name='password1' id='password1' minLength={8} maxLength={16} required/>
        //         <input type='password' name='password2' id='password2' minLength={8} maxLength={16} required/>
        //         <button type='submit'>Submit</button>
        //     </form>
        //     <button onClick={()=>setForgotPass(true)}>Forgot Password</button>
        // </div>
    )
}

export default Register;