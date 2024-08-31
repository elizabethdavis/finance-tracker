import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';

const PublicPost: React.FC = () => {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user && postContent.trim() !== '') {
      try {
        await addDoc(collection(db, 'publicPosts'), {
          userId: user.uid,
          content: postContent.trim(),
          createdAt: new Date(),
          userName: user.displayName || 'Anonymous'
        });
        setPostContent('');
        alert('Post published successfully!');
      } catch (error) {
        console.error('Error publishing post:', error);
        alert('Failed to publish post. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Share a Public Update</h2>
      <div className="mb-4">
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's your financial win or tip?"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
      >
        Post Update
      </button>
    </form>
  );
};

export default PublicPost;