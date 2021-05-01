// 粒子时钟 插件

var ParticleClock = function() {
        
  // private variables
  var canvas, // canvas element
      ctx, // canvas context
      gradient, // gradient (background)
      height, // canvas height
      width; // canvas width

  var getTime = function(amPM) {
    var date = new Date(),
        hours = date.getHours();

    var minutes = pad(date.getMinutes());
    var seconds = pad(date.getSeconds());
    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        timeString: hours + " : " + minutes + " : " + seconds
    };
  };

  // animation loop
  var loop = function() {
    
      // clear out text
      ctx.clearRect(0, 0, width, height);

      var time = getTime(true);

      // changing color with time
      var color = time.hours + time.minutes + time.seconds;
      setStyles(Number(color) * 5);

      // draw gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
  };

  var pad = function(number) {
      return ('0' + number).substr(-2);
  };

  // set dimensions of canvas
  var setDimensions = function () {
      width = window.innerWidth;
      height = window.innerHeight;
      // Resize the canvas
      canvas.width = width;
      canvas.height = height;

      canvas.style.position = 'absolute';
      canvas.style.left = '0px';
      canvas.style.top = '0px';
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
  };

  var setGradient = function(gradientStops) {
    
      // create gradient
      gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * height / Math.max(width, height));
    
      // iterate through colorstops
      for (var position in gradientStops) {
          var color = gradientStops[position];
          gradient.addColorStop(position, color);
      }
  };

  var setStyles = function(hue) {
      // color stops
      var gradientStops = { 
          0: 'hsl(' + hue + ', 100%, 100%)',
          0.5: 'hsl(' + hue +', 14%, 40%)'
      };

      // create gradient
      setGradient(gradientStops);
  };

  /** 
   * Public Methods
   */
  return {

      init: function(canvasID) {
      
        canvas = document.getElementById(canvasID);
        // make sure canvas exists and that the browser understands it
        if(canvas === null || !canvas.getContext) {
            return;
        }
        // set context
        ctx = canvas.getContext("2d");

        // set dimensions
        setDimensions();
        window.addEventListener('resize', function(e){
            setDimensions();
        }, false);
      
        // let's do this
        loop();
        setInterval(loop, 1000);
      }
  };
};

export default ParticleClock;