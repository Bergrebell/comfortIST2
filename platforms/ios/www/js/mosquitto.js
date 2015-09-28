var wsbroker = "86.119.31.113";
var wsport = 9001;
var client = new Paho.MQTT.Client(wsbroker, wsport,
                                  "myclientid_" + parseInt(Math.random() * 100, 10));

client.onConnectionLost = function (responseObject) {
    console.log("connection lost: " + responseObject.errorMessage);
};
client.onMessageArrived = function (message) {
    console.log(message.destinationName, ' -- ', message.payloadString);
};

var options = {
timeout: 3,
    
onSuccess: function () {
    console.log("mqtt connected");
    // Connection succeeded; subscribe to our topic, you can add multile lines of these
    //client.subscribe('/World', {qos: 1});
    
    // publish to a topic on connect
    message = new Paho.MQTT.Message("New User connected: " + window.localStorage.getItem('appUID'));
    message.destinationName = "/Connected";
    client.send(message);
    
},
onFailure: function (message) {
    console.log("Connection failed: " + message.errorMessage);
}
};
function initClient() {
    client.connect(options);
}


/*function sendJSON() {
    console.log("sendJSON entered")
    jsonString = JSON.stringify(globalData);
    message = new Paho.MQTT.Message(jsonString);
    message.destinationName = "/Data";
    client.send(message);
    window.location.href="question.html";
}*/

function sendAppID() {
    console.log("sendAppID entered")
    appIDValue = globalData.appID;
    message = new Paho.MQTT.Message(appIDValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/appID";
    client.send(message);
}

function sendActivity() {
    console.log("sendActivity entered")
    activityValue = globalData.activity;
    message = new Paho.MQTT.Message(activityValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/activity";
    client.send(message);
}

function sendNoise() {
    console.log("sendNoise entered")
    noiseValue = globalData.noise;
    message = new Paho.MQTT.Message(noiseValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/noise";
    client.send(message);
}


function sendLighting() {
    console.log("sendLighting entered")
    lightingValue = globalData.lighting;
    message = new Paho.MQTT.Message(lightingValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/lighting";
    client.send(message);
}

function sendTemp() {
    console.log("sendTemp entered")
    tempValue = globalData.temp;
    message = new Paho.MQTT.Message(tempValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/temp";
    client.send(message);
}

function sendLightS() {
    console.log("sendLightS entered")
    lightSValue = globalData.LightS;
    message = new Paho.MQTT.Message(lightSValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/lightS";
    client.send(message);
}

function sendNoiseS() {
    console.log("sendNoiseS entered")
    noiseSValue = globalData.NoiseS;
    message = new Paho.MQTT.Message(noiseSValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/noiseS";
    client.send(message);
}


