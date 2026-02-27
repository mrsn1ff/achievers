"use client";

import { useState, useEffect, useRef } from "react";

import Hero from "../app/components/Hero";
import TopperCarousel from "../app/components/ToppersCarousel";
import WhyChoose from "../app/components/WhyChoose";
import DualTestimonials from "./components/DualTestimonials";
import CoursePackages from "./components/CoursePackages";
import EnquirySection from "./components/EnquirySection";
import Footer from "./components/Footer";

export default function Home() {

  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);   // ✅ NEW

  const courseRef = useRef(null);
  const resultRef = useRef(null);

  const scrollToCourse = () => {
    courseRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToResult = () => {
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // ✅ UPDATED: Auto open only if video not open
  useEffect(() => {
    const interval = setInterval(() => {
      if (!openVideo) {   // ✅ Prevent enquiry if video open
        setOpenEnquiry(true);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [openVideo]);

  return (
    <>
      <Hero
        onEnquiryClick={() => setOpenEnquiry(true)}
        onExploreClick={scrollToCourse}
        onResultsClick={scrollToResult}
        onVideoClick={() => setOpenVideo(true)}   // ✅ NEW
      />

      <WhyChoose />
      <TopperCarousel />

      <div ref={resultRef}>
        <DualTestimonials />
      </div>

      <div ref={courseRef}>
        <CoursePackages onEnquiryClick={() => setOpenEnquiry(true)} />
      </div>

      {/* ✅ VIDEO POPUP */}
      {openVideo && (
        <div className="video-modal">
          <div className="video-modal-content">
            <span
              className="close-video"
              onClick={() => setOpenVideo(false)}
            >
              ✕
            </span>
            <video
              src="/video.mp4"
              controls
              autoPlay
              className="popup-video"
            />
          </div>
        </div>
      )}

      <EnquirySection
        isOpen={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
      />

      <Footer />
    </>
  );
}