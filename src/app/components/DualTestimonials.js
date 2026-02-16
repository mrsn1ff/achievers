"use client";
import "../styles/dualTestimonials.css";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

export default function DualTestimonials() {
  const testimonials = [
    {
      name: "Chehak Goel",
      text: "The conceptual clarity in Micro & Macro Economics was outstanding. My answer presentation improved significantly."
    },
    {
      name: "Divya Singhal",
      text: "Revision sessions and structured answer writing practice completely transformed my preparation."
    },
    {
      name: "Khushika Singh",
      text: "Live classes were highly interactive. Every doubt was cleared instantly which strengthened my understanding deeply."
    },
    {
      name: "Tanmay Jain",
      text: "Worksheets and regular feedback improved my consistency throughout the academic year."
    },
    {
      name: "Archi Garg",
      text: "The guidance and exam strategy helped me score confidently in board examinations."
    },
    {
      name: "Shalini Sharma",
      text: "Answer writing framework and time management techniques made a huge difference."
    }
  ];

  const loopData = [...testimonials, ...testimonials];

  return (
    <section className="dual-testimonials-section">
      <div className="dual-testimonials-container">
        <h2 className="dual-title">
          <span>3000+ Students </span> Scored <span>90+ Marks</span> in Economics for <br className="break"/><span>JR Economics Achiever's Batch</span>
        </h2>

        {/* Row 1 - Left Moving */}
        <div className="marquee">
          <div className="marquee-track left">
            {loopData.map((item, index) => (
              <div className="testimonial-card" key={index}>
                <BiSolidQuoteAltLeft className="quote-icon" />
                <p>{item.text}</p>
                <h4>{item.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right Moving */}
        <div className="marquee">
          <div className="marquee-track right">
            {loopData.map((item, index) => (
              <div className="testimonial-card" key={index}>
                <BiSolidQuoteAltLeft className="quote-icon" />
                <p>{item.text}</p>
                <h4>{item.name}</h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
