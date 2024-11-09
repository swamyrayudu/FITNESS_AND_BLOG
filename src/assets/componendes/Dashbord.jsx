import { LucideView, Pencil, Trash2 } from "lucide-react";
import Headblog from "./Headblog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useState, useEffect } from "react";
import { ContextUser } from "../contexts/Contextuser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dash() {
  const [dashpost, setDashpost] = useState([]);
  const { loginuser } = useContext(ContextUser);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });

  // Fetch the user's posts when the component mounts
  useEffect(() => {
    function fetchUserPosts() {
      fetch(`http://localhost:9000/userposts/${loginuser.userid}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginuser.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setDashpost(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (loginuser.userid) {
      fetchUserPosts();
    }
  }, [loginuser]);

  function deleteblog(postId) {
    fetch(`http://localhost:9000/deleteone/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${loginuser.token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setDashpost((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Update a post
  function updatapost(postId) {
    fetch(`http://localhost:9000/updatePost/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginuser.token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        // Update the state with the modified post
        setDashpost((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, ...updatedPost } : post
          )
        );

        // Clear selected post and close the dialog
        setSelectedPost(null);
        setIsDialogOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditClick(post) {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      image: post.image,
      category: post.category,
    });
    setIsDialogOpen(true); // Open dialog when editing
  }

  return (
    <>
      <div>
        <Headblog />
      </div>

      <section className="w-full bg-white flex justify-center p-10">
        {/* Render user posts if available */}
        <Tabs defaultValue="posts" className="hoo w-[700px] bg-white">
          <TabsList className="w-[30%] h-[90px] bg-white">
            <TabsTrigger value="posts">posts</TabsTrigger>
            <TabsTrigger value="comments">comments</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            {dashpost.length > 0 ? (
              dashpost.map((dashuser) => (
                <div key={dashuser._id} className="w-[100%] h-[140px] mb-6">
                  <div className="w-[100%] h-[140px] pl-2 pr-2 flex">
                    <div className="w-[25%] h-[140px]">
                      <img
                        className="w-[100%] h-[140px] border-y-2 rounded p-1"
                        src={dashuser.image}
                        alt=""
                      />
                    </div>
                    <div className="w-[100%] h-[140px] bg-neutral-100 shadow-md rounded ml-1 pl-4 pt-2">
                      <span className="font-bold w-full overflow-hidden">
                        {dashuser.title}({dashuser.category})
                      </span>
                      <div className="w-[95%] h-[70px] overflow-hidden">
                        <span className="text-[14px]">{dashuser.content}</span>
                      </div>
                      <div className="w-[95%] h-[30px] flex justify-around pt-4">
                        <div className="w-5 h-5">
                          <LucideView className="w-5 h-5 cursor-pointer" />
                        </div>

                        <div className="w-5 h-5">
                          <Trash2
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => deleteblog(dashuser._id)}
                          />
                        </div>

                        <div className="w-5 h-5">
                          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                              <Pencil
                                className="w-5 h-5 cursor-pointer"
                                onClick={() => handleEditClick(dashuser)}
                              />
                            </DialogTrigger>
                            {selectedPost && selectedPost._id === dashuser._id && (
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Post</DialogTitle>
                                  <DialogDescription>
                                    <form
                                      onSubmit={(event) => {
                                        event.preventDefault();
                                        updatapost(selectedPost._id);
                                      }}
                                    >
                                      <section className="w-[100%] h-[450px] bg-gray-50 shadow-xl border-2 border-neutral-300 rounded">
                                        <div className="w-[100%] h-[80px] flex items-center justify-center">
                                          <Input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleFormChange}
                                            className="w-[85%] border-2 border-neutral-300 mt-7"
                                            placeholder="Enter your title..."
                                            type="text"
                                            required
                                          />
                                        </div>
                                        <div className="w-[100%] h-[80px] flex items-center justify-center">
                                          <Textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleFormChange}
                                            className="w-[85%] h-[40px] rounded-md mt-7 border-2 p-1 border-neutral-300"
                                            placeholder="Type Your Content..."
                                            required
                                          />
                                        </div>
                                        <div className="w-[100%] h-[80px] flex items-center justify-center">
                                          <Input
                                            name="image"
                                            value={formData.image}
                                            onChange={handleFormChange}
                                            className="w-[85%] border-2 mt-7 border-neutral-300"
                                            placeholder="Enter your image link..."
                                            type="text"
                                            required
                                          />
                                        </div>
                                        <div className="w-[100%] h-[80px] flex items-center justify-center">
                                          <Select
                                            name="category"
                                            value={formData.category}
                                            onValueChange={(value) =>
                                              setFormData((prevData) => ({
                                                ...prevData,
                                                category: value,
                                              }))
                                            }
                                            required
                                          >
                                            <SelectTrigger className="w-[85%]">
                                              <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Weight">
                                                Weight
                                              </SelectItem>
                                              <SelectItem value="gain-weight">
                                                gain-weight
                                              </SelectItem>
                                              <SelectItem value="loss-weight">
                                                loss-weight
                                              </SelectItem>
                                              <SelectItem value="food">
                                                food
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="w-[100%] h-[80px] flex items-center justify-center">
                                          <Button
                                            className="w-[85%] h-[50px] border-2 border-neutral-300"
                                            type="submit"
                                          >
                                            Update
                                          </Button>
                                        </div>
                                      </section>
                                    </form>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            )}
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts available.</p>
            )}
          </TabsContent>
          <TabsContent value="comments">Change your password here.</TabsContent>
        </Tabs>
      </section>
    </>
  );
}
