import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ContextUser } from '../contexts/Contextuser';

export default function Headers() {
    const { loginuser, setloginuser } = useContext(ContextUser);
    const navigate = useNavigate();

    function logout() {
        let reload = window.confirm("Are you sure you want to log out?");
        if (reload) {
            setloginuser(null);
            localStorage.removeItem('swamy-user');
            navigate('/Home');  // Redirect to Home after logout
        }
    }

    return (
        <header className="w-full h-[60px] bg-gradient-to-r from-black to-black shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center h-full px-8">
                <h1 className="text-xl font-extrabold text-white tracking-wider cursor-pointer">
                    <Link to="/">YUMMY</Link>
                </h1>
                <nav className="flex items-center space-x-12">
                    <Link to="/Home" className="text-white text-sm font-semibold hover:text-gray-100 transition-transform duration-300 hover:scale-110">
                        Home
                    </Link>
                    <Link to="/Food" className="text-white text-sm font-semibold hover:text-gray-100 transition-transform duration-300 hover:scale-110">
                        Track
                    </Link>
                    <Link to="/Blog" className="text-white text-sm font-semibold hover:text-gray-100 transition-transform duration-300 hover:scale-110">
                        Blog
                    </Link>
                </nav>
                {loginuser ? (
                    <Button onClick={logout} className="bg-white text-green-500 font-bold px-4 py-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                        Logout
                    </Button>
                ) : (
                    <Link to="/login" className="bg-white text-green-500 font-bold px-4 py-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}
