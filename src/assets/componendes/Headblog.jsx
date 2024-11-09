import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

export default function Headblog() {
    const navigate = useNavigate();

    function handleNavigateToBlog() {
        navigate('/blog');
    }

    return (
        <header className="w-full h-[60px] bg-gradient-to-r from-neutral-900 to-black shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center h-full px-8">
                <h1 className="text-xl font-extrabold text-white tracking-wider cursor-pointer">
                    Blog
                </h1>
                <nav className="flex items-center space-x-12">
                    <Link to="/post" className="text-white text-sm font-semibold hover:text-gray-100 transition-transform duration-300 hover:scale-110">
                        Post
                    </Link>
                    <Link to="/dashboard" className="text-white text-sm font-semibold hover:text-gray-100 transition-transform duration-300 hover:scale-110">
                        Dashboard
                    </Link>
                    <Link to="/allblogs" className="text-white text-sm font-semibold hover:text-gray-100 transition-transform duration-300 hover:scale-110">
                        All Blogs
                    </Link>
                </nav>
                <Button 
                    onClick={handleNavigateToBlog} 
                    className="bg-white text-black font-bold px-4 py-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                    Blog
                </Button>
            </div>
        </header>
    );
}
