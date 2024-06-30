import React, { useEffect, useState } from "react";
import databaseAndStorageService from "../../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import { PostCard, PostPreview } from "../index";

const AllPosts = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    setLoader(true);
    const posts1 = await databaseAndStorageService.getPosts();
    if (posts1) {
      setPosts(posts1);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-[80%]">
      <div className="w-full h-full p-3 text-white flex flex-wrap gap-2 justify-center overflow-y-scroll overflow-x-hidden">
        {loader ? (
          <h1 className="text-center text-xl">
            Please wait while we are fetching the blogs...
          </h1>
        ) : posts?.length == 0 ? (
          <h1 className="text-center text-xl">
            There are no blogs yet. Add new post to list here
          </h1>
        ) : (
          posts?.map((post) => <PostCard key={post.postID} post={post} />)
        )}
      </div>
    </div>
  );
};

export default AllPosts;
