import React, { Component, useEffect, useState, useRef } from "react";
import { filePrint, sliderZoom } from "../../app/js/main.js";
import Modalcomp from "./modalComp.js";
import Prewcomp from "./prewComp.js";
import styles from "../../app/css/__modalComp.scss";

const Filecomp = ({ fileSelector, editorCanvas }) => {
  const [isModal, setIsModal] = useState(false);
  // An object that keeps html elements data to pass to the filerint function
  let obj ={}

  const modalToggle = isModal ? styles.modalBlock : styles.modalDisable;
  // const modalToggle = styles.modalBlock;
  const childRef = React.useRef();

  function setModal() {
    setIsModal((value) => !value);
  };

  function closeModal() {
    setIsModal((value) => !value);
  };

  // Pass element as parametrs to set Element function to fill the the object
  function setElements(cropCont, cropArea, modalCont) {
    obj.cropCont = cropCont,
    obj.cropArea = cropArea,
    obj.modalCont = modalCont
  };

  useEffect(() => {
    fileSelector = document.getElementById("fileSelector");
    let cropCont = document.getElementById("CropContainer");
    let cropArea = document.getElementById("cropArea");
    let modalCont = document.getElementById("modalContent");
    setElements(cropCont, cropArea, modalCont);
    filePrint(fileSelector, childRef.current, setModal, obj);
  }, [fileSelector, childRef]);

  useEffect(() => {
    let zoomSlide = document.getElementById("zoom-slider");
    sliderZoom(zoomSlide);
  }, [isModal]);

  return (
    <div>
      <div className={styles.header}>
        <h1 style={{ marginLeft: "30px" }}>Photo printing application</h1>
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
