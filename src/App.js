import React, { Component } from "react";
import "./../app/css/main.scss";
import styles from "../app/css/__modalComp.scss";
import Filecomp from "./component/fileComp";

let fileSelector;
let editorCanvas;
const fileObject = {
  fileSelector: fileSelector,
  editorCanvas: editorCanvas,
};

const App = () => {
  return (
    <>
      <div className={styles.darkBG} />
      <Filecomp fileObject={fileObject} />
    </>
  );
};
export default App;
