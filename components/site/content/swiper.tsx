import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
type SwiperProps = {
  spaceBetween?: number;
  classesForSlide?: string;
  slidesPerView?: number;
  onSlideChange?: () => void;
  onSwiper?: (swiper: any) => void;
  data: {
    title: string;
    description?: string;
    img?: string;
  }[];
};
export const MySwiper: React.FC<SwiperProps> = ({
  spaceBetween = 50,
  classesForSlide,
  slidesPerView = 1,
  onSlideChange,
  onSwiper,
  data,
}) => {
  return (
    <Swiper
      className="h-screen"
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      onSlideChange={onSlideChange}
      onSwiper={onSwiper}
    >
      {data.map(({ title, description, img }) => (
        <>
          <SwiperSlide>
            {img ? (
              <div style={{ backgroundImage: `url("${img}")` }} className={classesForSlide}>
                <h1>{title}</h1>
                <p>{description}</p>
              </div>
            ) : (
              <div className={classesForSlide}>
                <h1>{title}</h1>
                <p>{description}</p>
              </div>
            )}
          </SwiperSlide>
        </>
      ))}
    </Swiper>
  );
};
