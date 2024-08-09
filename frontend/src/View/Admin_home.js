import { useEffect, useState,useRef } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios  from 'axios';
import Modal_Detail_User from './Modal_Detail_User';
const AdminHome = () => {
  
    const navigate = useNavigate();
    const idUser = useRef();
    const [userData, setUserData] = useState({
      id_user : '' ,
      username: '',
      passsword: '',
      fullname: '',
      role: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {setIsModalOpen(false);
      setUserData(null);
    }
    const [data,setData] = useState([]);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    const handleRead = (id) => {
      axios.post('http://localhost:5000/get_one_user',{id_user: id})
      .then((response) => {
        setUserData(response.data[0]);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
    };
    const handleUpdate = (id) => {
      axios.put('http://localhost:5000/update_user/'+id,userData)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
      
    }
    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/delete_user/'+ id)
        .then((res)=>window.location.reload())
        .catch((err)=>console.log(err))
    };
    useEffect(() => {
        axios.get('http://localhost:5000/api_user')
        .then((response) => {
          setData(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    },[]);
    console.log('re-render');
    
    // console.log(userData);
    
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
              <h2 className="text-2xl font-bold mb-6">Account Management</h2>
              <button 
                onClick={()=> navigate('/create_user')} 
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 hover:bg-blue-600"
              >
                Create
              </button>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Username</th>
                    <th className="py-2 px-4 border-b">Password</th>
                    <th className="py-2 px-4 border-b">Full Name</th>
                    <th className="py-2 px-4 border-b">Role</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {data.map((item) => (
                    <>
                    <tr key={item.id_user}>
                      <td className="py-2 px-4 border-b">{item.username}</td>
                      <td className="py-2 px-4 border-b">{item.passsword}</td>
                      <td className="py-2 px-4 border-b">{item.fullname}</td>
                      <td className="py-2 px-4 border-b">{item.role}</td>
                      <td className="py-2 px-4 border-b">
                        <button 
                        
                           onClick={
                              () => { 
                                idUser.current = item.id_user ;
                                handleRead(item.id_user)
                                 console.log(item.id_user)
                                 console.log(idUser.current)
                                //  handleChange();
                                //  setUserData({"id_user":item.id_user})
                                    }
                           }
                          className="bg-yellow-500 text-white font-bold py-2 px-3 rounded mr-2 hover:bg-yellow-600"
                        >
                          Read
                        </button>
                        
                        <button 
                          onClick={() => handleDelete(item.id_user)} 
                          className="bg-red-500 text-white font-bold py-2 px-3 rounded hover:bg-red-600 "
                        >
                          Delete
                        </button>
                        
                        
                      </td>
                    </tr>
                    {userData &&(
                    <Modal_Detail_User isOpen={isModalOpen} onClose={closeModal} >
                    <h2 className="text-xl font-bold mb-4">Information User</h2>
                       <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
                         onSubmit={
                          ()=>{
                             handleUpdate(idUser.current)
                              // console.log(.id_user)
                          }

                         }
                        >
                      <div className="mb-4 flex flex-col items-start ">
                        <label className="block text-gray-700 text-sm font-bold mb-2  disabled:opacity-75" htmlFor="username">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                           value={userData.username}
                           onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 required:border-red-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          name="passsword"
                          id="password"
                          value={userData.passsword}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 required:border-red-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="fullname">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullname"
                          id="fullname"
                          value={userData.fullname}
                          onChange={handleChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 required:border-red-500 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4 flex flex-col items-start">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="role">
                          Role
                        </label>
                        <input
                          type="text"
                          name="role"
                          id="role"
                           value={userData.role}
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
                    
                 </Modal_Detail_User>
                 )}
                 </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };


export default AdminHome;
