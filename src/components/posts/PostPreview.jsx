import React, { useEffect, useState } from "react";
import { Button } from "../index";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseAndStorageService from "../../firebase/config";
import parse from "html-react-parser";

const PostPreview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [url, setUrl] = useState(null);
  const [loader, setLoader] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const userData = useSelector((state) => state.auth.userData.uid);

  const getPost = async () => {
    if (slug) {
      setLoader(true);
      const post1 = await databaseAndStorageService.getPost(slug);
      if (post1) {
        setPost(post1);
        const url1 = await databaseAndStorageService.getImageUrl(
          post1.featuredImage
        );
        if (url1) {
          setUrl(url1);
          setLoader(false);
        }
      }
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const deleteHandler = async () => {
    setDeleting(true);
    await databaseAndStorageService.deleteFile(post.featuredImage);
    await databaseAndStorageService.deletePost(post.postID);
    setDeleting(false);
    navigate("/home");
  };

  const isAuthor = userData && post ? userData === post.userID : false;
  console.log(userData)
  console.log(post.userID)
  console.log(isAuthor)
  return (
    <div className="flex items-center justify-center w-full h-[80%]">
      <div className="w-full h-full p-3 text-white flex justify-center">
        {loader ? (
          <h1 className="text-center text-xl text-white">fetching...</h1>
        ) : !post ? (
          <h1 className="text-center text-xl text-white">
            Uh oh, no such blog found
          </h1>
        ) : (
          <div className="w-full flex flex-col items-center p-2  rounded-xl text-white overflow-y-scroll overflow-x-hidden">
            <div className="w-full rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg object-center"
                src={url}
                alt="image"
              />
            </div>
            <div className="w-full p-3 flex flex-col justify-between rounded-xl bg-zinc-800 mt-2">
              <div className="flex flex-col gap-6">
                <h1 className="text-2xl hyphens-auto text-wrap font-bold">
                  {post.title}
                </h1>
                <h1 className="text-lg text-wrap">{parse(post.content)}</h1>
              </div>
              <div className="flex justify-start items-center gap-4 mt-6">
                <Link to="/home">
                  <Button clasName="rounded-lg">Back</Button>
                </Link>
                {isAuthor && (
                  <Link to={`/edit-post/${post.postID}`}>
                    <Button clasName="rounded-lg" disabled={loader}>
                      {loader ? "Loading..." : "Edit"}
                    </Button>
                  </Link>
                )}
                {isAuthor && (
                  <Button
                    onClick={deleteHandler}
                    clasName="rounded-lg"
                    bgColor="bg-red-600"
                    onHover="hover:bg-red-800"
                    disabled={loader || deleting}
                  >
                    {loader
                      ? "Loading..."
                      : deleting
                      ? "Deleting..."
                      : "Delete"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PostPreview;
