import React, { FC, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Controller, EffectCoverflow, Mousewheel } from "swiper";
import style from "./ProductSlide.module.scss";

type Props = {
  productPic: string[];
  primaryPic: string;
};

SwiperCore.use([Pagination, Navigation, Controller, EffectCoverflow, Mousewheel]);

const ProductSlide: FC<Props> = ({ productPic, primaryPic }) => {
  const [swiper, setSwiper] = useState<any>();
  const primaryIndex = productPic.indexOf(primaryPic);

  const slideTo = (index: number) => {
    const target = index + 2;
    console.log(target);
    if (!swiper) return;
    swiper.slideTo(target);
  };

  return (
    <>
      <Swiper
        effect="coverflow"
        pagination={{ clickable: true, type: "fraction" }}
        initialSlide={primaryIndex}
        navigation={productPic.length > 1 ? true : false}
        spaceBetween={0}
        slidesPerView={1.5}
        loop={productPic.length > 1 ? true : false}
        centeredSlides={true}
        onSwiper={setSwiper}>
        {productPic.map((pic) => (
          <SwiperSlide key={pic}>
            <img src={pic} className={style.slidePic} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="module-spacer--md" />
      <div className={style.thumbsWrapper}>
        {productPic.map((pic, index) => (
          <img onClick={() => slideTo(index)} key={pic} src={pic} className={style.thumb} />
        ))}
      </div>
    </>
  );
};

export default ProductSlide;
