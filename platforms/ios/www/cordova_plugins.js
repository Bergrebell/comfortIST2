cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.pushbots.push/www/pushbots.js",
        "id": "com.pushbots.push.PushbotsPlugin",
        "clobbers": [
            "PushbotsPlugin"
        ]
    },
    {
        "file": "plugins/com.cordovaprogramming.carrier/carrier.js",
        "id": "com.cordovaprogramming.carrier.carrier",
        "clobbers": [
            "carrier"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.pushbots.push": "1.2.7",
    "com.cordovaprogramming.carrier": "1.0.2"
}
// BOTTOM OF METADATA
});