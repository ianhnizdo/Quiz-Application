import React, {useState} from 'react'

import { AccountCreation, ResetPassword } from '../models/Accountobj';

import { LoginCredentials } from '../models/LoginCredentials';

function Register(props: LoginCredentials): JSX.Element{
    // const [username, setUsername] = useState<string>('');
    // const [password1, setpassword1] = useState<string>('');
    // const [password2, setpassword2] = useState<string>('');
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
            <div className="Registration">
                <form className="Reset_Pass" onSubmit={check}>
                    <label htmlFor='username'>What is your username?</label>
                    <input type='text' name='username' id='username' required/>
                    <label htmlFor='password1'>Put in your password, must be between 8-16 characters.</label>
                    <input type='password' name='password1' id='password1' minLength={8} maxLength={16} required/>
                    <label htmlFor='password2'>Retype your password</label>
                    <input type='password' name='password2' id='password2' minLength={8} maxLength={16} required/>
                    <button type='submit'>Submit</button>
                </form>
            </div>            
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