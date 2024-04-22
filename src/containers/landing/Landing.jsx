import React, { useRef } from "react";
import { Navbar, CtaButton, CommonInput } from "./../../components";
import infinite from "./../../assets/infinite.svg";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import Exam from "../exam/Exam";

const featureList = [
  "Face Verification",
  "Multiple People Detection",
  "Voice Detection",
  "Devtools Check",
  "Full Screen Check",
  "Multiple Tabs Check",
];

const Landing = () => {
  const navigate = useNavigate();

  const joinButtonRef = useRef(null);
  if (joinButtonRef.current) {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  const handleJoinExam = () => {
    navigate("/exam");
  };

  return (
    <React.Fragment>
      <Navbar />

      <div className="section-type landing-page">
        <div className="landing-content">
          <div className="headings">
            <span className="sub-text">Advanced & Automated</span>
            <span className="main-heading gradient-text">
              Proctoring Solution
            </span>
          </div>s

          <p className="desc">
            A straightforward framework built for online proctoring to create
            online tests within minutes, <i>effortlessly</i>.
          </p>
        </div>

        <div className="landing-cta">
          <a href="/create">
            <CtaButton text="Create a test" />
          </a>

          <p className="desc">OR</p>
          <div className="input-item unique-link">
            <CommonInput placeholderText="Unique test code" />
            <span
              className="join-link"
              ref={joinButtonRef}
              onClick={handleJoinExam}
              style={{ cursor: "pointer" }}
            >
              Join
            </span>
          </div>
        </div>

        <div className="features-content">
          <div className="curr-heading">
            <p className="gradient-text">
              <b>Powerful</b> & Lightweight
            </p>
            <h2 className="title-heading">Features</h2>
          </div>
          {console.log(featureList)}
          <div className="all-features">
            {featureList.map((it) => (
              <p className="single-feature">{it}</p>
            ))}
          </div>

          <div className="mid-cta">
            <p className="phew">phew...</p>
            <a href="/create">
              <CtaButton />
            </a>
          </div>
        </div>

        <div className="final-features">
          <div className="top-sec">
            <div className="left-text">
              <h3 className="gradient-text">Effortlessly integrates with</h3>
              <h1 className="title-heading">
                Google Forms or Microsoft Surveys
              </h1>
            </div>
            <div className="infinite">
              <img src={infinite} alt="infinite" />
            </div>

            <div className="right-text">
              <h3 className="gradient-text">The best part?</h3>
              <h1 className="title-heading">Live Status on Admin Dashboard</h1>
            </div>
          </div>

          <div className="mid-cta final-cta">
            <p className="phew">
              And it’s <b>free</b>.
              <br />
              What are you waiting for?
            </p>
            <a href="/create">
              <CtaButton text="Create a test" />
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Landing;
