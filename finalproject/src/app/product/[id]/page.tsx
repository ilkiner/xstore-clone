'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { RiHeartLine, RiShoppingCart2Line } from 'react-icons/ri';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user?.user);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error('HTTP error! status: ' + res.status);
        const product = await res.json();
        setData(product);
        setSelectedColor(product.color || null);
      } catch (error) {
        console.error('Product fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error('Review fetch error:', error);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleAddToCart = () => {
    console.log('user:', user);
    if (!user) {
      alert('You need to log in to add products to the cart.');
      return;
    }

    dispatch(
      addToCart({
        id: data._id,
        name: data.name,
        price: data.price,
        quantity: selectedQty,
        image: data.image,
        color: selectedColor || '',
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    if (!user) {
      alert('You need to log in to submit a review.');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: id,
          userId: user._id,
          username: user.username,
          email: user.email,
          rating,
          comment: reviewText,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Review POST error:', errorData);
        return;
      }

      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setReviewText('');
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!data) return <p className="text-center py-10 text-red-600">Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
    
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-sm">
            <img src={data.image} alt={data.name} className="w-full rounded-lg hover:opacity-0 transition" />
            {data.hoverImage && (
              <img
                src={data.hoverImage}
                alt="Hover"
                className="absolute top-0 left-0 w-full rounded-lg opacity-0 hover:opacity-100 transition"
              />
            )}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
          <p className="text-sm text-gray-500 mb-4">Brand: <span className="text-green-600">Envato</span></p>

          <div className="flex items-center space-x-4 text-sm mb-4">
            <span className="text-green-700 font-bold">★★★★★</span>
            <span>({reviews.length} customer review{reviews.length !== 1 ? 's' : ''})</span>
            <span className="ml-4 flex items-center space-x-1 cursor-pointer hover:underline">
              <RiHeartLine className="text-gray-600" />
              <span>Add To Wishlist</span>
            </span>
          </div>

          <p className="text-3xl font-semibold text-gray-800 mb-1">${data.price}</p>
          <p className="text-sm text-gray-600 mb-4">Shipping calculated at checkout.</p>

          {data.color && (
            <div className="mb-4">
              <p className="text-sm">Color: <span className="capitalize">{selectedColor}</span></p>
              <div className="flex space-x-2">
                {['black', 'white', 'gray', 'red'].map((color) => (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border cursor-pointer ${selectedColor === color ? 'ring-2 ring-black' : ''}`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          <p className="text-green-600 font-medium mb-4">{data.inStock ? '✓ In Stock' : '✗ Out of Stock'}</p>

          <div className="flex items-center space-x-4 mb-4">
            <input
              type="number"
              value={selectedQty}
              onChange={(e) => setSelectedQty(Number(e.target.value))}
              min={1}
              className="w-16 h-10 border border-gray-300 rounded text-center"
            />
            <button
              onClick={handleAddToCart}
              className="flex items-center bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded"
            >
              <RiShoppingCart2Line className="mr-2" /> Add To Cart
            </button>
          </div>

          <button className="w-full bg-black hover:bg-gray-800 text-white px-6 py-3 rounded">👜 Buy Now</button>
        </div>
      </div>

      
      <div className="mt-16 border-t pt-10">
        <div className="flex space-x-8 border-b pb-4 mb-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-2 font-semibold ${activeTab === 'description' ? 'border-b-2 border-black' : 'text-gray-500'}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 font-semibold ${activeTab === 'reviews' ? 'border-b-2 border-black' : 'text-gray-500'}`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {activeTab === 'description' && (
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                This is a high-quality product carefully designed for modern needs. Crafted with premium materials to ensure both durability and performance.
              </p>
              <img src={data.image} alt="desc-img" className="w-full max-w-xs mb-4" />
              <p className="text-gray-700 text-sm">
                This is a beautiful and high-quality product that matches your lifestyle.
                You can trust the build, the design and the value. It is rated highly by customers.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-semibold mb-2">Add a Review</h3>
              {!user && (
                <div className="text-sm bg-blue-100 border border-blue-400 text-blue-800 px-4 py-2 rounded mb-4">
                  You have to be logged in to leave a review.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm">Your rating *</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border border-gray-300 rounded p-2 w-full"
                    disabled={!user}
                  >
                    {[5, 4, 3, 2, 1].map((star) => (
                      <option key={star} value={star}>
                        {'★'.repeat(star)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm">Your review *</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full h-24 border border-gray-300 rounded p-2"
                    disabled={!user}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!user}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  SUBMIT
                </button>
              </form>
            </div>

            <div>
              <h3 className="font-bold mb-2">Customer Reviews</h3>
              {reviews.length === 0 && <p>No reviews yet.</p>}
              {reviews.map((r: any, idx: number) => (
                <div key={idx} className="border-b py-2">
                  <p className="font-semibold">{r.username} {'★'.repeat(r.rating)}</p>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;


