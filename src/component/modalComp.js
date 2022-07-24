import React, { Component, useEffect, forwardRef } from "react";
import { imageData, changePos } from "../../app/js/main.js";
import styles from "../../app/css/__modalComp.scss";
import Arrowright from "./../../doc/arrowright.svg";
import Arrowleft from "./../../doc/arrowleft.svg";

const Filecomp = React.forwardRef((props, ref) => {
  // imageData();

  function closeMod() {
    props.closeModal();
  }

  return (
    <>
      <div className={props.modalToggle}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <p>Edit image</p>
            <span onClick={closeMod}>x</span>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.imageCropContainer} id="CropContainer">
              <img
                onClick={() => changePos(1)}
                src={Arrowright}
                className={styles.arrowRight}
              />
              <img
                onClick={() => changePos(-1)}
                src={Arrowleft}
                className={styles.arrowLeft}
              />
              <div className={styles.cropArea} id="cropArea">
                <canvas
                  id="editorCanvas"
                  className={styles.editorCanvas}
                  ref={ref}
                ></canvas>
              </div>
            </div>
            <span className={styles.sliderSpan}>
              <label>zoom</label>
              <input id="zoom-slider" type="range"></input>
            </span>
          </div>
          <div className={styles.modalFooter}>
            <button
              className={styles.submitBtn}
              type="submit"
              onClick={imageData}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default Filecomp;
