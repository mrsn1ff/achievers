"use client";
import "../styles/coursePackages.css";
import { FaStar } from "react-icons/fa";
import { FiPhoneCall, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import { useState, useEffect } from "react";


export default function CoursePackages({ onEnquiryClick }) {

    return (
        <section className="course-section" id="course-section">
            <div className="course-container">

                <h2 className="course-title">
                    JR Economics Achiever's Batch 2027 Course Packages
                </h2>

                {/* ACTION BUTTONS */}
                <div className="course-actions">

                    <button className="enquiry-btn" onClick={() => {
                        if (window.fbq) {
                            window.fbq("trackCustom", "ContactClick");
                        }
                        onEnquiryClick();
                    }}>
                        <FiSend className="btn-icon" />
                        Course Enquiry
                    </button>

                    {/* CALL BUTTON */}
                    <a href="tel:+918802666661" className="icon-btn call-btn">
                        <FiPhoneCall />
                    </a>

                    {/* WHATSAPP BUTTON */}
                    <a
                        href="https://wa.me/918802666661"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-btn whatsapp-btn"
                    >
                        <FaWhatsapp />
                    </a>

                </div>


                <div className="course-card">

                    {/* IMAGE TOP */}
                    <div className="course-image">
                        <img src="/group.JPG" alt="Achiever Course" />
                        <div className="course-image-overlay">
                            <span>Achiever's Course</span>
                        </div>
                    </div>

                    {/* CONTENT BELOW IMAGE */}
                    <div className="course-content">

                        <div className="course-header">
                            <h3>CBSE Class 12 Economics – Batch 2027</h3>
                            <div className="rating">
                                <FaStar /> 4.9
                            </div>
                        </div>

                        {/* SCROLLABLE FEATURES */}
                        <div className="course-features">
                            <p>✓ Complete CBSE Class 12 Syllabus Coverage</p>
                            <p>✓ Concept-Focused LIVE Classes</p>
                            <p>✓ Weekly Tests & Answer Writing Practice</p>
                            <p>✓ Topic-wise Assignments & Worksheets</p>
                            <p>✓ Doubt Support & Revision Sessions</p>
                            <p>✓ Case Study & HOTS Questions Practice</p>
                            <p>✓ Board Exam Strategy Sessions</p>
                            <p>✓ Answer Writing Framework</p>
                            <p>✓ Final 60 Days Crash Revision Program</p>
                        </div>

                        <div className="course-footer">
                            <div className="price">
                                <h4>₹26,999</h4>
                                <span>₹31,999</span>
                            </div>

                            <button className="details-btn" onClick={() => {
                                if (window.fbq) {
                                    window.fbq("trackCustom", "ContactClick");
                                }
                                onEnquiryClick();
                            }}>Details</button>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
