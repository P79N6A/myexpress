define(function () {
    var canvas = document.getElementById('walk-man');
    var ctx = canvas.getContext('2d');
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,width,height);

    ctx.translate(width / 2, height / 2);//改变坐标原点 到画布中间显示

    //#regind
    //walk man
    // var image = new Image();
    // image.src = 'http://localhost:3000/express/static/img/walk-right.png';
    // image.onload = draw;
    // var sprite = 0;
    // var posX = 0;

    // function draw() {
    //     ctx.fillRect(-(width / 2), -(height / 2), width, height);
    //     ctx.drawImage(image, (sprite * 102), 0, 102, 148, 0 + posX, -74, 102, 148);
    //     if (posX % 13 === 0) {
    //         if (sprite === 5) {
    //             sprite = 0;
    //         } else {
    //             sprite++;
    //         }
    //     }
    //     if (posX > width / 2) {
    //         newStartPos = -((width / 2) + 102);
    //         posX = Math.ceil(newStartPos / 13) * 13;
    //     } else {
    //         posX += 2;
    //     }
    //     window.requestAnimationFrame(draw);
    // };

    //#endregind

    function degToRad(degrees) {
      return degrees * Math.PI / 180;
    };
    function rand(min, max) {
      return Math.floor(Math.random() * (max-min+1)) + (min);
    }
    var length = 250;
    var moveOffset = 20;
    for(var i = 0; i < length; i++) {
      ctx.fillStyle = 'rgba(' + (255-length) + ',0,' + (255-length) + ',0.9)';
      ctx.beginPath();
      ctx.moveTo(moveOffset,moveOffset);
      ctx.lineTo(moveOffset+length,moveOffset);
      var triHeight = length/2 * Math.tan(degToRad(60));
      ctx.lineTo(moveOffset+(length/2),moveOffset+triHeight);
      ctx.lineTo(moveOffset,moveOffset);
      ctx.fill();
      length--;
      moveOffset+=0.7;
      ctx.rotate(degToRad(5));
    }
})