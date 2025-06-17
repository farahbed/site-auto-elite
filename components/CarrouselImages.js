"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css"; "swiper/css/navigation"; "swiper/css/pagination";

export default function CarrouselImages({ images }) {
  const valid = Array.isArray(images)
    ? images.filter(u => typeof u === 'string' && u.startsWith("http"))
    : [];

  if (valid.length === 0) {
    return <img src="https://via.placeholder.com/800x500?text=Pas+d'image"
                alt="Pas d'image" className="w-full h-64 object-cover"/>;
  }
  return (
    <Swiper modules={[Navigation,Pagination]} slidesPerView={1} navigation pagination={{clickable:true}}>
      {valid.map((url,i) => (
        <SwiperSlide key={i}>
          <img src={url} alt={`photo-${i}`} className="w-full h-64 object-cover"/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}