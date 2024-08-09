import { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios' ;
const Create_question= () =>{
          
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
        answer: ''
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    const [questionData,setQuestionData] = useState({});
    const handleSubmit = () => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/create_question',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : formData
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    }
    return ( 
        <>
        <nav className="bg-white shadow mb-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center py-4">
                <div className="text-lg font-bold">Admin Dashboard</div>
                <div className='flex justify-between'>
                  <button 
                    onClick={() => navigate('/Admin_home')} 
                    className="mr-4 text-blue-500 border rounded-md border-b-slate-950 py-2 px-4 hover:bg-purple-100 "
                  >
                     Accounts
                  </button>
                  <button 
                    onClick={() => navigate('/manage_questions')} 
                    className="text-blue-500 border mr-4 rounded-md border-b-slate-950 py-2 px-4 hover:bg-purple-100 "
                  >
                     Questions
                  </button>
                  <button 
                    onClick={() => navigate('/')} 
                    className="text-blue-500 border rounded-md border-b-slate-950 py-2 px-4 hover:bg-purple-100 "
                  >
                     Log Out
                  </button>

                </div>
              </div>
            </div>
          </nav>
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                         onSubmit={()=>handleSubmit()}
                        >
                        <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="username">
                        Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                           value={formData.title}
                           onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2  " htmlFor="username">
                          AnswerA
                        </label>
                        <input
                          type="text"
                          name="answerA"
                          id="answerA"
                           value={formData.answerA}
                           onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2  " htmlFor="username">
                          AnswerB
                        </label>
                        <input
                          type="text"
                          name="answerB"
                          id="answerB"
                           value={formData.answerB}
                           onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="password">
                          AnswerC
                        </label>
                        <input
                          type="text"
                          name="answerC"
                          id="answerC"
                          value={formData.answerC}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="fullname">
                          AnswerD
                        </label>
                        <input
                          type="text"
                          name="answerD"
                          id="answerD"
                          value={formData.answerD}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 required:border-red-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="role">
                          Answer
                        </label>
                        <input
                          type="text"
                          name="answer"
                          id="answer"
                           value={formData.answer}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={()=>navigate('/manage_questions')}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Create question 
                        </button>
                      </div>
                    </form>  

    
    </>
     );
}

export default Create_question;