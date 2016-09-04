function BMImage(imgName, fileName, clicks, views) {
  console.log('New image:', imgName, fileName, clicks, views);
  this.imgName = imgName;
  this.path = fileName;
  this.clicks = clicks || 0;
  this.views = views || 0;
}

BMImage.prototype.click = function() {
  this.clicks++;
  BusMall.savePersistence();
};

BMImage.prototype.getClickPercent = function() {
  return round(((this.clicks / this.views) * 100), 10);
};

var BusMall = {
  images: [],
  dispImage: [],
  totalClicks: 0,
  resultsDisplayed: false,
  chartCtx: document.getElementById('result-canvas').getContext('2d'),
  chart: null,

  click: function(event) {
    if (BusMall.totalClicks > 0 && (BusMall.totalClicks % 15) === 0 && !BusMall.resultsDisplayed) {
      BusMall.dispImage[parseInt(event.target.id)].click();
      BusMall.totalClicks++;
      BusMall.randomize();
      BusMall.displayResults();
    } else {
      if (!BusMall.resultsDisplayed) {
        BusMall.dispImage[parseInt(event.target.id)].click();
        BusMall.totalClicks++;
        BusMall.randomize();
      }
    }
  },

  continue: function(event) {
    document.getElementById('results-section').style.display = 'none';
    BusMall.resultsDisplayed = false;
    BusMall.randomize();
  },

  reset: function(event) {
    document.getElementById('results-section').style.display = 'none';
    BusMall.loadNewImages();
    BusMall.totalClicks = 0;
    BusMall.resultsDisplayed = false;
  },

  createDataset: function(chartArgs, value, label, getCallback) {
    var idx = 0;
    if (chartArgs.data.datasets.length > 0)
      idx = chartArgs.data.datasets.length;
    chartArgs.data.datasets[idx] = {};
    chartArgs.data.datasets[idx].label = label;
    chartArgs.data.datasets[idx].data = [];
    chartArgs.data.datasets[idx].borderWidth = 1;
    chartArgs.data.datasets[idx].backgroundColor = [];
    chartArgs.data.datasets[idx].borderColor = [];

    for (var i = 0;i < this.images.length;i++) {
      chartArgs.data.labels[i] = this.images[i].imgName;
      if (getCallback)
        chartArgs.data.datasets[idx].data[i] = getCallback(this.images[i]);
      else
        chartArgs.data.datasets[idx].data[i] = this.images[i][value];

      var col = 'rgba(' + random(0, 255) + ', ' + random(0, 255) + ', ' + random(0, 255);
      chartArgs.data.datasets[idx].backgroundColor[i] = col + ', 0.2)';
      chartArgs.data.datasets[idx].borderColor[i] = col + ', 1.0)';
    }
  },

  displayResults: function() {
    document.getElementById('results-section').style.display = 'block';
    var chartArgs = {};
    chartArgs.type = 'bar';
    chartArgs.data = {};
    chartArgs.data.labels = [];
    chartArgs.data.datasets = [];

    this.images.sort(function(a, b) { return b.clicks - a.clicks; });

    this.createDataset(chartArgs, 'clicks', 'Times Clicked');
    this.createDataset(chartArgs, 'views', 'Times Viewed');
    this.createDataset(chartArgs, 'getClickPercent', 'Click Percentage', function(a) { return a.getClickPercent(); });
    if (!this.chart) {
      this.chart = new Chart(this.chartCtx, chartArgs);
      this.chart.update();
    } else {
      this.chart.config = chartArgs;
      this.chart.update();
    }
    this.resultsDisplayed = true;
  },

  randomize: function() {
    shuffleArray(this.images);
    var i = random(0, this.images.length - 3);
    this.dispImage[0] = this.images[i];
    this.dispImage[0].views++;
    this.dispImage[1] = this.images[i + 1];
    this.dispImage[1].views++;
    this.dispImage[2] = this.images[i + 2];
    this.dispImage[2].views++;
    this.update();
  },

  update: function() {
    for (var i = 0;i < 3;i++) {
      document.getElementById('' + i).src = this.dispImage[i].path;
    }
  },

  savePersistence: function() {
    localStorage.images = JSON.stringify(BusMall.images);
    localStorage.totalClicks = this.totalClicks;
  },

  loadPersistence: function() {
    if (localStorage.images) {
      var lsImages = JSON.parse(localStorage.images);
      this.totalClicks = localStorage.totalClicks;
      for (var i = 0;i < lsImages.length;i++) {
        this.images[i] = new BMImage(lsImages[i].imgName, lsImages[i].path, lsImages[i].clicks, lsImages[i].views);
      }
    } else {
      this.loadNewImages();
    }
  },

  loadNewImages: function() {
    this.images = [];
    this.images.push(new BMImage('Bag', 'img/bag.jpg'));
    this.images.push(new BMImage('Banana', 'img/banana.jpg'));
    this.images.push(new BMImage('Bathroom', 'img/bathroom.jpg'));
    this.images.push(new BMImage('Boots', 'img/boots.jpg'));
    this.images.push(new BMImage('Breakfast', 'img/breakfast.jpg'));
    this.images.push(new BMImage('Bubble Gum', 'img/bubblegum.jpg'));
    this.images.push(new BMImage('Chair', 'img/chair.jpg'));
    this.images.push(new BMImage('Cthulhu', 'img/cthulhu.jpg'));
    this.images.push(new BMImage('Dog duck', 'img/dog-duck.jpg'));
    this.images.push(new BMImage('Dragon', 'img/dragon.jpg'));
    this.images.push(new BMImage('Pen', 'img/pen.jpg'));
    this.images.push(new BMImage('Pet Sweep', 'img/pet-sweep.jpg'));
    this.images.push(new BMImage('Scissors', 'img/scissors.jpg'));
    this.images.push(new BMImage('Shark', 'img/shark.jpg'));
    this.images.push(new BMImage('Sweep', 'img/sweep.png'));
    this.images.push(new BMImage('Tauntaun', 'img/tauntaun.jpg'));
    this.images.push(new BMImage('Unicorn', 'img/unicorn.jpg'));
    this.images.push(new BMImage('USB', 'img/usb.gif'));
    this.images.push(new BMImage('Watering can', 'img/water-can.jpg'));
    this.images.push(new BMImage('Wine glass', 'img/wine-glass.jpg'));
    this.savePersistence();
  },

  main: function() {
    this.loadPersistence();
    this.randomize();
    document.getElementById('img-section').addEventListener('click', BusMall.click);
    document.getElementById('reset-button').addEventListener('click', BusMall.reset);
    document.getElementById('continue-button').addEventListener('click', BusMall.continue);
  }
};

function round(number, dec) {
  return Math.round(number * dec) / dec;
}

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
