//variables
var clicks = 0; //increment this by one every click
var auto_clicks = 0; //automatically click once per second
var cost = 1; //the cost of this should increase exponentially
var upgrade_speed = 1; //the level of the speed up upgrade
var click_rate = 1000; //ms between each autoclick
var interval_auto; //storing our interval here so we can update it
var click_increment = 1; //how many clicks per click
var train_lvl = 0;
var miners = ["Ant","Spiders","Squirrels","Rabid Dog","10 Rabid Squirrels","Genetically Modified Shark","Exactled Blood Ants","Sabre Tooth Tiger","Diamond Hippos","Black Tigers"];
//functions

function update_total_clicks() { //updates the number of clicks   
    var e = document.getElementById("total_clicks");
    e.innerHTML = clicks;
}

function spawn_goblin(){
$(document).ready(function(e) {
    var width = "+=" + $(document).width();
    $("#animate").animate({
    left: width
  }, 5000, function() {
    // Animation complete.
  });
});
}

function buy_something(c, button) {
    if (clicks < c) {
        button.className = 'btn btn-danger';
        setTimeout(function() {
            var e = document.getElementsByClassName("btn-danger")[0];
            e.className = 'btn btn-success';
        }, 1000);
        var e2 = document.getElementById("insufficient_funds");
    	e2.innerHTML = 'Insufficient funds! ';
        return false;
    }
    clicks -= c;
    var e2 = document.getElementById("insufficient_funds");
    e2.innerHTML = '';
    return true;
}

function update_workers() {
    clearInterval(interval_auto);
    interval_auto = setInterval(function() {
        clicks += auto_clicks;
        update_total_clicks();
    }, click_rate);
}
//click events
function coins() {
  var elem = document.getElementById("click_increment"); 
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

function buildwall() {
	document.getElementById('wall').style.display='block';
}

document.getElementById("click").onclick = function() {
    clicks = parseFloat(clicks) + parseFloat(click_increment);
    update_total_clicks(); //updates the text
    coins();
};
document.getElementById("buy_auto_clicks").onclick = function() {
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
};
document.getElementById("upgrade_speed").onclick = function() {
    var upgrade_cost = (Math.pow(3, upgrade_speed)) * 100;
    if (!buy_something(upgrade_cost, this)) return;
    train_lvl++;
    upgrade_speed++;
    update_workers();
    var e2 = document.getElementById("upgrade_speed");
    e2.innerHTML = 'Buy for ' + ((Math.pow(3, upgrade_speed)) * 100);
    var e2 = document.getElementById("speed_level");
    e2.innerHTML = 'lvl  ' + train_lvl;
};

//Increase Click Increment
document.getElementById("increase_clicks").onclick = function() {
    var upgrade_cost = (Math.pow(3, click_increment)) * 1;
    if (!buy_something(upgrade_cost, this)) return;
    click_increment++;
    update_workers();
    var e2 = document.getElementById("increase_clicks");
    e2.innerHTML = 'Buy for ' + ((Math.pow(3, click_increment)) * 10);
    var e2 = document.getElementById("increment_level");
    e2.innerHTML = '+ ' + click_increment;
};

//Start Autoclickers
update_workers();
