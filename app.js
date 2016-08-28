function BMImage(name, fileName) {
  this.name = name;
  this.path = 'img/'+fileName;
  this.clicks = 0;
}

var BusMall = {
  images: [],
  dispImage: [],
  totalClicks: 0,

  loadImages: function() {
    this.images.push(new BMImage('Bag', 'bag.png'));
    this.images.push(new BMImage('Banana', 'banana.png'));
    this.images.push(new BMImage('Bathroom', 'bathroom.png'));
    this.images.push(new BMImage('Boots', 'boots.png'));
    this.images.push(new BMImage('Breakfast', 'breakfast.png'));
    this.images.push(new BMImage('Bubble Gum', 'bubblegum.png'));
    this.images.push(new BMImage('Chair', 'chair.png'));
    this.images.push(new BMImage('Cthulhu', 'cthulhu.png'));
    this.images.push(new BMImage('Dog duck', 'dog-duck.png'));
    this.images.push(new BMImage('Dragon', 'dragon.png'));
    this.images.push(new BMImage('Pen', 'pen.png'));
    this.images.push(new BMImage('Pet Sweep', 'pet-sweep.png'));
    this.images.push(new BMImage('Scissors', 'scissors.png'));
    this.images.push(new BMImage('Shark', 'shark.png'));
    this.images.push(new BMImage('Sweep', 'sweep.png'));
    this.images.push(new BMImage('Tauntaun', 'tauntaun.png'));
    this.images.push(new BMImage('Unicorn', 'unicorn.png'));
    this.images.push(new BMImage('USB', 'usb.png'));
    this.images.push(new BMImage('Watering can', 'water-can.png'));
    this.images.push(new BMImage('Wine glass', 'wine-glass.png'));
  },

  main: function() {
    this.loadImages();
  }
}

BusMall.main();
