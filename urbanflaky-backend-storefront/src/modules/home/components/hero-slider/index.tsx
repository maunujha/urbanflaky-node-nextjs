"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const slides = [
  {
    id: 1,
    image: "/images/slide1.jpg",
    title: "Urban Flaky Collection",
    subtitle: "Minimal. Bold. Street Ready.",
    button: "Shop Now",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    title: "New Season Drop",
    subtitle: "Premium Cotton T-Shirts",
    button: "Explore",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    title: "Limited Edition",
    subtitle: "Designed for Everyday Hustle",
    button: "View Collection",
  },
]

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[500px] md:h-[650px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content */}
              <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mb-6">
                  {slide.subtitle}
                </p>
                <button className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition">
                  {slide.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}