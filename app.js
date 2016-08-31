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
  chart: null,

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
      document.getElementById('result-canvas').style.display = 'none';
    }
    BusMall.loadImages();
    BusMall.totalClicks = 0;
    BusMall.resultsDisplayed = false;
  },

  displayResults: function() {
    document.getElementById('reset-button').style.display = 'block';
    document.getElementById('result-canvas').style.display = 'block';
    var chartArgs = {};
    chartArgs.type = 'bar';
    chartArgs.data = {};
    chartArgs.data.labels = [];
    chartArgs.data.datasets = [];
    chartArgs.data.datasets[0] = {};
    chartArgs.data.datasets[0].label = 'Number of Clicks';
    chartArgs.data.datasets[0].data = [];
    chartArgs.data.datasets[0].borderWidth = 1;

    this.images.sort(function(a, b) { return b.clicks - a.clicks });

    for (var i = 0;i < this.images.length;i++) {
      chartArgs.data.labels[i] = this.images[i].imgName;
      chartArgs.data.datasets[0].data[i] = this.images[i].clicks;
    }
    chartArgs.data.datasets[0].backgroundColor = [];
    chartArgs.data.datasets[0].borderColor = [];
    for (var i = 0;i < this.images.length;i++) {
      var col = 'rgba(' + random(0, 255) + ', ' + random(0, 255) + ', ' + random(0, 255);
      chartArgs.data.datasets[0].backgroundColor[i] = col + ', 0.2)';
      chartArgs.data.datasets[0].borderColor[i] = col + ', 1.0)';;
    }
    if (!this.chart) {
      this.chart = new Chart(this.chartCtx, chartArgs);
      this.chart.update();
    } else {
      this.chart.config = chartArgs;
      this.chart.update();
    }
    BusMall.resultsDisplayed = true;
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
