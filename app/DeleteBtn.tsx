import { ObjectId } from "mongoose";
import React from "react";

interface DeleteBtnProps {
  id: string;
}

function DeleteBtn({ id }: DeleteBtnProps) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/posts?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="bg-red-500 px-3 mx-2 text-white border py-2 rounded-md text-lg "
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteBtn;
