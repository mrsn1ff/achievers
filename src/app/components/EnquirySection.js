"use client";
import { useState } from "react";
import "../styles/enquiry.css";
import { FiSend, FiX } from "react-icons/fi";

export default function EnquirySection({ isOpen, onClose }) {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  // ✅ NEW: loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ NEW: success/error message
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState(""); // success | error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true); // ✅ start loading
    setStatusMessage(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatusType("success");
        setStatusMessage("Your enquiry has been submitted successfully. Our team will contact you soon.");

        setFormData({ name: "", phone: "", message: "" });

        // Auto close after 2.5 sec
        setTimeout(() => {
          onClose();
          setStatusMessage(null);
        }, 2500);

      } else {
        setStatusType("error");
        setStatusMessage("Something went wrong. Please try again.");
      }

    } catch (error) {
      setStatusType("error");
      setStatusMessage("Server error. Please try again later.");
    }

    setIsSubmitting(false); // ✅ stop loading
  };

  return (
    <div className={`enquiry-overlay ${isOpen ? "active" : ""}`}>
      <div className={`enquiry-modal ${isOpen ? "active" : ""}`}>
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>

        <div className="enquiry-container">

          {/* LEFT SIDE */}
          <div className="enquiry-left">
            <h2>
              Secure Your Seat in <span>JR Economics Achiever's Batch 2027</span>
            </h2>

            <div className="steps">
              <div className="step">
                <span>Step 1</span>
                <p>Fill Enquiry Form</p>
              </div>

              <div className="step">
                <span>Step 2</span>
                <p>Academic Counsellor Call</p>
              </div>

              <div className="step">
                <span>Step 3</span>
                <p>Institute Visit + Prospectus</p>
              </div>

              <div className="step">
                <span>Step 4</span>
                <p>₹500 Refundable Seat Lock</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="enquiry-right">
            <div className="form-card">

              <div className="form-image">
                <img src="/group.JPG" alt="Batch Students" />
              </div>

              <form className="form-fields" onSubmit={handleSubmit}>

                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting} // ✅ disable during submit
                />

                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  disabled={isSubmitting}
                />

                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                ></textarea>

                {/* ✅ Styled Status Message */}
                {statusMessage && (
                  <p className={`form-status ${statusType}`}>
                    {statusMessage}
                  </p>
                )}

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : <>Send Enquiry <FiSend /></>}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
