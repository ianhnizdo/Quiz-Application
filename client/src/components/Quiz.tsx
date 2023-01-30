import React, {useEffect, useState} from 'react';
import {z} from 'zod'
import {QuizStructure} from '../models/quizmodel'

type QuizStructure = z.infer<typeof QuizStructure>

const Quiz: React.FC = () => {

    const [quizReady, setReady] = useState(false);
    const [results, setResults] = useState<Partial<QuizStructure>>({})

    useEffect(()=>{
        //try to reload the page after clicking the ready for quiz button
        console.log('Quiz state,', quizReady);
    })

    // const onChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    //     setResults([...results, event.target.value])
    // }


    function quizHandle(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        // const elements = event.currentTarget.elements[0];
        const formData = new FormData(event.currentTarget)
        const obj: {[key: string]: any} = {};
        for(let [key, value] of formData.entries()){
            obj[key] = value;
        }

        const constructionValidator = QuizStructure.safeParse(obj)
        if (constructionValidator.success === false){
            const message = constructionValidator.error;
            console.error(`Invalid form data: ${message}`)
            return undefined;
          } else {
            console.log(constructionValidator.data);
            setResults(obj);
          }

        fetch('/api/quizsubmission', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(results)
        })
        .then(response=> response.json())
        .then(data=>{
            console.log('Success:', data);
        })
        .catch(err=> console.log('Error with Quiz.tsx quizHandle,',err));
    }
    
    if(quizReady){
        return(
            <div className="QuizContainer">
                <form className="Quiz" id="form" onSubmit={quizHandle}>
                    <label htmlFor="name">What is your name?</label>
                    <input className="quizQuestion" type="text" id="name" name="name"/>
                    <label htmlFor="age">What is your age?</label>
                    <input className="quizQuestion" type="number" id="age" name="age"/>
                    {/* <label>Do you like cats?
                    <input className="quizQuestion" type="radio" id="cats" name="cats" value="Yes"/>Yes
                    <input className="quizQuestion" type="radio" id="cats" name="cats" value="No"/>No */}
                    {/* </label> */}
                    <label htmlFor="hobbies">Any hobbies you like?</label>
                    <input className="quizQuestion" type="text" id="hobbies" name="hobbies"/>
                    {/* <label htmlFor="StateManagement">Which would you rather choose?</label>
                    <input className="quizQuestion" type="radio" id="StateManagement" name="StateManagement" value="Redux"/>
                    <input className="quizQuestion" type="radio" id="StateManagement" name="StateManagement" value="Flux"/> */}
                    <label htmlFor="Backend">What do you prefer to use on the Backend?</label>
                    <input className="quizQuestion" id="Backend" name="Backend"/>
                    <label htmlFor="preferredLanguage">What is your preferred Programming Language</label>
                    <input className="quizQuestion" type="text" id="preferredLanguage" name="preferredLanguage"/>
                    <label htmlFor="API">What API method do you think is the best overall?</label>
                    <input className="quizQuestion" type="text" id="API" name="API"/>
                    <label htmlFor="OAuth">What are some O'Auth methods that programmers should utilize?</label>
                    <input className="quizQuestion" type="text" id="OAuth" name="OAuth"/>
                </form>
            </div>
        )
    }else{
        return(
            <div className="QuizReadyButton">
                <button type="submit" onClick={()=>setReady(true)}>Are you ready to take this Quiz/Survey? More of a survey honestly.</button>
            </div>
        )
    }
}

export default Quiz;