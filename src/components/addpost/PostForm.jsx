import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, RTE, Select } from "../index";
import { useForm } from "react-hook-form";
import databaseAndStorageService from "../../firebase/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostForm = ({ post }) => {
  const userData = useSelector((state) => state.auth.userData.uid);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      const slug = value.toLowerCase().replace(/ /g, "-");
      return slug;
    }
    return "";
  }, []);
  const { control, register, handleSubmit, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    setLoader(true);
    if (post) {
      const file = data.image[0]
        ? await databaseAndStorageService.uplaodFile(data.image[0])
        : null;
      if (file) {
        await databaseAndStorageService.deleteFile(post.featuredImage);
      }
      data.featuredImage = file ? file : post.featuredImage;
      data.userID = userData;
      data.postID = post.postID;
      const updatedPostId = await databaseAndStorageService.updatePost(
        post.postID,
        data
      );
      if (updatedPostId) {
        setLoader(false);
        navigate("/home");
      }
    } else {
      const file = await databaseAndStorageService.uplaodFile(data.image[0]);
      if (file) {
        data.featuredImage = file;
        data.userID = userData;
        const postId = await databaseAndStorageService.createPost(data);
        if (postId) {
          data.postID = postId;
          const updatedPostId = await databaseAndStorageService.updatePost(
            postId,
            data
          );
          if (updatedPostId) {
            setLoader(false);
            navigate("/home");
          }
        }
      }
    }
  };
  //   <div className="w-full>

  // </div>
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="flex items-center justify-center w-full h-[550px] sm:h-[480px]">
        <div className="w-full h-full p-3 text-white flex justify-center">
          <div className="w-full h-full flex flex-col gap-5 items-center p-2 bg-zinc-800  text-white overflow-y-scroll overflow-x-hidden rounded-xl">
            <div className=" w-full flex flex-col justify-center items-center">
              <Input
                label="Title: "
                placeholder="Enter post title"
                {...register("title", { required: true })}
              />
              <Input
                label="Slug: "
                placeholder="Slug"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
              <Input
                label="Image: "
                type="file"
                accpect="image/png,image/jpg,image/jpeg,image/gif"
                {...register("image", { required: !post })}
              />
              <Select
                label="Status: "
                options={["active", "inactive"]}
              ></Select>
            </div>
            <div className="flex flex-col justify-center w-full">
              <RTE
                control={control}
                name="content"
                defaultValue={getValues("content")}
              ></RTE>

              <div className="sm:w-[30%] w-[50%]">
                <Button
                  type="submit"
                  clasName="my-4 rounded-lg w-full"
                  bgColor={!post ? "bg-green-500" : undefined}
                  onHover={!post ? "hover:bg-green-800" : undefined}
                  disabled={loader}
                >
                  {loader
                    ? "Uploading post..."
                    : post
                    ? "Update Post"
                    : "Create Post"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
