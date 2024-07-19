"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !img || !content) {
      alert("Please complete all inputs");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, img, content }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a post");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h3 className="text-3xl font-bold">Create Post</h3>
        <hr className="my-3" />
        <Link
          href="/"
          className="bg-gray-500 inline-block text-white border py-2 px-3 my-2 rounded"
        >
          Go back
        </Link>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-[300px] block bg-gray-200 border py-2 px-3 my-2 rounded text-lg"
            placeholder="Post title"
          />
          <input
            onChange={(e) => setImg(e.target.value)}
            type="text"
            className="w-[300px] block bg-gray-200 border py-2 px-3 my-2 rounded text-lg"
            placeholder="Post img url"
          />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            className="w-[300px] h-[300px] block bg-gray-200 border py-2 px-3 my-2 rounded text-lg"
            name=""
            id=""
            placeholder="Enter your content"
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white border py-2 px-3 my-2 rounded text-lg"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
