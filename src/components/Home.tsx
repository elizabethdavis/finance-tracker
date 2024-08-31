import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import PublicPost from "./PublicPost";

interface Post {
  id: string;
  content: string;
  userName: string;
  createdAt: any;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const postsQuery = query(
      collection(db, "publicPosts"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(newPosts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="home p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Financial Social Feed</h1>
      <PublicPost />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Updates</h2>
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <p className="text-gray-800 mb-2">{post.content}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{post.userName}</span>
              <span>{post.createdAt.toDate().toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;