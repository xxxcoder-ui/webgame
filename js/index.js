//variables
var clicks = 0; //increment this by one every click
var auto_clicks = 0; //automatically click once per second
var cost = 1; //the cost of this should increase exponentially
var upgrade_speed = 0; //the level of the speed up upgrade
var click_rate = 1000; //ms between each autoclick
var interval_auto; //storing our interval here so we can update it
var click_increment = 1; //how many clicks per click
var train_lvl = 0;
var spawntime = 5000;
var wall_price = 10;
var wall_built = 0;
var wall_pos = 800;
var goblin_alive = 0;
var damage = 0;
var minerpos = 240;
var miners = ["Ant","Spiders","Squirrels","Rabid Dog","10 Rabid Squirrels","Genetically Modified Shark","Exactled Blood Ants","Sabre Tooth Tiger","Diamond Hippos","Black Tigers"];
//functions

function update_total_clicks() { //updates the number of clicks   
    var e = document.getElementById("total_clicks");
    e.innerHTML = clicks;
}

function build_wall() { //build wall 
    var e = document.getElementById("brokenwall");
    e.style.display = 'none'; 
    var e = document.getElementById("wall");
    e.style.display = 'block';
    wall_built = 1;
   var rect = e.getBoundingClientRect();
    wall_pos = rect.left;
    damage = 0;
}

function build_castle() { //build castle 
    var e = document.getElementById("castle");
    e.style.display = 'block'; 
}


function goblin_attack() { //attack wall
    damage++;
    console.log(damage);
    if (damage > 1000) {
    	wall_built = 0;
    	var e = document.getElementById("wall");
    	e.style.display = 'none';
    	var e = document.getElementById("brokenwall");
    	e.style.display = 'block'; 
    	damage = 0; //reset damage
    }
}

function spawn_goblin() {
  var elem = document.getElementById("goblin");
  elem.style.display = 'block';
  var elem2 = document.getElementById("haha");
  var pos = 0;
  var id = setInterval(frame, 5);
  goblin_alive = 1;

  function frame() {
    if (pos == 650)	{
		pos = 0;
		clearInterval(id);
		elem.style.display = 'none';
		elem2.style.display = 'none';
		goblin_alive = 0; //goblin dies on otherside
    } else if (pos == (wall_pos - 35) && wall_built == 1) {
		pos = (wall_pos - 35);
		goblin_attack();
    } else if (pos == minerpos) {
		clicks = 0;
		pos++;
		elem2.style.display = 'block';
    } else {
    	if (pos ==minerpos){
    		clicks = 0
    	}
		pos++; 
		elem.style.left = pos + 'px'; 
		elem2.style.left = pos + 55 + 'px';
		elem.onclick = function(){
		pos = 0;
		clearInterval(id);
		elem.style.display = 'none';
		elem2.style.display = 'none';
		goblin_alive = 0; //kill goblin
		} 
    }
  }
}

setInterval(function(){
	if (goblin_alive == 0) {
		console.log("spawn");
    	spawn_goblin();
	}
}, 15000)


function buy_something(c, button) {
    if (clicks < c) {
        button.className = 'btn btn-danger';
        setTimeout(function() {
            var e = document.getElementsByClassName("btn-danger")[0];
            e.className = 'btn btn-success';
        }, 1000);
        var e2 = document.getElementById("give_tip");
    	e2.innerHTML = 'Insufficient funds! ';
        return false;
    }
    clicks -= c;
    var e2 = document.getElementById("give_tip");
    e2.innerHTML = '';
    return true;
}

function update_workers() {
    clearInterval(interval_auto);
    interval_auto = setInterval(function() {
        clicks += auto_clicks;
        if (clicks >= 20) {
			var e = document.getElementById("build_castle");
			e.style.display = 'block'; 
		}
        update_total_clicks();
    }, click_rate);
}
//click events
function coins() {
  var elem = document.getElementById("coin"); 
  elem.style.display = 'block';  
  var pos = event.clientX;
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == 500) {
      clearInterval(id);
      elem.style.display = 'none';
    } else {
      pos++; 
      elem.style.top = pos + 'px'; 
      elem.style.left = pos + 'px'; 
    }
  }
}

document.getElementById("click").onclick = function() {
    clicks = parseFloat(clicks) + parseFloat(click_increment);
    update_total_clicks(); //updates the text
    coins();

};
document.getElementById("buy_auto_clicks").onclick = function() {
	if (train_lvl > 5) {
		var e2 = document.getElementById("give_tip");
    	e2.innerHTML = '';
		train_lvl = 0;
		var e2 = document.getElementById("speed_level");
	    e2.innerHTML = 'lvl  ' + train_lvl;
		var upgrade_cost = (Math.pow(3, auto_clicks)) * 10;
	    if (!buy_something(upgrade_cost, this)) return;
	    auto_clicks++;
	    update_total_clicks();
	    var e = document.getElementById("clicks_per_second");
	    e.innerHTML = auto_clicks/upgrade_speed;
	    var e2 = document.getElementById("buy_auto_clicks");
	    e2.innerHTML = 'Buy '+ miners[auto_clicks] + ': for ' + (Math.pow(3, auto_clicks)) * 10;
	} else {
        var e2 = document.getElementById("give_tip");
    	e2.innerHTML = 'Updgrade Levels! Need lvl 5!';
	}
};
document.getElementById("upgrade_speed").onclick = function() {
    var upgrade_cost = (Math.pow(3, upgrade_speed)) * 10;
    if (!buy_something(upgrade_cost, this)) return;
    train_lvl++;
    upgrade_speed++;
    update_workers();
    var e2 = document.getElementById("upgrade_speed");
    e2.innerHTML = 'Buy for ' + ((Math.pow(3, upgrade_speed)) * 10);
    var e2 = document.getElementById("speed_level");
    e2.innerHTML = 'lvl  ' + train_lvl;
};

//Increase Click Increment
document.getElementById("increase_clicks").onclick = function() {
    var upgrade_cost = (Math.pow(3, click_increment)) * 10;
    if (!buy_something(upgrade_cost, this)) return;
    click_increment++;
    update_workers();
    var e2 = document.getElementById("increase_clicks");
    e2.innerHTML = 'Buy for ' + ((Math.pow(3, click_increment)) * 10);
    var e2 = document.getElementById("increment_level");
    e2.innerHTML = '+ ' + click_increment;
};

//Build Wall
document.getElementById("build_wall").onclick = function() {
    var wall_price = 10;
    if (!buy_something(wall_price, this)) return;
    build_wall();
};

//Build Castle
document.getElementById("build_castle").onclick = function() {
    var castle_price = 10;
    if (!buy_something(castle_price, this)) return;
    build_castle();
};


//Start Autoclickers
update_workers();
