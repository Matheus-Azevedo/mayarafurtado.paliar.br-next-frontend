// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./swiper.css";
import Image from "next/image";

interface CarouselProps {
  histories: {
    photo: string;
    name?: string;
    title?: string;
    content: string;
  }[];
}

function Carousel({ histories }: CarouselProps) {
  return (
    <Swiper
      // install Swiper modules
      className="swiper-container"
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {histories &&
        histories.map((history, index) =>
          history.title === "Minha história..." ? (
            <SwiperSlide key={index}>
              <div className="slide-content">
                <article className="article-content">
                  <h1>{history.title}</h1>
                  <p>{history.content}</p>
                </article>
                <Image
                  src={history.photo}
                  className="photo"
                  alt="Foto de perfil"
                  width={500}
                  height={550}
                />
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide key={index}>
              <div className="slide-content">
                <Image
                  src={history.photo}
                  className="photo"
                  alt="Foto de perfil"
                  width={500}
                  height={550}
                />
                <article className="article-content">
                  <h1>{history.name}</h1>
                  <p>{history.content}</p>
                </article>
              </div>
            </SwiperSlide>
          )
        )}
    </Swiper>
  );
}

export default Carousel;
