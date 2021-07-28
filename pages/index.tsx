import React, { FC } from "react";
import Head from "next/head";
import style from "styles/pages/index.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Controller, EffectFade, Mousewheel, Autoplay } from "swiper";
import PrimaryButton from "components/UIkit/button/PrimaryButton";
import { useRouter } from "next/router";
import Image from "next/image";

SwiperCore.use([Pagination, Navigation, Controller, EffectFade, Mousewheel, Autoplay]);

const Top: FC = () => {
  const router = useRouter();

  const swiperPic = [
    "/nathan-dumlao-43wvIhzBUBE-unsplash.jpg",
    "/brad-stallcup-CIVtut098MI-unsplash.jpg",
    "/kermit-2687975_1280.jpg",
    "/bear-1272796_1920.jpg",
  ];

  return (
    <>
      <Head>
        <title>Yuruhuwa 【TOP】</title>
        <meta name="twitter:card" content="summary"></meta>
        <meta name="twitter:site" content="@Patao_program"></meta>
        <meta name="twitter:creator" content="@Patao_program"></meta>
        <meta property="og:title" content="ぬいぐるみショップ Yuruhuwa" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blush-toy-shop.herokuapp.com/" />
        <meta property="og:image" content="https://blush-toy-shop.herokuapp.com/public/shopLogo.jpg" />
        <meta property="og:site_name" content="Yuruhuwa" />
        <meta property="og:description" content="個人開発で、ぬいぐるみショップつくってみた！" />
      </Head>
      <div className={style.swipperWrapper}>
        <Swiper
          effect="slide"
          pagination={{ clickable: true }}
          navigation={swiperPic.length > 1 ? true : false}
          spaceBetween={0}
          slidesPerView={1.3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          speed={500}
          loop={swiperPic.length > 1 ? true : false}
          centeredSlides={true}>
          {swiperPic.map((pic) => (
            <SwiperSlide key={pic}>
              <img src={pic} alt="ぬいぐるみの写真" className={style.slidePic} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="module-spacer--sm" />
      <div>
        <h1 className={style.shopTitle}>
          ぬいぐるみショップ <span>Yuruhuwa</span>{" "}
        </h1>
        <div className="module-spacer--md" />
        <div className={style.productsBtn}>
          <PrimaryButton content="ぬいぐるみを探す" onClick={() => router.push("/products")} />
        </div>
        <div className="module-spacer--xl" />
      </div>
      <p className="u-text--center">
        <a href="https://twitter.com/Patao_program">製作者Twitter</a>
      </p>
      <div className="module-spacer--xl" />
    </>
  );
};

export default Top;
