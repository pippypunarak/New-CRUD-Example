"use client";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Link from "next/link";
import Image from "next/image";
import { ObjectId } from "mongoose";
import DeleteBtn from "./DeleteBtn";

interface Post {
  _id: string;
  title: string;
  img: string;
  content: string;
}

export default function Home() {
  const [postData, setPostData] = useState<Post[]>([]);

  console.log(postData);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await res.json();
      setPostData(data.posts);
    } catch (error) {
      console.log("Error loading posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <main className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-2xl font-bold mb-3">NextJS Crud + MongoDB</div>
        <hr className="my-3" />
        <button className="bg-green-500 p-3 text-white rounded">
          <Link href="/create">Create Post</Link>
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
          {postData && postData.length > 0 ? (
            postData.map((val) => (
              <div key={val._id} className="shadow-xl my-10 p-10 rounded-xl">
                <h4>{val.title}</h4>
                <div className="w-full h-48 relative">
                  <Image
                    src={val.img}
                    alt={val.title}
                    sizes="(max-width: 600px) 100vw, 
                           (max-width: 1024px) 50vw, 
                           25vw"
                    fill
                    className="object-cover rounded-md"
                    priority
                  />
                </div>
                <div className="mt-3 text-gray-700">{val.content}</div>
                <div className="flex justify-center mt-5 space-x-3">
                  <Link
                    href={`/edit/${val._id}`}
                    className="bg-gray-500 text-white border py-2 px-6 rounded-md text-lg"
                  >
                    Edit
                  </Link>
                  <DeleteBtn id={val._id} />
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-300 p-3 my-3">
              You do not have any posts yet.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
