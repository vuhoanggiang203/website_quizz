import { useState,React } from "react";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
const Register =()=> {
  const navigate = useNavigate();
  const [showBtnSubmit,setShowBtnSubmit] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    passsword: '',
    fullname : '',
  });
  const checkValidBtn = () => {
    if(formData.username!==''||formData.passsword!==''||formData.fullname!==''){
      if(isShowErr)
        document.getElementById('register').removeAttribute('disabled');
    }
  }
  
  
  const [isShowErr,setIsShowErr] = useState(false);
  const CheckPassword =()=>{
        const checkPasswordValue = document.getElementById('re-password').value ;
        if(formData.passsword!==checkPasswordValue){
          setIsShowErr(true);
        }
        else {
          setIsShowErr(false);
        }
        // console.log(formData.username)
    }
    const [isShowToast,setIsShowToast] = useState(false);
  const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
  const handleSubmit = (e) => {
        e.preventDefault();
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:5000/create_new_account',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : formData
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setIsShowToast(true);
          setTimeout(()=>navigate('/'),2000);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    
  return (<>
          {isShowToast && (<div className=" flex fixed rounded-lg right-28 top-2 items-center justify-center  text-2xl font-bold py-2 px-4 bg-lime-600 text-white border-lime-600">Success</div>)}
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form
            className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl mb-6 text-center font-bold">Register</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="passsword"
                value={formData.passsword}
                onChange={handleChange}

                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="re-password">
                Re-Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="re-password"
                type="password"
                name="re-passsword"
                onBlur={()=>CheckPassword()}
               

                required
              />
              {isShowErr&& (<div className="text-sm font-semibold  text-red-500">Password don't match </div>)}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="re-password">
                Fullname
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                onBlur={()=>console.log(formData)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <a onClick={()=>navigate('/')} 
              className="text-lg font-bold text-blue-500 hover:text-blue-700 cursor-pointer px-3 py-1 shadow-md hover:shadow-xl rounded-sm">Login</a>
              <input 
              value="Register"
              
             
              id="register"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              />
              
            </div>
          </form>
        </div>
        </>
      );
    };

export default Register;