import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify";



export default function Register() {
    const navigate = useNavigate()
    const [userDeatails, setuserDeatails] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    })

    
    function handelinput(event) {
        setuserDeatails((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }
        })
    }
    function handelsubmit(event) {
        event.preventDefault()
        
        fetch("http://localhost:9000/register",{
            method:"POST",
            body:JSON.stringify(userDeatails),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=> response.json())
        .then((data)=>{
            toast.success("User Registered")
            navigate("/login")
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }
    return (
        <section className="w-[100%] h-screen text-white">

            <form onSubmit={handelsubmit}>

                <section className="w-[100%] h-screen bg-white shadow-inner rounded">

                    <div className="w-[30%] h-400px absolute right-[430px] top-[40px] shadow-2xl border-2 border-neutral-300 pt-[50px] pb-[50px]  rounded-lg">
                        <h1 className="text-black text-[26px] font-bold ml-[110px] pb-4">Register form</h1>
                                <div>
                                <Label className='lab' htmlFor="name">Name</Label>
                                <Input  className="py" id='name' type="text" required placeholder="Enter name" name="name" value={userDeatails.name} onChange={handelinput}/>
                                </div>

                                <div>
                                <Label className='lab' htmlFor="email">Email</Label>
                                <Input className="py" id='email' type="email" required placeholder="Enter Email" name="email" value={userDeatails.email} onChange={handelinput} />
                                </div>

                                <div>
                                <Label className='lab' htmlFor="password">Password</Label>
                                <Input  className="py" id='password' type="Password" required minLength={8} placeholder="Enter Password" name="password" value={userDeatails.password} onChange={handelinput}/>
                                </div>

                                <div>
                                <Label className='lab' htmlFor="age">Age</Label>
                                <Input className="py" id='age' type="number" required max={100} min={18} placeholder="Enter age" name="age" value={userDeatails.age} onChange={handelinput}/>
                                </div>

                        <Button className="btn">Register</Button>
                        
                        
                        <p className="font-bold ml-16 mt-4 text-black">Already Registered? <Link to='/login' className="text-blue-600">Login</Link></p>

                    </div>
                </section>
            </form>

        </section>
    )
}