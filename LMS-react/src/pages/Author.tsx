import React from "react";
import { AuthorManager } from "../components/author/AuthorManager";

const Author: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <AuthorManager />
    </div>
  );
};

export default Author;