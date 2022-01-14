var url="https://api.jsonbin.io/b/60665a717474c23d9027b44d"
document.addEventListener('DOMContentLoaded', function() {

var gallery = document.getElementById('gallery'); //get our id 'gallery'

fetch(url)

.then(function(res) {
  res.json().then(function(json) {
    json.forEach(function(el) {
      var galleryItem = document.createElement('a');

      galleryItem.setAttribute('class', 'gallery-item');  //set attributes (class, href, target)
      galleryItem.setAttribute('href', el.url);
      galleryItem.setAttribute('target', '_blank');
      
      var image = document.createElement('img');

      image.setAttribute('src', el.url);  //url
      image.setAttribute('alt', el.caption);  //alt
      image.setAttribute('title', el.caption);  //title

      var caption = document.createElement('caption');
      caption.style = "font-family: Arial, Helvetica, sans-serif;"; //style the caption
      
      caption.innerText = el.caption; 

      galleryItem.appendChild(image); //add elements to the DOM
      galleryItem.appendChild(caption);
      gallery.appendChild(galleryItem);
    });
  });
});
});

document.addEventListener('DOMContentLoaded', function() {
var images = document.getElementById('carouselImages'); // get our different id from the DOM
var caption = document.getElementById('carouselCaption');
//arrows
var prev = document.getElementById('carouselPrev'); 
var next = document.getElementById('carouselNext');


//fetch json file
fetch(url)
.then(function(res) {
res.json().then(function(json) {
  json.forEach(function(el, i) {

    var img = document.createElement('img');

    img.setAttribute('src', el.url);  //url
    img.setAttribute('alt', el.caption); //alt 
    img.setAttribute('title', el.caption); //title 

    images.appendChild(img);
    caption.style = "color : white; font-family: Arial, Helvetica, sans-serif;"; //style the caption
  });

 //pass the json to setupCarousel function
  setupCarousel(json);
});
});

function setupCarousel(json) {

  var imageCount = images.childElementCount;
  var currentImage = 1;
  var imageWidth = 1000;

  prev.addEventListener('click', function() { //click on prev arrow

    if(currentImage != 1) {
      --currentImage;//move to previous image

      images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
    }
    //if current image is 1 then move to image 9
    else if(currentImage == 1){ 
      currentImage = 9;

      images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
    }
    caption.innerText = json[currentImage - 1].caption;
  });


  next.addEventListener('click', function() {//click on next arrow


    if(currentImage != imageCount) {
      ++currentImage; //go to next image

      images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
    }
    //if current image is 9 then move to image 1
    else if(currentImage == 9){
      currentImage = 1;
      images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
    }

    caption.innerText = json[currentImage - 1].caption;
  });

  //auto function called every 5s
  function auto(){
    if(currentImage != imageCount) {
      ++currentImage;

      images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
    }
    //if current image is 9 then move to image 1
    else if(currentImage == 9){
      currentImage = 1;
      images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
    }
    
    caption.innerText = json[currentImage - 1].caption;


    setTimeout(auto,5000); // call auto function every 5000ms
  }

  auto();
  caption.innerText = json[currentImage - 1].caption;
}

});


//Background Particle
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-10;
canvas.height = 400;
var part = [];
var part_number = 200;

//Proprieties of a particle
var Particle = function() {
  var rand = Math.random();
  this.x = Math.random() * canvas.width; // random x & y
  this.y = Math.random() * canvas.height;

  //random speed
  if(rand < 0.5){
    this.vx = 1.5*Math.random();//random positive x & y velocity
    this.vy = 1.5*Math.random();
  }else{
    this.vx = 1.5*Math.random()*-1;//random negative x & y velocity
    this.vy = 1.5*Math.random()*-1;
  }
}

//Draw the particle
Particle.prototype.Draw = function(ctx) {
  ctx.fillStyle = 'black';
  ctx.fillRect(this.x, this.y, 1, 1);

}

//update x & y
Particle.prototype.Update = function() {
  this.y += this.vy;
  this.x += this.vx;

  if(this.y > canvas.height || this.y < 0) { // bounce on the egdes (top and bottom)
    this.vy *= -1;
  }
  if(this.x > canvas.width || this.x < 0){  // bounce on the egdes (right and left)
    this.vx *=-1;
  }
}

function loop() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < part_number; i++) {
    part[i].Update(); //update every particles
    part[i].Draw(ctx);
  }

  requestAnimationFrame(loop); // loop the animation
}

for(var i = 0; i < part_number; i++) {
  part.push(new Particle());
}

loop();
