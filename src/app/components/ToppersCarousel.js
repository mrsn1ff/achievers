"use client";

import { useState } from "react";
import "../styles/toppers.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function ToppersCarousel() {
  const [activeVideo, setActiveVideo] = useState(null);

  const toppers = [
    {
      name: "Archi Garg",
      percentile: "100%iler",
      img: "/archi.JPG",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      name: "Chehak Goel",
      percentile: "100%iler",
      img: "/chehak.JPG",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      name: "Divya Singhal",
      percentile: "100%iler",
      img: "/divya.JPG",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      name: "Harshika Gupta",
      percentile: "100%iler",
      img: "/harshika.JPG",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      name: "Khushika Singh",
      percentile: "100%iler",
      img: "/khushika.JPG",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  return (
    <>
      <section className="toppers-section">
        <div className="toppers-container">
          <div className="toppers-header">
            <h2 className="toppers-title">
              Achievers of Class 12th Economics: Success Stories & Results
            </h2>
          </div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={4}
            loop={true}
            speed={9000}                 // slow smooth movement
            autoplay={{
              delay: 0,                  // NO pause → continuous scroll
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {toppers.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="topper-card">
                  <img src={t.img} alt={t.name} className="topper-img" />

                  {/* CBSE Badge */}
                  <div className="cbse-badge"><i>CBSE</i></div>

                  {/* ▶ Play button */}
                  <div
                    className="play-btn"
                    onClick={() => setActiveVideo(t.video)}
                  >
                    ▶
                  </div>

                  <div className="topper-overlay">
                    <div className="overlay-content">
                      <div className="percentile">{t.percentile}</div>
                      <div className="name"><i>{t.name}</i></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

            ))}
          </Swiper>
        </div>
      </section>

      {/* 🎬 Video Modal */}
      {activeVideo && (
        <div className="video-modal" onClick={() => setActiveVideo(null)}>
          <div
            className="video-content"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={activeVideo + "?autoplay=1"}
              title="Student Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
