import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/effect-coverflow';
import './DrinksCarousel.css';

const drinks = [
  { id: 1, name: "Red Wine", image: "images/pub.jpg", price: "₵45" },
  { id: 2, name: "Whiskey", image: "images/pub2.jpg", price: "₵60" },
  { id: 3, name: "Cocktail", image: "images/pub3.png", price: "₵35" },
  { id: 4, name: "Beer", image: "images/pub.jpg", price: "₵20" },
  { id: 5, name: "Champagne", image: "images/pub2.jpg", price: "₵75" },
  { id: 6, name: "Red Wine", image: "images/pub.jpg", price: "₵45" },
  { id: 7, name: "Whiskey", image: "images/pub2.jpg", price: "₵60" },
  { id: 8, name: "Cocktail", image: "images/pub3.png", price: "₵35" },
  { id: 9, name: "Beer", image: "images/pub.jpg", price: "₵20" },
  { id: 10, name: "Champagne", image: "images/pub2.jpg", price: "₵75" },
];
function drinksCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative px-4 md:px-8 py-16 overflow-x-hidden">
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        coverflowEffect={{
          rotate: 25,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="drinks-swiper"
        style={{ perspective: '2000px' }}
      >
        {drinks.map((drink) => (
          <SwiperSlide 
            key={drink.id}
            style={{ width: '35%', maxWidth: '400px' }}
          >
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={drink.image} 
                  alt={drink.name}
                  className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Price tag */}
                <div className="absolute top-5 right-5 bg-gradient-to-br from-amber-500 to-amber-600 text-white text-lg font-bold px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-sm">
                  {drink.price}
                </div>
                
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-xl font-bold tracking-wide drop-shadow-lg">
                    {drink.name}
                  </h3>
                </div>
              </div>
              
              {/* Reflection effect */}
              <div className="absolute -bottom-2 left-0 right-0 h-16 opacity-20 blur-xl bg-gradient-to-b from-black/30 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default drinksCarousel;
