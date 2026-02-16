import "../styles/whychoose.css";

export default function WhyChoose() {
  const features = [
    {
      title: "Concept-Focused LIVE Classes",
      desc: "Learn Class 12 Economics through interactive live sessions designed to build strong conceptual clarity in Micro & Macro Economics, with real-life examples and exam-oriented explanations.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17 10.5V6c0-1.1-.9-2-2-2H5C3.9 4 3 4.9 3 6v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4.5l4 4v-11l-4 4z" />
        </svg>
      ),
    },
    {
      title: "Complete CBSE Syllabus Coverage",
      desc: "Step-by-step coverage of the full Class 12 Economics syllabus including Indian Economic Development and Macro Economics, aligned with the latest CBSE pattern and marking scheme.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M3 4h18v2H3V4zm0 4h18v2H3V8zm0 4h12v2H3v-2zm0 4h12v2H3v-2z" />
        </svg>
      ),
    },
    {
      title: "Regular Tests & Answer Writing Practice",
      desc: "Weekly tests, case-study questions, and structured answer-writing practice to help students score maximum marks in board examinations with proper presentation and time management.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M10 4H4v16h16V8h-6V4zm2 0v4h4l-4-4z" />
        </svg>
      ),
    },
    {
      title: "Doubt Support & Revision Sessions",
      desc: "Dedicated doubt-clearing sessions, quick revision classes, and important question discussions to ensure complete confidence before the Class 12 board exams.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm1.07-7.75l-.9.92A3.49 3.49 0 0012 13h-2v-.5c0-.83.34-1.58.88-2.12l1.24-1.26a1.5 1.5 0 10-2.12-2.12L8.7 7.3 7.28 5.88l1.3-1.3a3.5 3.5 0 114.95 4.95z" />
        </svg>
      ),
    },
  ];


  return (
    <section className="whychoose-section">
      <div className="whychoose-container">
        <h2 className="whychoose-title">
          Why Choose US JR CLASSES ?
        </h2>

        <div className="whychoose-grid">
          {features.map((item, i) => (
            <div key={i} className="whychoose-card">
              <div className="whychoose-header">
                <div className="whychoose-icon">{item.icon}</div>
                <h3>{item.title}</h3>
              </div>

              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
