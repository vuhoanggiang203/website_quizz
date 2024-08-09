import { useEffect, useState } from "react";
import Header from "./Header";
import { useUser } from "./UserContext";
import axios from "axios";
const Result = () =>{
    const { username } = useUser();
    const [fullname,setFullname] = useState('');
    const [data,setData] = useState([]);
    useEffect(()=>{
            axios.post('http://localhost:5000/get_info_user',{ username })
            .then((res)=>{
                setData(res.data);
                // console.log(typeof(res.data));  
               setFullname(res.data[0].fullname);
            })
            .catch(err=>console.log("No record"))
    },[username])
    // console.log(data);  
    return (
        <>
            <Header></Header>
            <div className="mt-4 pl-3 mx-5 font-bold  text-lg flex flex-row items-center ">
                <p>Full name : </p> <p className="ml-4">{fullname}</p>
            </div>
            <div className="mt-4 mx-5 shadow-md">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th class="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left leading-4 text-blue-500 tracking-wider">CountTest</th>
                            <th class="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left leading-4 text-blue-500 tracking-wider">ScoreTest</th>
                            <th class="px-6 py-3 border-b-2 border-gray-300 bg-gray-200 text-left leading-4 text-blue-500 tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.length > 0 && data.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{item.numberOfTest}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{item.score}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{item.dateOfTest}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Result;