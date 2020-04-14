/*alert("verification src");*/
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom  = new Image();
var fly = new Audio();
var score_audio = new Audio();


bird.src= "img/bird.png";
bg.src= "img/bg.png";
fg.src= "img/fg.png"
pipeUp.src= "img/pipeUp.png"
pipeBottom.src= "img/pipeBottom.png";
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";


var gap = 90;
document.addEventListener("keydown",moveUp);
function moveUp()
  {   
      
    if (event.which==38) {
            
            yPos -= 20 ;
            fly.play();
            
        }
     
     
  }
var score = 0;
var pipe = []; /* bloque */

pipe[0]= {
    x : cvs.width,
    y :0
}
var grav = 1;

var xPos = 10;
var yPos = 150;
function draw()
{
    ctx.drawImage(bg,0,0);
    for (var index = 0; index < pipe.length; index++) {

        ctx.drawImage(pipeUp,pipe[index].x,pipe[index].y);
        ctx.drawImage(pipeBottom,pipe[index].x,pipe[index].y+pipeUp.height+gap);
        pipe[index].x--;
        
        if (pipe[index].x==125) {
           
            pipe.push({
                x : cvs.width,
                y :Math.floor(Math.random()*pipeUp.height)-pipeUp.height
            });
            
        }
        if((xPos+bird.width>=pipe[index].x && xPos<=pipe[index].x+pipeUp.width && 
            (yPos+bird.height<pipe[index].y+pipeUp.height ||yPos+bird.height>pipe[index].y+pipeUp.height+gap)) ||(yPos+bird.height>= cvs.height-fg.height) )
           {
               location.reload();
           }
        if(pipe[index].x==2){
            score++;
            score_audio.play();
            
        }
       
    }
   
    ctx.drawImage(fg,0,bg.height-fg.height);
    ctx.drawImage(bird,xPos,yPos);
    ctx.font="30px Arial";
    ctx.fillText(score,10,cvs.height-20);
    yPos += grav;
    requestAnimationFrame(draw);
}
pipeBottom.onload= draw;
