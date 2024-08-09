import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import axios from 'axios';
function LoginForm ()  {
    const navigate = useNavigate();
    const [username,setUsernamee] = useState('') ;
    const [password,setPassword] = useState('') ; 
    const { setUsername } = useUser();
    const get_api = (event) => {

      event.preventDefault();
      let data = JSON.stringify({
        "username": username,
        "passsword": password 
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:5000/api_account',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        const role  = response.data[0].role;
        setUsername(response.data[0].username);
        if (role === 1) {
          navigate('/start');
        } else if (role === 0) {
          navigate('/admin_home');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={get_api}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              onChange={e=>{setUsernamee(e.target.value);
                
              }}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
            required
              type="password"
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
          <a className="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800" href="#" onClick={()=>navigate('registe')}>
             Register
            </a>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             
            >
              Sign In
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;