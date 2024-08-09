import React, { useEffect } from 'react';
import Header from './Header.js'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios' ;
const Create_user = () =>   {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        passsword: '',
        fullname: '',
        role: ''
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
    const handleSubmit = (e) => {

        e.preventDefault();
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:5000/create_user',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : formData
        };

        
        Axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
        // console.log(formData);
      };

        const checkDuplicateUsername = () => {
          Axios.get('http://localhost:5000/api_user')
            .then((response) => 
             setData(response.data))
            .catch((error) => {
              console.log(error);
            })
            if( data.some(user => user.username === formData.username)) {
              document.getElementById('error_dupplicate_username').classList.remove('hidden');
            }
            else {
              document.getElementById('error_dupplicate_username').classList.add('hidden');
            }
          };
         
       
    return ( 
    <>
    <nav className="bg-white shadow mb-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center py-4">
                <div className="text-lg font-bold cursor-pointer" onClick={()=>navigate('/Admin_home')}>Admin Dashboard</div>
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
          <div className="container mx-auto mt-8">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={()=>checkDuplicateUsername()}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="passsword"
            id="password"
            value={formData.passsword}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            type="text"
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div id='error_dupplicate_username' className='text-red-600 m-3 font-semibold hidden'>Duplicate Username</div>
        
        <div className="flex items-center justify-between">
        <div className='bg-red-500 hover:bg-red-600 font-bold py-2 px-3 border border-red-500 text-white'>
          <a onClick={()=>navigate('/admin_home')}>Back</a>
        </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
       
    </>
    );
  }

export default Create_user ;