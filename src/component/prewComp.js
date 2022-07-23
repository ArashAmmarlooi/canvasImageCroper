import React, { Component, useEffect, useState, useRef } from "react";
import {
  filePrint,
  sliderZoom,
  sliderRotate,
  importFromJson,
} from "../../app/js/main.js";
import styles from "../../app/css/__prewComp.scss";

const Prewcomp = ({ fileSelector, editorCanvas }) => {
  const [isModal, setIsModal] = useState(false);
  const modalToggle = isModal ? styles.modalBlock : styles.modalDisable;

  function previewImg() {
    const showCanvas = document.getElementById("showCanvas");
    setTimeout(() => {
      setIsModal((value) => !value);
      importFromJson(showCanvas);
    }, 500);
  }
  function closeMod() {
    setIsModal((value) => !value);
  }

  return (
    <div>
      <div className={styles.importDiv}>
        <label for="fileSelector">view the image that selectet</label>
        <button onClick={previewImg} style={{ width: "20%" }} id="fileImport">
          preview
        </button>
      </div>
      <div className={modalToggle}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <p>preview image</p>
            <span onClick={closeMod}>x</span>
          </div>
          <div className={styles.modalBody}>
            <canvas id="showCanvas" className={styles.editorCanvas}></canvas>
            <div className={styles.cropArea}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prewcomp;
