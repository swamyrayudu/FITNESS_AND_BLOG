import { ContextUser } from "../contexts/Contextuser";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Headblog from "./Headblog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Singleblog() {
    const location = useLocation();
    console.log(location.pathname.split('/')[2]);
    const { blog } = location.state || {};
    const { loginuser } = useContext(ContextUser);

    const navigate = useNavigate()
    function usetonavigate()
    {
        navigate(-1)
    }
    const [newComment, setNewComment] = useState({
        comment: "",
        postId: blog?._id || "",
        userId: loginuser?.userid || "",
    });
    const [comments, setComments] = useState([]);

    // console.log(Comment);

    function handleComment(event) {
        const { name, value } = event.target;
        setNewComment((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function submitComment(event) {
        event.preventDefault();
        fetch(`http://localhost:9000/addcomment/${blog._id}`, {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                Authorization: `Bearer ${loginuser.token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then(() => {
                toast.success("Comment added successfully!");
                setNewComment({
                    comment: "",
                    postId: blog?._id,
                    userId: loginuser?.userid,
                });
                // Fetch comments again to include the new comment
                fetchComments();
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to add comment.");
            });
    }

    function fetchComments() {
        fetch(`http://localhost:9000/getall/${blog._id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${loginuser.token}`,
            },
        })
            .then((response) => response.json())
            .then((datacom) => {
                setComments(datacom.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Failed to load comments.");
            });
    }

    useEffect(() => {
        if (blog?._id) {
            fetchComments();
        }
    }, [blog]);




    return (
        <>
            <div>
                <Headblog />
            </div>

            <section className="w-full h-fit bg-white flex justify-center items-center">
                <section className="w-1/2 h-fit bg-white shadow-2xl">
                    <div className="w-full h-10 flex p-10">
                        <img
                            src="https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-users-icon-png-image_856952.jpg"
                            alt=""
                            className="rounded-full mt-1 w-8 h-8"
                        />
                        <div className="ml-2">
                            <div className="font-bold mb-7 text-sm">
                                <p>{blog?.userId?.name}</p>
                                <p className="font-thin text-xs">{blog.category}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-10 pt-3">
                        <u className="pl-16 font-medium cursor-pointer" onClick={usetonavigate}>
                            Back
                        </u>
                    </div>
                    <div className="w-full h-600 pl-10 pr-10">
                        <img
                            src={blog.image}
                            alt="error"
                            className="w-full h-600 rounded-lg mt-5"
                        />
                    </div>
                    <div className="w-full h-fit pl-12 pt-3">
                        <p className="font-bold">{blog.title}</p>
                    </div>
                    <div className="w-full h-fit">
                        <div className="w-full h-fit pl-10 pr-10 pt-4">
                            <p className="text-lg text-gray-500">{blog.content}</p>
                        </div>
                        <div className="w-full h-fit flex justify-center items-center pl-10 pr-10">
                            <span className="font-semibold text-lg">
                                --created by {blog.userId?.name}--
                            </span>
                        </div>
                    </div>
                    <form onSubmit={submitComment}>
                        <div className="w-full h-fit pl-10 pr-10 pt-3">
                            <Textarea
                                className="w-full h-36"
                                required
                                placeholder="Enter Comment"
                                name="comment"
                                value={newComment.comment}
                                onChange={handleComment}
                            />
                        </div>
                        <div className="w-full h-16 flex justify-center items-center pt-6">
                            <Button type="submit">Add Comment</Button>
                        </div>
                    </form>

                    <div className="w-full h-10 pl-10">
                        <h1 className="font-semibold">All Comments</h1>
                    </div>

                    <section>
                        {
                            comments.length > 0 &&
                            comments.map((commentItem, index) => (
                                <div
                                    key={index}
                                    className="w-full h-fit flex pl-12 pr-10 mt-3"
                                >
                                    <img
                                        src="https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-users-icon-png-image_856952.jpg"
                                        alt=""
                                        className="rounded-full mt-1 w-8 h-8"
                                    />
                                    <div className="ml-2">
                                        <div className="font-bold mb-2 text-sm">
                                            {commentItem.userId.name}
                                            <p className="font-thin text-xs">
                                                data:{new Date(commentItem.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="h-fit">
                                            <p>{commentItem.comment}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                </section>
            </section>
        </>
    );
}
