// FULL ORIGINAL JS – UNCHANGED
function toggleSection(id){
 const el=document.getElementById(id);
 el.classList.toggle('show');
}

const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}
resize();
addEventListener("resize",resize);

const stars=[];
for(let i=0;i<300;i++){
 stars.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.5+0.5,s:Math.random()*0.5+0.2,o:Math.random()});
}

const meteors=[];
function spawnMeteor(){meteors.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height*0.5,len:Math.random()*300+200,speed:Math.random()*20+15,angle:Math.random()*Math.PI/3+Math.PI/6,alpha:1});}
setInterval(spawnMeteor,1200);

const rockets=[];
function spawnRocket(){rockets.push({x:-50,y:Math.random()*canvas.height*0.7,speed:Math.random()*6+4,angle:Math.random()*0.3-0.15});}
setInterval(spawnRocket,3000);

function drawRocket(r){
 ctx.save();
 ctx.translate(r.x,r.y);
 ctx.rotate(r.angle);
 ctx.fillStyle="#fff";
 ctx.fillRect(0,-6,45,12);
 ctx.beginPath();
 ctx.moveTo(45,-6);
 ctx.lineTo(55,0);
 ctx.lineTo(45,6);
 ctx.closePath();
 ctx.fill();
 ctx.fillStyle="#00e1ff";
 ctx.beginPath();
 ctx.moveTo(-9,-4);
 ctx.lineTo(0,0);
 ctx.lineTo(-9,4);
 ctx.closePath();
 ctx.fill();
 ctx.restore();
}

function animate(){
 ctx.clearRect(0,0,canvas.width,canvas.height);

 stars.forEach(s=>{
  ctx.fillStyle=`rgba(255,255,255,${s.o})`;
  ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
  s.y+=s.s;if(s.y>canvas.height){s.y=0;s.x=Math.random()*canvas.width;}
 });

 meteors.forEach((m,i)=>{
  ctx.strokeStyle=`rgba(255,255,255,${m.alpha})`;
  ctx.lineWidth=2;
  ctx.beginPath();
  ctx.moveTo(m.x,m.y);
  ctx.lineTo(m.x-Math.cos(m.angle)*m.len,m.y-Math.sin(m.angle)*m.len);
  ctx.stroke();
  m.x+=Math.cos(m.angle)*m.speed;
  m.y+=Math.sin(m.angle)*m.speed;
  m.alpha-=0.02;
  if(m.alpha<=0) meteors.splice(i,1);
 });

 rockets.forEach((r,i)=>{
  drawRocket(r);
  r.x+=r.speed;
  r.y+=Math.sin(r.angle)*r.speed;
  if(r.x>canvas.width+50) rockets.splice(i,1);
 });

 requestAnimationFrame(animate);
}
animate();
