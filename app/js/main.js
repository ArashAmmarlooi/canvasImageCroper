let ctx; // ctx of the canvas and make in 2d module
let img; //Image itself that represnts in canvas
let imgData; // The image data that we must use in json Object
let canvasWidth; // Set the width of the canvas
let canvasHeight; //Set the height of the canvas
let imgWidth, imgHeight; //Set the weight and height of the image
let currentDegrees = 0; // initialize first value of degress for the canvas rotation
let x, y; // x and y postion of image in canvas
let sx, sy, sw, sh; // Canvas source destination and widh and hieght
let canvas; // Canvas it self
let file; // image file that get from ffile input
let string; // String variable for keeping image 64bit data and reload it for scenario 2

// Seprate image loadfunction for getting the image and put it in the canvas
function imageLoad(editorCanvas, cropCont) {
  img.onload = function () {
    canvas = editorCanvas;
    imgWidth = img.naturalWidth;
    imgHeight = img.naturalHeight;
    ctx = canvas.getContext("2d"); // Set editorCanvas ctx to ctx variable

    //set aspect ratio of canvas upon image size
    const aspectRatio = imgWidth / imgHeight;
    canvas.width = 380;
    canvas.height = canvas.width / aspectRatio;

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    // setting crop containaer and crop rea by aspect ratio of the image and canvas
    cropCont.style.height = `${canvasHeight}px`;
    cropArea.style.height = `${canvasHeight}px`;

    x = 0;
    y = 0;
    sx = 0;
    sy = 0;
    //And then draw using the recalculated height of image for destination:
    ctx.drawImage(
      img,
      sx,
      sy,
      imgWidth,
      imgHeight, // source size
      x,
      y,
      canvasWidth,
      canvasHeight
    ); // destination size
  };
}
function filePrint(fileSelector, editorCanvas, callback, cropCont, cropArea) {
  fileSelector.onchange = function (e) {
    // alert("you can zoom , scale , and rotate your printing picture and the click submit button");
    // get all selected Files from input
    const files = e.target.files;

    for (let i = 0; i < files.length; ++i) {
      file = files[i];

      // check if file is valid Image (just a MIME check)
      switch (file.type) {
        case "image/jpeg":
        case "image/png":
        case "image/gif":
          // read Image contents from file
          const reader = new FileReader();
          reader.onload = function (e) {
            // create HTMLImageElement holding image data
            img = new Image();
            img.src = reader.result;
            // Call the image load function the we declare it earlier
            imageLoad(editorCanvas, cropCont, cropArea);
          };
          reader.readAsDataURL(file);
          // process just one file.
          // call back function after 500 milsecond for enabaling the modal
          setTimeout(() => {
            callback();
          }, 500);

          return;
      }
    }
  };
}

// Function which change the postion of x valueof the image in the canvas
function changePos(count) {
  x += count;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(img, x, y, canvasWidth, canvasHeight); // destination size
}

//Function for get value of slider and change the cnvas scale
function sliderZoom(slider) {
  slider.value = 0;
  slider.min = 1;
  slider.max = 3;
  slider.step = "any";

  slider.addEventListener("input", (e) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const scale = e.target.value;
    ctx.scale(scale, scale);
    ctx.drawImage(img, x, y, canvasWidth, canvasHeight); // destination size
    ctx.scale(1 / scale, 1 / scale);
  });
}

// function getMousePos(canvasF, evt) {
//   var rect = canvasF.getBoundingClientRect();
//   return {
//     x: evt.clientX - rect.left,
//     y: evt.clientY - rect.top
//   };
// }

// // Function for moving canvas around with mouse movement to position x , y
// function canvasPos(canvasFirst) {
//   canvasFirst.addEventListener('mous', (e)  => {
//     alert('mouse dow')
//     var mousePos = getMousePos(canvasFirst, e);
//     var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
//     console.log(canvasFirst, message);
//   }, false);
// }

// Function wich particulary for getting image data and extract it as jsonObject
function imageData(e) {
  e.preventDefault();
  // Get image data if necessary
  imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  // a data URL of the current canvas image
  const canvasContents = canvas.toDataURL();
  // save image data and canavas scales and date to string for scenario 2
  const data = { image: canvasContents, date: Date.now() };
  // 64 bit string which holds image data
  string = data.image;

  //json object that keep image data
  let dataObj = {
    canvas: {
      width: canvasWidth,
      height: canvasHeight,
      photo: {
        id: file.name,
        width: imgWidth,
        height: imgHeight,
        x: x,
        y: y,
      },
    },
  };

  alert(JSON.stringify(dataObj));
}

// Function for scenario 2 , in order to review theimage that we load it earlier
function importFromJson(canvasSec) {
  let image = new Image();
  image.src = string;

  image.onload = function () {
    let context = canvasSec.getContext("2d"); // Set Canvas ctx to ctx variable
    const aspectRatio = imgWidth / imgHeight;
    canvasSec.width = 380;
    canvasSec.height = canvasSec.width / aspectRatio;

    canvasWidth = canvasSec.width;
    canvasHeight = canvasSec.height;
    context.drawImage(image, 40, 10); // destination size
  };
}

export { filePrint, sliderZoom, imageData, importFromJson, changePos };
