import React, { useEffect, useState } from "react";
import databaseAndStorageService from "../firebase/config";
import { useParams, useNavigate } from "react-router-dom";
import { PostForm } from "../components";

const EditPost = () => {
  const [loader, setLoader] = useState(false);
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const getPost = async () => {
    if (slug) {
      setLoader(true);
      const post1 = await databaseAndStorageService.getPost(slug);
      if (post1) {
        setPost(post1);
        setLoader(false);
      }
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    getPost();
  }, [slug]);
  return loader ? (
    <h1 className="text-2xl text-white text-center">Loading data...</h1>
  ) : post ? (
    <PostForm post={post}></PostForm>
  ) : null;
};

export default EditPost;
