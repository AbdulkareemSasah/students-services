import { Swiper, SwiperSlide } from "swiper/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

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
const MySwiper: React.FC<SwiperProps> = ({
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
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md">{title}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>
                  {description}
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Link
                  isExternal
                  showAnchorIcon
                  href="https://github.com/nextui-org/nextui"
                >
                  Visit source code on GitHub.
                </Link>
              </CardFooter>
            </Card>
          </SwiperSlide>
        </>
      ))}
    </Swiper>
  );
};
export default MySwiper