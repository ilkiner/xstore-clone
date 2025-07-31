'use client';

import React, { useState, useEffect } from 'react';

interface Blog {
  _id: string;
  title: string;
  date: string;
  month: string;
  category: string;
  author: string;
  image: string;
  description?: string;
  views: number;
  comments: number;
}

const AddBlogPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    month: '',
    category: '',
    author: '',
    image: '',
    description: '',
    views: 0,
    comments: 0,
  });

  const [blogs, setBlogs] = useState<Blog[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'views' || name === 'comments' ? Number(value) : value,
    }));
  };

  const fetchBlogs = async () => {
    const res = await fetch('http://localhost:5000/api/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Blog added');
      setFormData({
        title: '',
        date: '',
        month: '',
        category: '',
        author: '',
        image: '',
        description: '',
        views: 0,
        comments: 0,
      });
      fetchBlogs();
    } else {
      alert('Failed to add blog');
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Delete this blog?');
    if (!confirm) return;

    const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      alert('Deleted');
    } else {
      alert('Failed to delete');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Add New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="date" placeholder="Date (e.g., 02)" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="month" placeholder="Month (e.g., JAN)" value={formData.month} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="image" placeholder="/images/blog-1.jpg" value={formData.image} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="views" type="number" placeholder="Views" value={formData.views} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="comments" type="number" placeholder="Comments" value={formData.comments} onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-primaryGreen text-white px-4 py-2 rounded hover:bg-green-700">
          Add Blog
        </button>
      </form>

      <h2 className="text-xl font-bold mt-12 mb-4">Existing Blogs</h2>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500">{blog.date} {blog.month} - {blog.category} - by {blog.author}</p>
            </div>
            <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBlogPage;

