'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/navigation';

const slides = [
  {
    id: 1,
    subtitle: 'Experience Sound',
    title: 'Freedom with AirPods',
    description: 'Unleash Wireless Sound Freedom.',
    buttonText: 'Discover',
    image: '/images/airpods.jpg',
    theme: 'text-black',
  },
  {
    id: 2,
    subtitle: 'New Camera. New Design.',
    title: 'iPhone 15 Pro Max',
    description: 'Titanium. So Strong. So Light. So Pro.',
    buttonText: 'Shop now',
    image: '/images/iphone15.jpg',
    theme: 'text-white',
  },
];

const HeroSlider = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto rounded-xl overflow-hidden">
      <Swiper
        navigation
        modules={[Navigation]}
        className="mySwiper h-[500px] md:h-[500px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative w-full h-full flex items-center px-6 md:px-16 ${slide.theme}`}
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="max-w-lg">
                <p className="text-lg font-medium mb-2">{slide.subtitle}</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <div className="w-12 h-[2px] bg-primaryGreen mb-4" />
                <p className="text-base md:text-lg mb-6">{slide.description}</p>
                <button className="bg-primaryGreen text-white px-6 py-2 rounded-md hover:bg-black transition flex items-center gap-2">
                  {slide.buttonText} <span className="text-lg">›</span>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;


