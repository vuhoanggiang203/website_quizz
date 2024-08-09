import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import axios  from 'axios';
import Modal_quesion from './Modal_question';
const Manage_questions = () => {
      
    const navigate = useNavigate();
    const idQues = useRef() ;
    const [isShow,setIsShow] =useState(false) ;
    const [questionData, setQuestionData] = useState({
        "title": "",
        "answerA": "",
        "answerB": "",
        "answerC": "",
        "answerD": "",
        "answer": ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {setIsModalOpen(false);
      setQuestionData(null);
    }
    const [data,setData] = useState([]);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setQuestionData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      console.log(questionData)
    };
    const handleRead = (id) => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/get_one_question',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : {id}
      };
      axios.request(config)
        .then((response) => {
          console.log(config);
          setQuestionData(response.data[0]);
          setIsModalOpen(true);
        })
        .catch((error) => {
          console.error('Error fetching question data:', error);
        });
    };
    const handleUpdate = (id) => {
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/update_question/'+id,
        headers: { 
          'id' : id ,
          'Content-Type': 'application/json'
        },
        data : questionData
      };
      
      axios.request(config)
      .then((response) => {
        console.log(data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    }
      const handleDelete = (id) => {
        axios.delete('http://localhost:5000/delete_question/'+ id)
        .then((res)=>window.location.reload())
        .catch((err)=>console.log(err))
      };
      useEffect(() => {
      const get_question = async ()  => {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://localhost:5000/get_questions',
          headers: { 
            'Content-Type': 'application/json'
          },
        };
        
        await axios.request(config)
        .then((response) => {
          setData(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
      };  
      get_question(); 
      
    },[]);
    useEffect(()=>{
      const handleScroll =()=>{
        if(window.scrollY>=500){
          setIsShow(true)
        }
        else
        setIsShow(false)
      }
      window.addEventListener('scroll',handleScroll);
      return () => {
        window.removeEventListener('scroll',handleScroll);
      }
    },[])
    return (
        <div className="min-h-screen bg-gray-100">
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
    
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white p-8 rounded shadow-md">
              <h2 className="text-2xl font-bold mb-6">Questions Management</h2>
              <button 
                onClick={()=> navigate('/create_question')} 
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 hover:bg-blue-600"
              >
                Create question
              </button>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Title</th>
                    <th className="py-2 px-4 border-b">AnswerA</th>
                    <th className="py-2 px-4 border-b">AnswerB</th>
                    <th className="py-2 px-4 border-b">AnswerC</th>
                    <th className="py-2 px-4 border-b">AnswerD</th>
                    <th className="py-2 px-4 border-b">Answer</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {data.map((item) => (
                    <>
                    <tr key={item.id_user}>
                      <td className="py-2 px-4 border-b">{item.title}</td>
                      <td className="py-2 px-4 border-b">{item.answerA}</td>
                      <td className="py-2 px-4 border-b">{item.answerB}</td>
                      <td className="py-2 px-4 border-b">{item.answerC}</td>
                      <td className="py-2 px-4 border-b">{item.answerD}</td>
                      <td className="py-2 px-4 border-b">{item.answer}</td>
                      <td className="py-2 px-4 border-b">
                        <button 
                           onClick={() =>{ handleRead(item.id_question) ;
                            idQues.current = item.id_question ;
                            console.log(idQues.current);
                          }
                           }
                          className="bg-yellow-500 w-full text-white font-bold py-2 px-3 rounded mr-2 hover:bg-yellow-600"
                        >
                          Read
                        </button>
                        
                        <button 
                          onClick={() => handleDelete(item.id_question)} 
                          className="bg-red-500 w-full mt-1 text-white font-bold py-2 px-3 rounded hover:bg-red-600 "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {questionData &&(
                    <Modal_quesion isOpen={isModalOpen} onClose={closeModal} >
                    <h2 className="text-xl font-bold mb-4 ">Question</h2>
                       <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
                         onSubmit={
                          ()=>{handleUpdate(idQues.current);
                            console.log(idQues.current)

                          }
                         }
                        >
                        <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="title">
                        Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                           value={questionData.title}
                           onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2  " htmlFor="answerA">
                          AnswerA
                        </label>
                        <input
                          type="text"
                          name="answerA"
                          id="answerA"
                           value={questionData.answerA}
                           onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2  " htmlFor="answerB">
                          AnswerB
                        </label>
                        <input
                          type="text"
                          name="answerB"
                          id="answerB"
                           value={questionData.answerB}
                           onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="answerC">
                          AnswerC
                        </label>
                        <input
                          type="text"
                          name="answerC"
                          id="answerC"
                          value={questionData.answerC}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="answerD">
                          AnswerD
                        </label>
                        <input
                          type="text"
                          name="answerD"
                          id="answerD"
                          value={questionData.answerD}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 required:border-red-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="answer">
                          Answer
                        </label>
                        <input
                          type="text"
                          name="answer"
                          id="answer"
                           value={questionData.answer}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={closeModal}
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Update 
                        </button>
                      </div>
                    </form>  
                    
                 </Modal_quesion>
                 )}
                 </>
                  ))}
                </tbody>
              </table>
             {isShow && (<div  className="bottom-14 right-7 fixed border rounded text-white 
              py-2 px-2 hover:bg-emerald-700 bg-emerald-600">Go to top</div>)}
            </div>
          </div>
          
        </div>
      );
    }
export default Manage_questions