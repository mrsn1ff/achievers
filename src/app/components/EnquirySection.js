"use client";
import { useState } from "react";
import "../styles/enquiry.css";
import { FiSend, FiX } from "react-icons/fi";

export default function EnquirySection({ isOpen, onClose }) {

  const [formData, setFormData] = useState({
    name: "",
    className: "",
    phone: "",
    otp: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);      // ✅ NEW
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);  // ✅ NEW

  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= STEP 1: SUBMIT CLICK ================= */
  const handleInitialSubmit = async () => {

    if (isSendingOtp) return;   // ✅ prevent double click

    if (!formData.name || !formData.phone || !formData.className) {
      setStatusType("error");
      setStatusMessage("Please fill all fields.");
      return;
    }

    setIsSendingOtp(true);   // ✅ start loading
    setStatusMessage(null);

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone }),
      });

      const data = await res.json();

      if (data.success) {
        setOtpSent(true);
        setStatusType("success");
        setStatusMessage("OTP sent to your phone.");

        if (window.fbq) {
          window.fbq("track", "InitiateCheckout");
        }

      } else {
        setStatusType("error");
        setStatusMessage(data.message);
      }

    } catch {
      setStatusType("error");
      setStatusMessage("Failed to send OTP.");
    }

    setIsSendingOtp(false);   // ✅ stop loading
  };

  /* ================= STEP 2: VERIFY OTP ================= */
  const verifyOtp = async () => {

    if (isVerifyingOtp) return;   // ✅ prevent double click

    if (formData.otp.length !== 6) {
      setStatusType("error");
      setStatusMessage("Enter valid OTP.");
      return;
    }

    setIsVerifyingOtp(true);   // ✅ start verifying

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phone,
          otp: formData.otp,
        }),
      });

      const data = await res.json();

      if (data.success) {

        // ✅ Fire Lead only after success
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead");
        }

        await finalSubmit();

      } else {
        setStatusType("error");
        setStatusMessage("Invalid OTP.");
      }
    } catch {
      setStatusType("error");
      setStatusMessage("OTP verification failed.");
    }

    setIsVerifyingOtp(false);   // ✅ stop verifying
  };

  /* ================= FINAL SAVE ================= */
  const finalSubmit = async () => {

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          className: formData.className,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatusType("success");
        setStatusMessage(
          "Your enquiry has been submitted successfully."
        );

        setTimeout(() => {
          onClose();
          setFormData({ name: "", className: "", phone: "", otp: "" });
          setOtpSent(false);
        }, 2000);
      } else {
        setStatusType("error");
        setStatusMessage(data.message);
      }
    } catch {
      setStatusType("error");
      setStatusMessage("Server error.");
    }

    setIsSubmitting(false);
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

              <form className="form-fields">

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSendingOtp || isVerifyingOtp}
                />

                <select
                  name="className"
                  required
                  value={formData.className}
                  onChange={handleChange}
                  disabled={isSendingOtp || isVerifyingOtp}
                >
                  <option value="">Select Class</option>
                  <option value="Class 11th">Class 11th</option>
                  <option value="Class 12th">Class 12th</option>
                  <option value="Entrance Exam">Entrance Exam</option>
                </select>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSendingOtp || isVerifyingOtp}
                />

                {/* STEP 1 BUTTON */}
                {!otpSent && (
                  <button
                    type="button"
                    className="submit-btn"
                    onClick={handleInitialSubmit}
                    disabled={isSendingOtp}
                  >
                    {isSendingOtp ? "Submitting..." : <>Submit <FiSend /></>}
                  </button>
                )}

                {/* OTP SECTION */}
                {otpSent && (
                  <>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      maxLength={6}
                      value={formData.otp}
                      onChange={handleChange}
                      disabled={isVerifyingOtp}
                    />

                    <button
                      type="button"
                      className="submit-btn"
                      onClick={verifyOtp}
                      disabled={isVerifyingOtp}
                    >
                      {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                    </button>
                  </>
                )}

                {statusMessage && (
                  <p className={`form-status ${statusType}`}>
                    {statusMessage}
                  </p>
                )}

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}