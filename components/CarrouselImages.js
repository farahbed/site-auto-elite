// components/CarrouselImages.jsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CarrouselImages({ images }) {
  const slides = Array.isArray(images) ? images : [];

  if (slides.length === 0) {
    return (
      <div className="w-full max-w-screen-lg mx-auto mb-8">
        <img
          src="https://via.placeholder.com/1920x600?text=Pas+d'image"
          alt="Pas de photo"
          className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-contain rounded"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-screen-lg mx-auto mb-8">
      {/* Swiper avec pagination par défaut */}
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        className="overflow-hidden rounded-lg"
      >
        {slides.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Photo ${idx + 1}`}
              className="w-full h-[450px] md:h-[550px] lg:h-[650px] object-contain bg-overlay"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Flèches */}
      <button
        className="swiper-button-prev-custom absolute top-1/2 left-2 -translate-y-1/2 z-20 p-2 bg-overlay/50 rounded-full hover:bg-overlay/70 transition"
      >
        <ChevronLeft className="w-6 h-6 text-text" />
      </button>
      <button
        className="swiper-button-next-custom absolute top-1/2 right-2 -translate-y-1/2 z-20 p-2 bg-overlay/50 rounded-full hover:bg-overlay/70 transition"
      >
        <ChevronRight className="w-6 h-6 text-text" />
      </button>
    </div>
  );
}