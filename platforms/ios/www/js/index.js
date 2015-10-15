
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




$(document).ready(function() {
//document.addEventListener("deviceready", function(){
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
       
        // *** start prompt box to set tag name ***

        if (localStorage.getItem('tagName') === "null") {
            console.log("tagname === null");
            var tagName = prompt("Please enter your first name", "eg Peter");
            window.localStorage.setItem('tagName', tagName);
        }else{
            console.log("tagname not empty!?");
        }
        
        // *** end prompt box to set tag name ***

        
       console.log("second time app launch");
       var appUID = window.localStorage.getItem('appUID');
       console.log("Old AppID: "+ appUID);
       

       
    }else{
        //Local storage is not set, hence first time launch. set the local storage item
        
        // *** start prompt box if tagName is not set ***
        var tagName = prompt("Please enter your first name", "eg Peter");
        window.localStorage.setItem('tagName', tagName);
        // *** end prompt box if tagName is not set ***
        
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
                console.log("tagName on sendData(): " + window.localStorage.getItem('tagName'));
                PushbotsPlugin.tag(window.localStorage.getItem('tagName'));
            }
            catch(err) {
                alert("There seems to be a problem with the connection to the Server! Please connect to the internet an restart the app.");
            }
        }
        
        // *** end sensor data ***
    });
// *** end submit function ***


// *** start help button function ***
                  
$('#help').click(function() {
    var overlay = jQuery('<div id="overlay">\
                            <h3>Instructions</h3>\
                                <p>The purpose of the survey is to find out if there\'s a relationship between objective data measured by the built in smartphone sensors and the perceived comfort. To collect this data you are asked several times a day to fill out a small form. This happens via push notifications on your smartphone. If you take part in the survey please keep the following points in mind:</p>\
                                 <ul>\
                                  <li>If you\'ve missed a single notification please answer as soon as you can. If you\'ve missed more then one notification please only answer once.</li>\
                                  <li>To gather objective information the application needs to collect data from the built-in sensors. Therefore it accesses the luminosity sensor and the microphone. This information, together with the data entered into the form, is sent to a server.</li>\
                                  <li>To participate in the experiment it\'s important that you\'ve turned on the Auto-Brightness feature of your iPhone and that you\'ve enabled Push Notifications. The app also needs the permission to access the microphone. No audio files are saved or sent from the app. The microphone only measures the sound pressure.</li>\
                                  <li>As soon as you\'ve pressed the submit button you get prompted to a page with a small visualization of the data you\'ve entered so far. You can leave the app at any time by pressing the home button.</li>\
                                  <li>Please disable the Vibration mode and set the volume to an adequate level so that you will notice if you\'ve received a push notification. </li>\
                                  <li>The application sends push notifications from 8 AM to 7 PM for two days. If you like leave the experiment just delete the application from your device.</li>\
                                  <li>If you have any questions please feel free to write an email to romanrick.kuepper@unifr.ch.</li>\
                                </ul>\
                          </div>');
    overlay.appendTo(document.body);
    
    
    //removes the overlay on click
    $('#overlay').click(function() {
        $('#overlay').remove();
    });
});



// *** end help button function ***



// *** start pushbot initialization ***


    
    /*if(PushbotsPlugin.isiOS()){
        console.log("pushbots isios");
        PushbotsPlugin.initializeiOS("5609620b1779591b758b4567");
        PushbotsPlugin.tag("roman");
    }*/
    

// *** end pushbot initialization ***
                  





});


