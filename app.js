function BMImage(imgName, fileName) {
  this.imgName = imgName;
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
  resultsDisplayed: false,

  click: function(event) {
    if (BusMall.totalClicks < 15) {
      BusMall.dispImage[parseInt(event.target.id)].click();
      BusMall.totalClicks++;
      BusMall.randomize();
    } else {
      if (!BusMall.resultsDisplayed)
        BusMall.displayResults();
    }
  },

  reset: function(event) {
    if (BusMall.totalClicks >= 15) {
      document.getElementById('reset-button').style.display = 'none';
      while (document.getElementById('result-section').firstChild)
        document.getElementById('result-section').removeChild(document.getElementById('result-section').firstChild);
    }
    BusMall.loadImages();
    BusMall.totalClicks = 0;
    BusMall.resultsDisplayed = false;
  },

  displayResults: function() {
    document.getElementById('reset-button').style.display = 'block';
    this.images.sort(function(a, b) { return b.clicks - a.clicks });
    var list = document.createElement('ul');
    for (var i = 0;i < this.images.length;i++) {
      var imageItem = document.createElement('li');
      imageItem.textContent = this.images[i].imgName + ' - ' + this.images[i].clicks + ' clicks';
      list.appendChild(imageItem);
    }
    var total = document.createElement('li');
    total.textContent = this.totalClicks;
    list.appendChild(total);
    document.getElementById('result-section').appendChild(list);
    this.resultsDisplayed = true;
  },

  randomize: function() {
    shuffleArray(this.images);
    var i = random(0, this.images.length - 3);
    this.dispImage[0] = this.images[i];
    this.dispImage[1] = this.images[i + 1];
    this.dispImage[2] = this.images[i + 2];
    BusMall.update();
  },

  update: function() {
    for (var i = 0;i < 3;i++) {
      document.getElementById('' + i).src = this.dispImage[i].path;
    }
  },

  loadImages: function() {
    this.images = [];
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
    this.images.push(new BMImage('Sweep', 'sweep.png'));
    this.images.push(new BMImage('Tauntaun', 'tauntaun.jpg'));
    this.images.push(new BMImage('Unicorn', 'unicorn.jpg'));
    this.images.push(new BMImage('USB', 'usb.gif'));
    this.images.push(new BMImage('Watering can', 'water-can.jpg'));
    this.images.push(new BMImage('Wine glass', 'wine-glass.jpg'));
  },

  main: function() {
    BusMall.loadImages();
    BusMall.randomize();
  }
};

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffleArray(array) {
  var i = array.length;
  while (i != 0) {
    var rand = random(0, i);
    i -= 1;
    var temp = array[i];
    array[i] = array[rand];
    array[rand] = temp;
  }
  return array;
}

BusMall.main();

window.onload = function() {
  document.getElementById('img-section').addEventListener('click', BusMall.click);
  document.getElementById('reset-button').addEventListener('click', BusMall.reset);
};
