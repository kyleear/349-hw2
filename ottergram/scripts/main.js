var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
//we set this to the main big picture
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail'; 
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var PREV_BUTTON_SELECTOR = '[data-button-title="prev"]';
var NEXT_BUTTON_SELECTOR = '[data-button-title="next"]';

var  currentImg = '[data-image-role="target"]';
var isClicked = false;

// set the detail image and title
function setDetails(imageUrl, titleText) {
    'use strict';
    isClicked = true;
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    //later will be used for changing thumbnail image
    detailImage.setAttribute('src', imageUrl);
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    //changing thumbnail text
    detailTitle.textContent = titleText;
  }
  
  function imageFromThumb(thumbnail) {
    'use strict';
    currentImg = thumbnail.getAttribute('data-image-url');
    return thumbnail.getAttribute('data-image-url'); 
  }
  
  function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
  }
  


  function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
    //gets data-image-url tag which is what is labeled in all the pictures and returns it

  }


    function showDetails() { 
        'use strict';
        var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
        document.body.classList.remove(HIDDEN_DETAIL_CLASS);
        frame.classList.add(TINY_EFFECT_CLASS); //add the transition to frame(big image)
        setTimeout(function () {
          frame.classList.remove(TINY_EFFECT_CLASS); //remove it after a certain amount of time
        }, 50);
      }

  function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function(event) {
         event.preventDefault(); 
       setDetailsFromThumb(thumb);
       showDetails(); //after you esc and click on a thumbnail, the big picture will pop up again
    });
  }
  
  function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR); //returns all a tags
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
  }

  
  
  function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
    //Its job is to add a class name to the <body> element. You will use the classList.add DOM method to manipulate the class name
  }
  
  
  function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function(event) {
      event.preventDefault();
      console.log(event.keyCode);
      if (event.keyCode === ESC_KEY) { //seeing if the button we pressed is equal to esc key 27 that we set at the top 27 is the esc code for the esc key
        hideDetails();//when esc is pressed then hide details
      }
    });
  }
  
  function PreviousAndNextButtons(arr){
    'use strict';
  
    document.querySelector(NEXT_BUTTON_SELECTOR).addEventListener('click', function (event){
      event.preventDefault();
      if (isClicked == false){ 
        setDetailsFromThumb(arr[0]); 
      }
      else{
        for(var i=0; i < arr.length; i++){
          if(arr[i].getAttribute('data-image-url') == currentImg){
            if (i==5) {
              setDetailsFromThumb(arr[5]);
            } else {
              setDetailsFromThumb(arr[i+1]); 
            }
            break;
          }
        }
      }
    });
  
    document.querySelector(PREV_BUTTON_SELECTOR).addEventListener('click', function (event){
      event.preventDefault();
      if (isClicked == false){
        setDetailsFromThumb(arr[5]);
      }
      else{
        for(var i=0; i < arr.length; i++){
          if(arr[i].getAttribute('data-image-url') == currentImg){
            if (i==0) {//if its at the beginning, keep it there
              setDetailsFromThumb(arr[5]); 
            } else {
              setDetailsFromThumb(arr[i-1]);
            }
            break;
          }
        }
      }
    });
  }

  function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    PreviousAndNextButtons(thumbnails);
  }
  // run all the functions to link the thumbnails to the callback
  // that will update the main detail image with the thumbnail's image and title
  initializeEvents();
