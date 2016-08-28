function BMImage(name, fileName) {
  this.name = name;
  this.path = 'img/' + fileName;
  this.clicks = 0;
}

BMImage.prototype.click = function() {
  this.clicks++;
};

images = [];
dispImage = [];
totalClicks = 0;

var BusMall = {

  click: function(event) {
    console.log(event.target);
    console.log(event.target.id);
    console.log(parseInt(event.target.id));
    console.log(this.dispImage);
    dispImage[parseInt(event.target.id)].click();
    totalClicks++;
    BusMall.randomize();
  },

  randomize: function() {
    for (var i = 0;i < 3;i++) {
      dispImage[i] = images[i];
      console.log('Setting #' + i + ' to ' + dispImage[i]);
    }
    BusMall.update();
  },

  update: function() {
    for (var i = 0;i < 3;i++) {
      document.getElementById('' + i).src = dispImage[i].path;
    }
  },

  loadImages: function() {
    images.push(new BMImage('Bag', 'bag.jpg'));
    images.push(new BMImage('Banana', 'banana.jpg'));
    images.push(new BMImage('Bathroom', 'bathroom.jpg'));
    images.push(new BMImage('Boots', 'boots.jpg'));
    images.push(new BMImage('Breakfast', 'breakfast.jpg'));
    images.push(new BMImage('Bubble Gum', 'bubblegum.jpg'));
    images.push(new BMImage('Chair', 'chair.jpg'));
    images.push(new BMImage('Cthulhu', 'cthulhu.jpg'));
    images.push(new BMImage('Dog duck', 'dog-duck.jpg'));
    images.push(new BMImage('Dragon', 'dragon.jpg'));
    images.push(new BMImage('Pen', 'pen.jpg'));
    images.push(new BMImage('Pet Sweep', 'pet-sweep.jpg'));
    images.push(new BMImage('Scissors', 'scissors.jpg'));
    images.push(new BMImage('Shark', 'shark.jpg'));
    images.push(new BMImage('Sweep', 'sweep.jpg'));
    images.push(new BMImage('Tauntaun', 'tauntaun.jpg'));
    images.push(new BMImage('Unicorn', 'unicorn.jpg'));
    images.push(new BMImage('USB', 'usb.gif'));
    images.push(new BMImage('Watering can', 'water-can.jpg'));
    images.push(new BMImage('Wine glass', 'wine-glass.jpg'));
  },

  main: function() {
    BusMall.loadImages();
    BusMall.randomize();
  }
};

BusMall.main();

window.onload = function() {
  document.getElementById('img-section').addEventListener('click', BusMall.click);
};
