
console.log("index.js loaded");

window.addEventListener('load', function () {
// *** start sensor data ***
        //first value of Noisesensor is always -0.0000 and therby unusable!
        function initNoiseSensor1(result) {
        };
        console.log("Initialize Noisesensor the first time with -0.0000");
        
        var firstNoise = carrier.getAverageNoise(initNoiseSensor1, onFailure);
        
        // start noise sensor
            function onSuccessNoise1(result) {
            };
           carrier.getAverageNoise(onSuccessNoise1, onFailure);
        // end noise sensor
    // *** end sensor data ***
}, false);

document.addEventListener("resume", onResume, false);

function onResume() {
        console.log("app resumed");
        window.location.href="index.html";
}




//$(document).ready(function() {
document.addEventListener("deviceready", function(){
    // establish mqtt connection to server
    initClient();
    
    /*$( document ).bind( "mobileinit", function() {
        // Make jQuery Mobile framework configuration changes here
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
    });*/
    
    // *** start set active states ***
    
    var noiseLastState = window.localStorage.getItem('noise'); // => 1-5
    var lightLastState = window.localStorage.getItem('lighting'); // => 1-5
    var tempLastState = window.localStorage.getItem('temp'); // => 1-7
    var activityLastState = window.localStorage.getItem('activity'); // => Moving,...
    
    
    $(function() {
      $('#noise > input[val="'+noiseLastState+'"]').addClass('active');
      $('#lighting > input[val="'+lightLastState+'"]').addClass('active');
      $('#temp > input[val="'+tempLastState+'"]').addClass('active');
      $('#activity > input[val="'+activityLastState+'"]').addClass('active');
    });
    
    // *** end set active states ***
    
    
    
    // *** start setup for data sending ***
    function addToGlobal(name, value) {
                  globalData[name] = value;
    };
    // *** end setup for data sending ***

// *** start check for first app launch ***
    var applaunchCount = window.localStorage.getItem('launchCount5');
    

    //Check if it already exists or not
    if(applaunchCount){
       //This is a second time launch, and count = applaunchCount
       console.log("second time app launch");
       var appUID = window.localStorage.getItem('appUID');
       console.log("Old AppID: "+ appUID);
       

       
    }else{
      //Local storage is not set, hence first time launch. set the local storage item
      window.localStorage.setItem('launchCount5',1);
      window.localStorage.setItem('Reading', 0);
      window.localStorage.setItem('Computer', 0);
      window.localStorage.setItem('Meeting', 0);
      window.localStorage.setItem('Moving', 0);
      window.localStorage.setItem('Other', 0);
      
      console.log("first time app launch");
      
      // *** start create appID ***
      
        var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var ID_LENGTH = 8;

        var generate = function() {
          var rtn = '';
          for (var i = 0; i < ID_LENGTH; i++) {
            rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
          }
          return rtn;
        }
        
        appID = generate();
        console.log("New AppID: "+ appID);
        window.localStorage.setItem('appUID', appID);
      
      // *** end create appID ***
    }
// *** end check for first app launch ***

// *** start read out activity states ***
    // *** start temp form ***
    $('#temp > input[type="button"]').click(function(){
        console.log("a temp button pressed");
        event.preventDefault();

        $('#temp input[type="button"].active').removeClass('active');
            $(this).addClass('active');
    });
    // *** end temp form ***


    // *** start lighting form ***
    $('#lighting > input[type="button"]').click(function(){
        console.log("a lighting button pressed");
        event.preventDefault();

        $('#lighting input[type="button"].active').removeClass('active');
            $(this).addClass('active');
    });
    // *** end lighting form ***


    // *** start noise form ***
    $('#noise > input[type="button"]').click(function(){
        console.log("a noise button pressed");
        event.preventDefault();

        $('#noise input[type="button"].active').removeClass('active');
            $(this).addClass('active');
    });
    // *** end noise form ***


    // *** start activity form ***
    $('#activity > input[type="button"]').click(function(){
        console.log("an activity button pressed");
        event.preventDefault();

        $('#activity input[type="button"].active').removeClass('active');
            $(this).addClass('active');
    });
    // *** start temp form ***
// *** end read out activity states ***





// *** start submit function ***
    $('.submitButton').click(function(){
        console.log("submitButton clicked");
        
        if(PushbotsPlugin.isiOS()){
            console.log("pushbots isios");
            PushbotsPlugin.initializeiOS("5609620b1779591b758b4567");
        }
        
        // *** start save last input state of buttons ***
        
        function addToState(name, value) {
            window.localStorage.setItem(name, value);
            console.log("localstorage noise state: " + window.localStorage.getItem('noise'));
        };
  
        // *** end save last input state of buttons ***
        
        
        
        
        

        
        // *** start add values of all active buttons and UID to globalData ***
        $(".active").each( function () {
            console.log("active.each parent: " + $(this).parent().attr("id"));
            console.log("active.each val: " + $(this).attr("val") );
                    
            var nameU = $(this).parent().attr("id");
            var valueU = $(this).attr("val");
            
            addToGlobal(nameU, valueU);
            addToState(nameU, valueU);
        });
        
        // adds UID to globalData
        var appUID = window.localStorage.getItem('appUID');
        addToGlobal("appID", appUID);
        // *** end add values of all active buttons to globalData ***
        
        
        
        

        
        
        
        
        
        // *** start adding activity values to localstorage ***
        
        
        console.log("localvar: " + window.localStorage.getItem('Reading') );


        activityVal = globalData.activity;
        console.log("Act: " + activityVal);
        
        if (activityVal == "reading") {
            console.log("activityVal: reading");
            var readingInt = parseInt(window.localStorage.getItem('Reading'));
            console.log("readingInt: " + readingInt);
            var readingIntNew = readingInt + 1;
            window.localStorage.setItem('Reading', readingIntNew);
            console.log("localvar reading new: " + window.localStorage.getItem('Reading') );
            
        } else if (activityVal == "computer") {
            console.log("activityVal: computer");
            var computerInt = parseInt(window.localStorage.getItem('Computer'));
            console.log("computerInt: " + computerInt);
            var computerIntNew = computerInt + 1;
            window.localStorage.setItem('Computer', computerIntNew);
            console.log("localvar computer new: " + window.localStorage.getItem('Computer') );
        
        } else if (activityVal == "meeting") {
            console.log("activityVal: meeting");
            var meetingInt = parseInt(window.localStorage.getItem('Meeting'));
            console.log("meetingInt: " + meetingInt);
            var meetingIntNew = meetingInt + 1;
            window.localStorage.setItem('Meeting', meetingIntNew);
            console.log("localvar meeting new: " + window.localStorage.getItem('Meeting') );
        
        } else if (activityVal == "moving") {
            console.log("activityVal: moving");
            var movingInt = parseInt(window.localStorage.getItem('Moving'));
            console.log("movingInt: " + movingInt);
            var movingIntNew = movingInt + 1;
            window.localStorage.setItem('Moving', movingIntNew);
            console.log("localvar moving new: " + window.localStorage.getItem('Moving') );
        
        } else {
            console.log("activityVal: other");
            var otherInt = parseInt(window.localStorage.getItem('Other'));
            console.log("otherInt: " + otherInt);
            var otherIntNew = otherInt + 1;
            window.localStorage.setItem('Other', otherIntNew);
            console.log("localvar other new: " + window.localStorage.getItem('Other') );
        }




        // *** end adding activity values to localstorage ***
        
        





        
        // *** start define sensor functions ***
        
            function onSuccessLight(result) {
                addToGlobal("LightS", result);
            };

            function onSuccessNoise(result) {
                addToGlobal("NoiseS", result);
                // sending data in callback
                sendData();

            };
            
            function getNoise() {
                carrier.getAverageNoise(onSuccessNoise, onFailure);
            }
            
            function getLighting() {
                carrier.getLuminosity(onSuccessLight, onFailure);
            }
        
        // *** end define sensor functions ***
        
        
        
        // *** start local database ***
        
            function addGlobalToLocalDB() {
            
                /*var currentdate = new Date();
                    var datetime = currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/"
                        + currentdate.getFullYear() + " "
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
                        
                addToGlobal("date", currentdate);*/
                
                // *** start sql database ***
                    // create db with approx 10mb of storage
                    var db = window.openDatabase("localDB", "1.0", "Local DB", 10000000);
                    db.transaction(runTransaction, errorDB, successDB);
                    
                    
                        var noiseUdb = globalData.noise;
                        var lightUdb = globalData.lighting;
                        var noiseSdb = globalData.NoiseS;
                        var lightSdb = globalData.LightS;
                        
                        console.log("DB ready values: " + noiseUdb + ' ' + lightUdb + ' ' + lightSdb + ' ' + noiseSdb);
                    
                    
                        function runTransaction(t){
                            t.executeSql('CREATE TABLE IF NOT EXISTS comfort (id unique, noiseS, noiseU, lightS, lightU, date)');
                            t.executeSql("INSERT INTO comfort (noiseU, lightU, noiseS, lightS) VALUES ("+noiseUdb+", "+lightUdb+", "+noiseSdb+", "+lightSdb+")");
                        }
                        function errorDB(err){
                            console.log('Error creating tables: '+err);
                        }
                        function successDB(){
                            console.log('Successfully created tables');
                            window.location.href="question.html";
                        }

            
                // *** end sql database ***
                
            
            }
        // *** end local databse ***
       
        
        // *** start sensor data ***

        getNoise();
        getLighting();
        
        function sendData() {
            try {
                sendAppID();
                sendActivity();
                sendNoise();
                sendLighting();
                sendTemp();
                sendNoiseS();
                sendLightS();
                //sendJSON();
                addGlobalToLocalDB();
                // adds tag to the app
                PushbotsPlugin.tag("roman");
            }
            catch(err) {
                alert("There seems to be a problem with the connection to the Server! Please connect to the internet an restart the app.");
            }
        }
        
        // *** end sensor data ***
    });
// *** end submit function ***
                  


// *** start pushbot initialization ***


    
    /*if(PushbotsPlugin.isiOS()){
        console.log("pushbots isios");
        PushbotsPlugin.initializeiOS("5609620b1779591b758b4567");
        PushbotsPlugin.tag("roman");
    }*/
    

// *** end pushbot initialization ***
                  





});


