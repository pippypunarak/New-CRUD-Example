import React from "react";

interface UserData {
  key: number;
  name: string;
  email: string;
}

function ItemList({ key, name, email }: UserData) {
  return (
    <div className="flex flex-col justify-center">
      <div
        key={key}
        className="flex flex-row justify-between text-lg p-8 rounded-lg border border-gray-300 gap-8"
      >
        <div className="font-bold">Name: {name}</div>
        <div className="font-bold">Email: {email}</div>
      </div>
    </div>
  );
}

export default ItemList;
