function BMImage(name, fileName) {
  this.name = name;
  this.path = 'img/' + fileName;
  this.clicks = 0;
}

BMImage.prototype.click = function() {
  this.clicks++;
};

var BusMall = {
  images: [],
  dispImage: [],
  totalClicks: 0,

  click: function(event) {
    console.log(event.target);
    console.log(event.target.id);
    console.log(parseInt(event.target.id));
    console.log(this.dispImage);
    this.dispImage[parseInt(event.target.id)].click();
    this.totalClicks++;
    this.randomize();
  },

  randomize: function() {
    for (var i = 0;i < 3;i++) {
      this.dispImage[i] = this.images[i];
      console.log('Setting #' + i + ' to ' + this.dispImage[i]);
    }
    this.update();
  },

  update: function() {
    for (var i = 0;i < 3;i++) {
      document.getElementById('' + i).src = this.dispImage[i].path;
    }
  },

  loadImages: function() {
    this.images.push(new BMImage('Bag', 'bag.jpg'));
    this.images.push(new BMImage('Banana', 'banana.jpg'));
    this.images.push(new BMImage('Bathroom', 'bathroom.jpg'));
    this.images.push(new BMImage('Boots', 'boots.jpg'));
    this.images.push(new BMImage('Breakfast', 'breakfast.jpg'));
    this.images.push(new BMImage('Bubble Gum', 'bubblegum.jpg'));
    this.images.push(new BMImage('Chair', 'chair.jpg'));
    this.images.push(new BMImage('Cthulhu', 'cthulhu.jpg'));
    this.images.push(new BMImage('Dog duck', 'dog-duck.jpg'));
    this.images.push(new BMImage('Dragon', 'dragon.jpg'));
    this.images.push(new BMImage('Pen', 'pen.jpg'));
    this.images.push(new BMImage('Pet Sweep', 'pet-sweep.jpg'));
    this.images.push(new BMImage('Scissors', 'scissors.jpg'));
    this.images.push(new BMImage('Shark', 'shark.jpg'));
    this.images.push(new BMImage('Sweep', 'sweep.jpg'));
    this.images.push(new BMImage('Tauntaun', 'tauntaun.jpg'));
    this.images.push(new BMImage('Unicorn', 'unicorn.jpg'));
    this.images.push(new BMImage('USB', 'usb.gif'));
    this.images.push(new BMImage('Watering can', 'water-can.jpg'));
    this.images.push(new BMImage('Wine glass', 'wine-glass.jpg'));
  },

  main: function() {
    this.loadImages();
    this.randomize();
  }
};

BusMall.main();

window.onload = function() {
  document.getElementById('img-section').addEventListener('click', BusMall.click);
};
