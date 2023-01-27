import React, {useState, useEffect} from 'react';
import {QuizStructure} from '../models/quizmodel'

import { LoginCredentials } from '../models/LoginCredentials';

function Results(props: LoginCredentials): JSX.Element {
    const [ready, setReady] = useState(false);
    const [data, setData] = useState<QuizStructure[]>([]) 
    
    useEffect(()=>{
        if(ready===true){
            fetch(`/api/quizFetch${props.userId}`)
            .then(data=> data.json())
            .then((res:QuizStructure[])=>{
                setData([...res])
            })
            .catch(err => console.log('error with data collection,', err));
            // makeResults(data);
        }
        else{

        }
    })

    function deleteEntry(el: QuizStructure, id: number){
        fetch(`/api/quizDelete/${id}`,{
            method: 'DELETE',
            body: JSON.stringify(data)
        })
        .then((results)=>results.json())
        .catch(err=> console.log('deleteEntry error,', err));
    }

    
    function makeResults(info: QuizStructure[]){
        
         const results = info.map((el,i)=>{
            return(
                    <ul className="ResultEntries" id={`Result${i}`}>
                        <li id={`name${i}`}>
                            The name is {el.name}
                        </li>
                        <li id={`age${i}`}>
                            The age is {el.age}.
                        </li>
                        <li id={`hobbies${i}`}>
                            The hobbies {el.hobbies}
                        </li>
                        <li id={`Backend${i}`}>
                            The preferred backend is {el.Backend}
                        </li>
                        <li id={`preferredLanguage${i}`}>
                            The preferredLanguage is {el.preferredLanguage}
                        </li>
                        <li id={`API${i}`}>
                            The preferred API method is {el.API}
                        </li>
                        <li className={`OAuth${i}`}>
                            Good O'Auth methods to implement include {el.OAuth}
                        </li>
                        <button onClick={()=>deleteEntry(el, i)}>Delete</button>
                    </ul>
            )}
            )
            return results;
    }

    if(!ready){
        return(
            <div className="getData">
               <button onClick={()=>setReady(true)}></button>
            </div>
        )
    }
    else{
        return(
            <div className="QuizResults">
                {makeResults(data)}
            </div>
        )
    }

}

export default Results;