import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { ContextUser } from "../contexts/Contextuser";



export default function Logo ()
{


    

    const loginuserdata = useContext(ContextUser)



    const navigate = useNavigate()
    const [userCread, setuserCread] = useState({
        email: "",
        password: ""
    })

    function handelinputs(event) {
        setuserCread((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }
        })
        
    }

    function handelsubmit(event){
        event.preventDefault()
        console.log(userCread);

        fetch("http://localhost:9000/login",{
            method:"POST",
            body:JSON.stringify(userCread),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=> response.json())
        .then((data)=>{
            
            if(data.message=='login success')
                {
                    if(data.token!==undefined)
                    {
                        console.log(data);

                        localStorage.setItem("swamy-user",JSON.stringify(data))
                        loginuserdata.setloginuser(data)
                        navigate("/Home")
                        toast.success("login success")
                    }
                  
                }
                else if(data.message=='wrong password')
                {
                    toast.error('wrong password', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                       
                        });

                }
                else if(data.message == "wrong email")
                {
                    toast.error('wrong email', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        
                        });
                }
            
        })
        
        .catch((err)=>{
            console.log(err);
            
        })
        
    }
    return(
        <section className="w-[100%] h-screen bg-black text-white">

            <form onSubmit={handelsubmit}>
            <section className="w-[100%] h-screen bg-white">

                <div className="w-[30%] absolute right-[430px] top-[150px] shadow-2xl border-2 border-neutral-300 pt-[50px] pb-[50px]  rounded-lg">
                    <h1 className="text-black text-[26px] font-bold ml-[110px] pb-4">Login form</h1>
                        

                        <div>
                        <Label className='lab' htmlFor="email">Email</Label>

                        <Input className='py' required type="email" id='email'  placeholder="Enter Email" name="email" onChange={handelinputs} value={userCread.email}/>
                        </div>

                        <div>
                        <Label className='lab' htmlFor="password">Password</Label>
                        <Input className='py' required  id='password' type="Password" placeholder="Enter Password"  name="password" onChange={handelinputs} value={userCread.password} />
                        </div>

                        <Button className='btn'>Login</Button>
                        
                        <p className="font-bold ml-16 mt-4 text-black">Your Not Register? <Link to='/register'  className="text-blue-600">Register</Link></p>
                </div>

            </section>
    
            </form>

        </section>
    )
}