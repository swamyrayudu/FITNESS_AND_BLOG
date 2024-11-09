import { Link } from "react-router-dom";

export default function Notfound()
{
    return(
        <section className="bg-black w-screen h-screen text-white flex items-center font-bold text-[20px]">
            <p className="ml-20 ">404 | founded <br />You have <Link className="text-blue-500" to='/register'>Register</Link> </p>
            
        </section>
    )
}