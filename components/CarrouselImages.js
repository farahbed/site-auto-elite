// components/CarrouselImages.js
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function CarrouselImages({ images }) {
  const arr = Array.isArray(images)
    ? images
    : typeof images === "string"
      ? [images]
      : [];

  if (arr.length === 0) {
    return (
      <img
        src="https://via.placeholder.com/800x500?text=Pas+d'image"
        alt="placeholder"
        className="w-full h-64 object-cover rounded mb-6"
      />
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation      // ← active les flèches
      className="mb-6 rounded overflow-hidden"
    >
      {arr.map((src, i) => (
        <SwiperSlide key={i}>
          <img src={src} alt={`photo-${i}`} className="w-full h-64 object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}