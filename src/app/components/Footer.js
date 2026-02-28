"use client";
import "../styles/footer.css";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

export default function Footer() {

  // ✅ smooth scroll helper
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* COLUMN 1 - BRAND */}
        <div className="footer-col brand">
          <h2>JR Economics</h2>
          <p>
            JR Economics Achiever's Batch 2027 is dedicated to helping
            Class 12th CBSE students score 90+ marks with structured
            preparation, tests & answer writing mastery.
          </p>

          <div className="social-icons">
            <a
              href="https://www.instagram.com/economics_matlab_jatinrajpal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.youtube.com/@EconomicsbyJatinRajpal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>

            <a
              href="https://wa.me/918802666661"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* COLUMN 2 - QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              About Us
            </li>

            <li onClick={() => scrollToId("why-choose")}>
              Why Choose Us
            </li>

            <li onClick={() => scrollToId("course-section")}>
              Course Packages
            </li>

            <li onClick={() => scrollToId("course-section")}>
              Free Counselling
            </li>
          </ul>
        </div>

        {/* COLUMN 3 - COURSES */}
        <div className="footer-col">
          <h3>Our Course</h3>
          <ul>
            <li onClick={() => scrollToId("course-section")}>
              CBSE Class 12 Economics
            </li>

            <li onClick={() => scrollToId("course-section")}>
              Achiever's Batch 2027
            </li>

            <li onClick={() => scrollToId("course-section")}>
              Crash Revision Program
            </li>

            <li onClick={() => scrollToId("course-section")}>
              Answer Writing Framework
            </li>

            <li onClick={() => scrollToId("course-section")}>
              Test Series
            </li>
          </ul>
        </div>

        {/* COLUMN 4 - CONTACT */}
        <div className="footer-col">
          <h3>Contact Us</h3>

          <div className="contact-item">
            <FaPhoneAlt />
            <a href="tel:+919876543210">+91 8802666661</a>
          </div>

          <div className="contact-item">
            <FiMail />
            <a href="mailto:support@jrclasses.live">
              support@jrclasses.live
            </a>
          </div>

          <div className="contact-item">
            <FaMapMarkerAlt />
            <span>Delhi NCR, India</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} JR Economics Achiever's Batch 2027. All Rights Reserved.
      </div>
    </footer>
  );
}   