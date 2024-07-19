"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

interface Post {
  title: string;
  img: string;
  content: string;
}

function EditPostPage({ params }: Params) {
  const { id } = params;
  const [postData, setPostData] = useState<Post>({
    title: "",
    img: "",
    content: "",
  });
  //New data of post
  const [newTitle, setNewTitle] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newContent, setNewContent] = useState("");

  const router = useRouter();

  const getPostById = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch a data");
      }
      const data = await res.json();
      console.log("Edit post:", data);
      setPostData(data.post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostById(id);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newImg, newContent }),
      });
      if (!res.ok) {
        throw new Error("Failed to create a post");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h3 className="text-3xl font-bold">Edit Post</h3>
        <hr className="my-3" />
        <Link
          href="/"
          className="bg-gray-500 inline-block text-white border py-2 px-3 my-2 rounded"
        >
          Go back
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setNewTitle(e.target.value)}
            type="text"
            className="w-[300px] block bg-gray-200 border py-2 px-3 my-2 rounded text-lg"
            placeholder={postData.title}
          />
          <input
            onChange={(e) => setNewImg(e.target.value)}
            type="text"
            className="w-[300px] block bg-gray-200 border py-2 px-3 my-2 rounded text-lg"
            placeholder={postData.img}
          />
          <textarea
            onChange={(e) => setNewContent(e.target.value)}
            className="w-[300px] h-[300px] block bg-gray-200 border py-2 px-3 my-2 rounded text-lg"
            name=""
            id=""
            placeholder={postData.content}
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white border py-2 px-3 my-2 rounded text-lg"
          >
            Edit Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPostPage;
