'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';

const articles = [
  {
    date: '08',
    month: 'APR',
    title: '13 YouTube Ads Targeting Options',
    description: 'Recently, I was invited by Nintendo of Canada to attend a very special Nintendo Holiday Showcase',
    image: '/images/article-1.jpg',
  },
  {
    date: '14',
    month: 'MAY',
    title: 'Learn about the Google Pixel',
    description: 'Recently, I was invited by Nintendo of Canada to attend a very special Nintendo Holiday Showcase',
    image: '/images/article-2.jpg',
  },
  {
    date: '06',
    month: 'OCT',
    title: 'YouTube Ads targeting options',
    description: 'Recently, I was invited by Nintendo of Canada to attend a very special Nintendo Holiday Showcase',
    image: '/images/article-3.jpg',
  },
  {
    date: '02',
    month: 'JAN',
    title: 'Announcing the new Fitbits Charge',
    description: 'Recently, I was invited by Nintendo of Canada to attend a very special Nintendo Holiday Showcase',
    image: '/images/article-4.jpg',
  },
  {
    date: '23',
    month: 'FEB',
    title: 'TikTok Ad Strategies for 2024',
    description: 'Recently, I was invited by Nintendo of Canada to attend a very special Nintendo Holiday Showcase',
    image: '/images/article-5.jpg',
  },
  {
    date: '11',
    month: 'JUN',
    title: 'Exploring New Mobile Trends',
    description: 'Recently, I was invited by Nintendo of Canada to attend a very special Nintendo Holiday Showcase',
    image: '/images/article-6.jpg',
  },
];

const Articles = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">From Our Articles</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={4}
        className="article-swiper"
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <div className="bg-white rounded-xl shadow hover:shadow-md transition p-2">
              <div className="relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={250}
                  className="rounded-xl w-full h-[220px] object-cover"
                />
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white text-center text-sm font-bold flex flex-col items-center justify-center shadow">
                  <span>{article.date}</span>
                  <span className="text-[10px] font-normal">{article.month}</span>
                </div>
                <span className="absolute bottom-3 left-3 text-xs bg-primaryGreen text-white px-2 py-1 rounded-full text-[11px]">
                  Audio Electronics
                </span>
              </div>
              <div className="px-2 mt-3">
                <h3 className="mt-1 text-sm font-semibold hover:text-black cursor-pointer transition">
                  {article.title}
                </h3>
                <p className="text-[13px] text-gray-600 mt-1">{article.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Articles;



