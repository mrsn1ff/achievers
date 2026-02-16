import "../styles/hero.css";
import { FaArrowRight } from "react-icons/fa";


export default function Hero({ onEnquiryClick, onExploreClick , onResultsClick }) {

    return (
        <section className="hero">
            <div className="hero-overlay"></div>

            <div className="hero-wrapper">

                {/* LEFT CONTENT */}
                <div className="hero-left fade-in">
                    <h1 className="glow-text">
                        Class 12th Economics <br className="break" />

                        <span>2027 Course</span>

                    </h1>

                    <h3 className="glow-text">
                        <span> 1 Year Study Plan for CBSE Economics Class 12th Preparation</span>
                    </h3>

                    <p className="hero-description">
                        Join JR Economics Achiever's Batch 2027 Offline Course with a focused 1-year study plan designed fro Complete CBSE Economics Class 12th Preparations. Offline Classes, Test Series, Worksheet Based Classes, Doubt Support to Achieve 100% Marks in Board Exams.
                    </p>

                    <div className="hero-buttons">
                        <button className="primary-btn" onClick={onExploreClick}>Explore Courses</button>
                        <button
                            className="secondary-btn"
                            onClick={onEnquiryClick}
                        >
                            Free Counselling
                        </button>

                    </div>


                </div>

                {/* RIGHT CONTENT */}
                <div className="hero-right slide-in">
                    <div className="video-card">
                        <div className="video-thumbnail">
                            <img src="/jatin.PNG" alt="Video Thumbnail" />
                            <div className="play-button">▶</div>
                        </div>
                    </div>

                    <div className="hero-buttons-mobile">
                        <button className="primary-btn" onClick={onExploreClick}    >Explore Courses</button>
                        <button
                            className="secondary-btn"
                            onClick={onEnquiryClick}
                        >
                            Free Counselling
                        </button>

                    </div>

                    <div className="stats">
                        <div className="stat-box float">
                            <h2>50,000+</h2>
                            <p>Students Mentored</p>
                        </div>

                        <div className="stat-box float delay-1">
                            <h2>600+</h2>
                            <p>99%ilers</p>
                        </div>

                        <div className="stat-box float delay-2">
                            <h2>9 Years</h2>
                            <p>Proven Results</p>
                        </div>
                    </div>

                    <div className="results ">
                        <div className="avatars">
                            <img src="/rudrakshi.JPG" alt="" />
                            <img src="/shalini.JPG" alt="" />
                            <img src="/divya.JPG" alt="" />
                            <img src="/khushika.JPG" alt="" />
                            <img src="/tanmay.JPG" alt="" />
                            <img src="/archi.JPG" alt="" />
                            <img src="/chehak.JPG" alt="" />
                        </div>
                        <div className="check-result" onClick={onResultsClick}>
                            <p>Check Our Results </p><FaArrowRight />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
