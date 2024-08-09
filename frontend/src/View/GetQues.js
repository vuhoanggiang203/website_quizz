import { useState,useEffect, useRef } from "react";
import axios from 'axios';
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import { useUser } from "./UserContext";
function GetQuestions() {
    const {username} =  useUser();
    let countcorrect =useRef(0);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    useEffect(() => {
        const fetchQuestions = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:5000/api_questions',
                headers: { }
            };
        
            try {
                const response = await axios(config);
                if (Array.isArray(response.data)) {
                    setQuestions(response.data);        
                }
            } catch (error) {
                    console.error(error);
            }
        };
        
        fetchQuestions(); 
       
    }, []);
    const handleAnswerChange = (questionId, answer,correct) => {
        setSelectedAnswer(prev => ({
            ...prev,
            [questionId]: answer
        }));
        if(answer===correct){
                countcorrect.current++
        }
        console.log(countcorrect.current);
    };
    // console.log(selectedAnswer);
    const handleChecked =(id,answer) => {
        return ((selectedAnswer[id] === answer) ? true : false ) ;
    };
    function getDate(date) {
        
        const year = date.getFullYear(); 
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2,'0'); 
        return `${year}-${month}-${day}`;
    }
    const currentDate = new Date();
    const formattedDate = getDate(currentDate);
    // console.log(typeof(formattedDate));
    let data = {
        "username" : username,
        "score" : countcorrect.current ,
        "dateOfTest" : formattedDate
    }
    const CheckResult =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/push_result",data)
        .then((res)=>{
            console.log(res.data) ;  
            navigate('/start');

        })
        .catch((err)=>console.log(err))  
    }
    return ( 
        <>
        <Header></Header>
        <h2>Heello {username}</h2>
        <form onSubmit={CheckResult}>
        <div id="wrapper-item" className='flex flex-col  mx-7 mt-10 p-6 border-yellow-400 border mb-8'> 
                {questions.map(question => (
                  <div key={question.id_question} className="flex flex-col my-3">
                        <h3><span>{question.id_question}. </span>{question.title}</h3>
                        <div className="flex flex-row ">
                        <input 
                        onChange={() => handleAnswerChange(question.id_question, question.answerA,question.answer)}
                         checked={handleChecked(question.id_question,question.answerA)}    
                                type="radio"
                        />
                        <label className="mx-2">{question.answerA}</label>
                        </div>
                        <div className="flex flex-row ">
                        <input 
                        onChange={() => handleAnswerChange(question.id_question, question.answerB,question.answer)}
                        checked={handleChecked(question.id_question,question.answerB)}    
                        type="radio"
                        />
                        <label className="mx-2">{question.answerB}</label>
                        </div>
                        <div className="flex flex-row ">
                        <input onChange={() => handleAnswerChange(question.id_question, question.answerC,question.answer)}
                        checked={handleChecked(question.id_question,question.answerC)}  
                        type="radio"
                        />
                        <label className="mx-2">{question.answerC}</label>
                        </div>
                        <div className="flex flex-row ">
                        <input onChange={() => handleAnswerChange(question.id_question, question.answerD,question.answer)}
                        checked={handleChecked(question.id_question,question.answerD)}    
                        type="radio"
                        />
                        <label className="mx-2">{question.answerD}</label>
                        </div>
                        <h3 className="text-sm hidden">{question.answer}</h3>
                  </div>
                  
                ))}
            <input type="Submit" className="text-slate-500 py-2  bg-violet-100 font-semibold
                         w-1/4    hover:bg-violet-200 rounded-full border-0  my-0 mx-auto px-15"  value="Submit" />
        </div> 
        </form> 
        </>    
    );
}

export default GetQuestions;