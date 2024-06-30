import React, { useEffect, useState } from "react";
import { Button } from "../index";
import databaseAndStorageService from "../../firebase/config";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const getUrl = async () => {
    setLoading(true);
    const url1 = await databaseAndStorageService.getImageUrl(
      post.featuredImage
    );
    if (url1) {
      setUrl(url1);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUrl();
  }, []);

  return (
      <div className="w-80 h-80 flex flex-col items-center rounded-xl p-2 border-2 bg-zinc-800 border-zinc-500 text-white">
      <div className="w-full h-[60%] rounded-lg overflow-hidden">
        {loading ? (
          <h1>loading image...</h1>
        ) : (
          <img
            className="w-full h-full object-cover object-center"
            src={url}
            alt="image"
          />
        )}
      </div>
      <div className="w-full h-[40%] p-3 flex flex-col justify-between rounded-xl bg-zinc-700 mt-2">
        <h1 className="text-2xl hyphens-auto text-wrap">{post.slug}</h1>
        <Link to={`/post/${post.postID}`}>
          <Button clasName="rounded-lg w-full" disabled={loading}>
            {loading ? "Loading..." : "Read Blog"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
