//Create variables here
var dog,happyDog;
var database;
var food,foodStock;
function preload()
{
  //load images here
  dogImg= loadImage("images/Dog.png");
  happyDogImg= loadImage("images/happydog.png");

}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  dog= createSprite(400,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.2;
  foodStock= database.ref("Food");
  foodStock.on("value",readStock);

}


function draw() {  
background(46, 139, 87);
if(keyWentDown(UP_ARROW)){
  writeStock(food);
  dog.addImage(happyDogImg);

}
  drawSprites();
  //add styles here
  textSize(16);
  fill("white");
  text("Feed the Doggy to make him happy",150,50);
  text("Milk bottles:"+food,150,150);
}
function readStock(data){
  food=data.val();
}
function writeStock(x){
  if(x<=0){
   x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
  Food:x
  })
}

