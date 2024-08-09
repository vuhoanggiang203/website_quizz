import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate = useNavigate();
    return (
        <>
        <ul className="list-none overflow-hidden p-3 m-0  bg-emerald-700 ">
            <li className="float-left mx-3">
                <a 
                    onClick={()=>navigate('/Result')}
                    className="block hover:bg-sky-700 p-2  cursor-pointer
                      font-semibold border-solid rounded-lg border-black bg-gray-400">Statistic</a>
            </li>
            <li className="float-left">
                <a 
                onClick={()=>navigate('/Start ')}
                 className="block hover:bg-sky-700 p-2   cursor-pointer  
                font-semibold  border-solid rounded-lg border-black bg-gray-400">Start test</a>
            </li>
            <li className="float-left">
                <a 
                onClick={()=>navigate('/')}
                className="block hover:bg-sky-700 p-2  mx-3  cursor-pointer
                  font-semibold  border-solid rounded-lg border-black bg-gray-400">Log out</a>
            </li>
        </ul>
        </>
    );
}
export default Header;