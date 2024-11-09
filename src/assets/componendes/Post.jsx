import Headblog from "./Headblog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useState, useEffect } from "react";
import { ContextUser } from "../contexts/Contextuser";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const { loginuser } = useContext(ContextUser);
  // console.log("Context Data:", loginuser);

  const navigate = useNavigate();
  const UserId = loginuser?.userid || "";

  const [userPost, setPost] = useState({
    userId: UserId,
    title: "",
    content: "",
    image: "",
    category: "",
  });


  useEffect(() => {
    if (loginuser?.userid) {
      setPost((prevState) => ({
        ...prevState,
        userId: loginuser.userid,
      }));
    }
  }, [loginuser]);

  function postinput(event) {
    const { name, value } = event.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleCategoryChange(value) {
    setPost((prevState) => ({
      ...prevState,
      category: value,
    }));
  }

  function postsubmit(event) {
    event.preventDefault();

    if (!loginuser?.token) {
      toast.error("User data is not loaded yet or token is missing. Please wait.");
      console.error("Missing user or token:", loginuser);
      return;
    }
    else if (!userPost.category) {
      toast.error("Please select a category.");
      return;
    }

    fetch("http://localhost:9000/posts", {
      method: "POST",
      body: JSON.stringify(userPost),
      headers: {
        Authorization: `Bearer ${loginuser.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((blogdata) => {
        console.log("Data being sent:", userPost);
        toast.success("Post success");
        navigate("/dashboard")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Post can't be created");
      });
  }

  return (
    <>
      <div>
        <Headblog />
      </div>

      <section className="w-[100%] h-[650px] bg-gray-100">
        <form onSubmit={postsubmit}>
          <section className="w-[100%] h-[650px] bg-gray-100 flex items-center justify-center">
            <section className="w-[35%] h-[450px] bg-gray-50 shadow-xl border-2 border-neutral-300 rounded">
              <div className="w-[100%] h-[80px] flex items-center justify-center">
                <Input
                  name="title"
                  className="w-[85%] border-2 border-neutral-300 mt-7"
                  onChange={postinput}
                  value={userPost.title}
                  placeholder="Enter your title..."
                  type="text"
                  required
                />
              </div>
              <div className="w-[100%] h-[80px] flex items-center justify-center">
                <Textarea
                  name="content"
                  className="w-[85%] h-[40px] rounded-md mt-7 border-2 p-1 border-neutral-300"
                  onChange={postinput}
                  value={userPost.content}
                  placeholder="Type Your Content..."
                  required
                />
              </div>
              <div className="w-[100%] h-[80px] flex items-center justify-center">
                <Input
                  name="image"
                  className="w-[85%] border-2 mt-7 border-neutral-300"
                  placeholder="Enter your image link..."
                  onChange={postinput}
                  value={userPost.image}
                  type="text"
                  required
                />
              </div>
              <div className="w-[100%] h-[80px] flex items-center justify-center">
                <Select
                  value={userPost.category}
                  onValueChange={handleCategoryChange}
                  name="category"
                  required
                >
                  <SelectTrigger className="w-[85%]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Weight">Weight</SelectItem>
                    <SelectItem value="gain-weight">gain-weight</SelectItem>
                    <SelectItem value="loss-weight">loss-weight</SelectItem>
                    <SelectItem value="food">food</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[100%] h-[80px] flex items-center justify-center">
                <Button
                  className="w-[85%] h-[50px] border-2 border-neutral-300"
                  type="submit"
                >
                  Post
                </Button>
              </div>
            </section>
          </section>
        </form>
      </section>
    </>
  );
}
