let ctx; // ctx of the canvas and make in 2d module
let img; //Image itself that represnts in canvas
let imgData; // The image data that we must use in json Object
let canvasWidth; // Set the width of the canvas
let canvasHeight; //Set the height of the canvas
let imgWidth; //Set the weight of the image
let imgHeight; //Set the height of the image
let currentDegrees = 0; // initialize first value of degress for the canvas rotation
let x; // x postion of image in canvas
let y; // x postion of image in canvas
let canvas; // Canvas it
let file; // image file that get from ffile input
let string; // String variable for keeping image 64bit data and reload it for scenario 2


// Seprate image loadfunction for getting the image and put it in the canvas
function imageLoad(editorCanvas) {
  img.onload = function () {
    imgWidth = img.naturalWidth;
    imgHeight = img.naturalHeight;
    canvas = editorCanvas;
    ctx = canvas.getContext("2d"); // Set editorCanvas ctx to ctx variable
    canvas.width = 500;
    canvas.height = 400;
    canvasWidth = canvas.width;
    //Set aspect ratio for canvas image
    let aspect = imgWidth / imgHeight;
    // setCanvas height upon the image aspect ratio
    canvasHeight = canvasWidth / aspect;
    x = 0;
    y = 0;
    //And then draw using the recalculated height of image for destination:
    ctx.drawImage(
      img,
      0,
      0,
      imgWidth,
      imgHeight, // source size
      0,
      0,
      canvasWidth,
      canvasHeight
    ); // destination size
  };
}
function filePrint(fileSelector, editorCanvas, callback) {
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
            imageLoad(editorCanvas); 
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

//Function for get value of slider and change the cnvas scale
function sliderZoom(slider) {
  // slider.value = 1;
  slider.min = 0.01;
  slider.max = 2;
  slider.step = "any";

  slider.addEventListener("input", (e) => {
    // debugger
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const scale = e.target.value;
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    ctx.scale(1 / scale, 1 / scale);
  });
}

//Function for get value of slider and change the canvas Degrees
function sliderRotate(slider) {
  // slider.value = 1;
  slider.min = 0.01;
  slider.max = 2;
  slider.step = "any";
  slider.addEventListener("input", (e) => {
    // debugger
    currentDegrees += 90;
    if (currentDegrees >= 360) currentDegrees = 0;

    if (currentDegrees === 0 || currentDegrees === 180) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    } else {
      // swap
      canvas.width = canvasHeight;
      canvas.height = canvasWidth;
    }
    ctx.clearRect(0, 0, canvasWidth, canvasWidth);
    // save the unrotated ctx of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    ctx.save();
    // you want to rotate around center of canvas
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.rotate((currentDegrees * Math.PI) / 180);
    // draw the image
    // since the ctx is rotated, the image will be rotated also
    ctx.drawImage(
      img,
      -canvasWidth * 0.5,
      -canvasHeight * 0.5,
      canvasWidth,
      canvasHeight
    );
    // we’re done with the rotating so restore the unrotated ctx
    ctx.restore();
  });
}


// Function wich particulary for getting image data and extract it as jsonObject
function imageData(e) {
  e.preventDefault();
  // when sumbit button cliked image data has sent to jsonObject
  imgData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
  // a data URL of the current canvas image
  const canvasContents = canvas.toDataURL();
  // save image data and canavas scales to strinf for scenario 2
  const data = { image: canvasContents, date: Date.now() };
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
        x: 0,
        y: 0,
      },
    },
  };

  alert(JSON.stringify(dataObj));
}


// Function for scenario 2 , in order to review theimage that we load it earlier
function importFromJson(canvas) {
  let image = new Image();
  image.src = string;

  image.onload = function () {
    let context = canvas.getContext("2d"); // Set Canvas ctx to ctx variable
    canvas.width = img.width * 0.75;
    canvas.height = img.height * 0.75;
    context.drawImage(
      image,
      0,
      0,
      canvas.width,
      canvas.height
    ); // destination size
  };
}

export { filePrint, sliderZoom, imageData, sliderRotate, importFromJson };