import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Spinner } from 'flowbite-react';
import CallToAction from "../Components/CallToAction";
import CommentSection from "../Components/CommentSection";

const PostPage = () => {

    const { postSlug } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ post, setPost ] = useState(null);
    

    useEffect(() => {
        
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return;
                } 
                
                if(res.ok){
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }

            } catch (error) {
                setError(true);
                setLoading(false);
                return;
            }
        }

        fetchPost();

    }, [postSlug]);

    if(loading) return(
        <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
        </div>
    )
    

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif 
        max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
        <Link to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
        >
            <Button color="gray" pill size="xs">{ post && post.category }</Button>
        </Link>
        <img src={post && post.image} alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
        />
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto
        w-full max-w-2xl text-xs 
        ">
            <span className="text-[17px]">{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="text-[17px] italic">{post && (post.content.length / 1000).toFixed(0)} mins read</span>
        </div>

        {/* below post-content is a custom class we create in index.css as we can't apply tailwind to this editor content */}
        <div className="p-3 max-w-2xl mx-auto w-full post-content" 
        dangerouslySetInnerHTML={{__html: post && post.content}}>
            
        </div>
        <div className="max-w-4xl mx-auto w-full">
            <CallToAction/>
        </div>
        <CommentSection
            postId={post._id}
        />  
    </main>
  )
}

export default PostPage