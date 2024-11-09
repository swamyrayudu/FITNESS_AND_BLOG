import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Headblog from "./Headblog";
import { ContextUser } from "../contexts/Contextuser";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Allblogs() {
  const { loginuser } = useContext(ContextUser);
  const [allblogs, setallbolgs] = useState([]);
  // console.log(loginuser);

  useEffect(() => {
    if (loginuser?.token) {
      fetchBlogs();
    }
  }, [loginuser?.token]);

  function fetchBlogs() {
    fetch("http://localhost:9000/allblogs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginuser.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setallbolgs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <section className="w-full h-[650px] bg-white">
        <div>
          <Headblog />
        </div>

        <section className="w-full h-fit bg-white flex flex-wrap justify-start items-start gap-6 p-4">
          {allblogs?.length > 0 ? (
            allblogs
              .slice()
              .reverse()
              .map((blog, index) => (
                <Card
                  key={index}
                  className="w-[20%] h-[390px] bg-white shadow-md p-4 ml-[30px]"
                >
                  <CardHeader>
                    <img
                      src={blog.image}
                      className="p-2 h-[150px] object-cover"
                      alt="Blog"
                    />
                    <Button className="w-fit text-[10px] h-8 bg-blue-400 ml-2">
                      {blog.category}
                    </Button>
                    <CardDescription className="ml-3">
                      {/* Removed nested <p> inside another <p> */}
                      <span className="block w-full h-[20px] overflow-hidden">
                        {blog.title}
          
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Changed <p> to <div> to avoid nesting <p> */}
                    <div className="font-thin text-[12px] pl-3 w-full h-[70px] overflow-hidden">
                      {blog.content}
                    </div>
                  </CardContent>
                  <CardContent>
                    {/* Changed <p> to <div> to avoid nesting <p> */}
                    <div className="font-semibold text-[12px] pl-3 w-full h-[30px] overflow-hidden pt-2">
                      __created by {blog.userId?.name}{" "}
                      
                    </div>
                  </CardContent>
                  <CardFooter className="w-full h-[50px] pt-3">
                    {/* Corrected JSX syntax for the Link component */}
                    <Button asChild className="w-full h-[40px] overflow-hidden">
                      <Link to={`/singleblog/${blog._id}`} state={{blog}}>View</Link>

                    </Button>
                    {/* <div className="w-[0%] h-[20px] text-[10px] pt-9 pr-10 ">
                      data:{new Date(blog.createdAt).toLocaleDateString()}

                    </div> */}
                  </CardFooter>
                </Card>
              ))
          ) : (
            <p>No blogs available</p>
          )}
        </section>
      </section>
    </>
  );
}
