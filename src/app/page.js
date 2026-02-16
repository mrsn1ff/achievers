"use client";

import { useState, useEffect, useRef } from "react";

import Hero from "../app/components/Hero";
import TopperCarousel from "../app/components/ToppersCarousel";
import WhyChoose from "../app/components/WhyChoose";
import DualTestimonials from "./components/DualTestimonials";
import CoursePackages from "./components/CoursePackages";
import EnquirySection from "./components/EnquirySection";

export default function Home() {

  const [openEnquiry, setOpenEnquiry] = useState(false);

  // ✅ REFS
  const courseRef = useRef(null);
  const resultRef = useRef(null);

  // ✅ SCROLL FUNCTIONS
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

  // Auto open every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOpenEnquiry(true);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Hero
        onEnquiryClick={() => setOpenEnquiry(true)}
        onExploreClick={scrollToCourse}
        onResultsClick={scrollToResult}
      />

      <WhyChoose />
      <TopperCarousel />

      {/* ✅ RESULT SECTION WRAPPED */}
      <div ref={resultRef}>
        <DualTestimonials />
      </div>

      {/* ✅ COURSE SECTION WRAPPED */}
      <div ref={courseRef}>
        <CoursePackages onEnquiryClick={() => setOpenEnquiry(true)} />
      </div>

      <EnquirySection
        isOpen={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
      />
    </>
  );
}
