import React, { useState, useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Certificate() {
  const [name, setName] = useState("SUMIT KUMAR");
  const [course, setCourse] = useState("CYBER SECURITY");

  const ref = useRef();
  const onButtonClick = useCallback(
    (e) => {
      e.preventDefault();
          toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
              const link = document.createElement("a");
              link.download = `${name}-${course}_Certificate.png`;
              link.href = dataUrl;
              link.click();
            })
            .catch((error) => {
              console.error("oops, something went wrong!", error);
            });
    },
    [ref, name, course]
  );

    const downloadPDF = () => {
      html2canvas(ref.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", "a4", true);
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save(`${name}-${course}_Certificate.pdf`);
      });
    };
  

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Certificate</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          style={{ padding: "5px" }}
        />
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Enter Course Name"
          style={{ padding: "5px", marginLeft: "10px" }}
        />
      </div>
      <br />
      <div>
        <div
          ref={ref}
          className="certificate"
          style={{
            border: "2px solid black",
            height: "500px",
            width: "900px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            fontFamily: "Roboto",
            position: "relative",
          }}
        >
          <img
            src="/badge.png"
            alt="badge"
            style={{
              width: "100px",
              height: "100px",
            }}
          />
          <h1>{name}</h1>
          <span style={{ marginBottom: "10px" }}>
            has successfully achieved the certification
          </span>
          <span style={{ fontSize: "32px", fontWeight: "bold" }}>{course}</span>
          <div>
            <p>Date of Achievement: April 23, 2024</p>
            <p>Certificate Number: 20240422SUM</p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            style={{
              padding: "10px",
              background: "green",
              cursor: "pointer",
              color: "white",
              borderRadius: "5px",
            }}
            onClick={onButtonClick}
          >
            Download Certificate
          </button>
          <button
            style={{
              padding: "10px",
              background: "blue",
              cursor: "pointer",
              color: "white",
              borderRadius: "5px",
            }}
            onClick={downloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
}
