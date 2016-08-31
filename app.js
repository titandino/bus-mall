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
  chartCtx: document.getElementById('result-canvas').getContext('2d'),

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
    var chartArgs = {};
    chartArgs.type = 'bar';
    chartArgs.data = {};
    chartArgs.data.labels = [];
    chartArgs.data.datasets = [];
    chartArgs.data.datasets[0] = {};
    chartArgs.data.datasets[0].label = 'Number of Clicks';
    chartArgs.data.datasets[0].data = [];
    chartArgs.data.datasets[0].borderWidth = 1;
    for (var i = 0;i < this.images.length;i++) {
      labels[i] = this.images[i].imgName;
      chartArgs.data.datasets[0].data[i] = this.images[i].clicks;
    }
    new Chart(ctx, chartArgs);
    /*
    chartArgs.data.datasets[0].backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ],
    chartArgs.data.datasets[0].borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    */
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
