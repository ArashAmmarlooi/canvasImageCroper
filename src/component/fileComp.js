import React, { Component, useEffect, useState, useRef } from "react";
import {
  filePrint,
  sliderZoom,
  sliderRotate,
  importFromJson,
} from "../../app/js/main.js";
import Modalcomp from "./modalComp.js";
import Prewcomp from "./prewComp.js";
import styles from "../../app/css/__modalComp.scss";

const Filecomp = ({ fileSelector, editorCanvas }) => {
  const [isModal, setIsModal] = useState(false);
  const modalToggle = isModal ? styles.modalBlock : styles.modalDisable;
  // const modalToggle = styles.modalBlock;
  const childRef = React.useRef();

  function setModal() {
    setIsModal((value) => !value);
  }

  function closeModal() {
    setIsModal((value) => !value);
  }

  useEffect(() => {
    fileSelector = document.getElementById("fileSelector");
    let cropCont = document.getElementById("CropContainer")
    let cropArea = document.getElementById("cropArea")

    filePrint(fileSelector, childRef.current, setModal, cropCont, cropArea);
  }, [fileSelector, childRef]);

  useEffect(() => {
    let zoomSlide = document.getElementById("zoom-slider");
    let rotateSlide = document.getElementById("rotate-slider");
    sliderZoom(zoomSlide);
    sliderRotate(rotateSlide);
  }, [isModal]);

  return (
    <div>
      <div className={styles.header}>
        <h1 style={{marginLeft: '30px'}}>Photo printing application</h1>
        <div className={styles.inputDiv}>
          <div className={styles.inputCont}>
            <p>Import image from your device</p>
            <div className={styles.selectorDiv}>
              <label for="fileSelector">upload</label>
              <input type="file" id="fileSelector" />
            </div>
          </div>

          <div className={styles.importDiv}>
            <Prewcomp />
          </div>
        </div>
      </div>
      <Modalcomp
        ref={childRef}
        modalToggle={modalToggle}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Filecomp;
