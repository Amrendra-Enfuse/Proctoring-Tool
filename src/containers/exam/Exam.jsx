import React, { useState, useEffect } from "react";
import { Timer, WebLiveCapture } from "./../../components";
import "./exam.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Exam = ({
  examName = "Periodic Test - DBMS: 20th January, 2022",
  studentID = "1902112",
  studentEmail = "tusharnankani3@gmail.com",
  duration = 60,
  formLink = "https://forms.gle/iYtwmvauP2c19mi16",
}) => {
  function captureCheck() {
    let btn = document.querySelector(
      "#root > div > div > div.left-column > div.image-capture > button"
    );
    btn.click();
  }

  function check() {
    if (!window.screenTop && !window.screenY && isFullScreen) {
      setIsFullScreen(false);
    }

    if (!isFullScreen) {
      setWarningCnt(warningCnt + 1);
      setShowMessage(
        "Your exam will terminate. Please go to full screen mode."
      );
      disableForm();
    } else {
      enableForm();
    }

    if (warningCnt >= 3) {
      navigate("/");
    }
  }

  let overlay = document.getElementById("overlay");
  let formBlur = document.getElementById("form-blur");

  function disableForm() {
    overlay.classList.remove("hide");
    overlay.classList.add("disable");
    formBlur.classList.add("blur");
  }

  function enableForm() {
    overlay.classList.add("hide");
    overlay.classList.remove("disable");
    formBlur.classList.remove("blur");
  }

  function terminateExam() {
    if (warningCnt > 5) {
      disableForm();
      overlay.classList.add("terminate");
    }
  }

  const [warningCnt, setWarningCnt] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [showMessage, setShowMessage] = useState("");
  const navigate = useNavigate();
  const [pageVisible, setPageVisible] = useState(true);
  const [navigationInitiated, setNavigationInitiated] = useState(false);
  formLink += "?embedded=true";

  setInterval(check, 5000);

  setInterval(captureCheck, 5000);

  useEffect(() => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }

    return () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !navigationInitiated) {
        setPageVisible(false);
        setNavigationInitiated(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [navigationInitiated]);

  useEffect(() => {
    if (!pageVisible && navigationInitiated) {
      toast.info("You have opened another window. Redirecting to home...", {
        onClose: () => {
          navigate("/");
        },
        pauseOnHover: true,
        draggable: false,
        closeOnClick: true,
      });
    }
  }, [pageVisible, navigationInitiated, navigate]);

  useEffect(() => {
    if (warningCnt >= 4) {
      alert("You have exceeded the warning limit.");
      navigate("/");
    }
  }, [warningCnt, navigate]);

  return (
    <div className="exam-container">
      <div className="left-column">
        <div className="image-capture">
          <WebLiveCapture />
        </div>
        <div className="exam-details">
          <h3 className="title-heading">Student Details</h3>
          <div className="details">
            <h4 className="student-id">Student ID: {studentID}</h4>
            <h4 className="student-email">Student Email: {studentEmail}</h4>
          </div>
        </div>
      </div>

      <div className="embedded-form">
        <div className="hide" id="overlay">
          <h2>Warning: {warningCnt}</h2>
          <h2>Message: {showMessage}</h2>
        </div>
        <div className="form" id="form-blur">
          <h2 className="title-heading">{examName}</h2>
          <iframe title={examName} className="form-link" src={formLink}>
            Form
          </iframe>

          <div className="responsive-message">
            <h1>Please join via a Laptop/PC for best performance</h1>
          </div>
        </div>
      </div>

      <div className="timer">
        <Timer initialMinute={duration} />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Exam;
