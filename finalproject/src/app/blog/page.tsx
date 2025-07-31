'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Blog {
  _id: string;
  title: string;
  date: string;
  month: string;
  category: string;
  author: string;
  image: string;
  description: string;
  views: number;
  comments: number;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const visibleBlogs = blogs.slice(0, visibleCount);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">News</h1>

      <div className="space-y-10">
        {visibleBlogs.map((blog) => (
          <div key={blog._id} className="grid md:grid-cols-2 gap-8 items-start">
            <div className="relative">
              <Image
                src={blog.image}
                alt={blog.title}
                width={600}
                height={400}
                className="rounded-lg w-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white text-center rounded-full shadow px-3 py-1">
                <p className="text-lg font-bold leading-none">{blog.date}</p>
                <p className="text-xs font-semibold text-gray-600">{blog.month}</p>
              </div>
            </div>

            <div>
              <span className="text-xs inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full mb-2">
                {blog.category}
              </span>
              <h2 className="text-lg md:text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-3">
                {blog.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <span>by {blog.author}</span>
                <span className="flex items-center space-x-1">
                  <i className="ri-eye-line"></i> <span>{blog.views}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <i className="ri-chat-3-line"></i> <span>{blog.comments}</span>
                </span>
                <span>
                  <i className="ri-share-line"></i>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < blogs.length && (
        <div className="mt-10 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-primaryGreen text-white rounded hover:bg-gray-800 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;

