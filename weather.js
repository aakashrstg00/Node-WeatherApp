const https = require("https");
let yahooURL = {
    how_to_use: '.query.results.channel.item.(condition.(temp,text),forecast[i].(day,date,high,low,text))'
    , url1: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20u%3D%22C%22%20and%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'
    , url2: '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
};
let printWeather = (place, temp, text) => console.log("Weather in " + place + " is " + temp + ".C  :  " + text);

function getWeather(place) {
    try {
        const request = https.get(yahooURL.url1 + place + yahooURL.url2, function (response, err) {
            if (err) {
                console.error("Error : " + err.message + " : " + err.statusCode);
            }
            else {
                let mausam = "";
                response.on('data', function (data) {
                    mausam += data.toString();
                });
                try {
                    response.on('end', function () {
                        weather = JSON.parse(mausam);
                        if (weather.query.count == "null") {
                            printWeather(place, weather.query.results.channel.item.condition.temp, weather.query.results.channel.item.condition.text);
                        }
                        else {
                            console.error("City not found ");
                        }
                    });
                }
                catch (error) {
                    console.error("City not found : ", error.statusCode);
                }
            }
        }).on('error', function (error) {
            console.error("Error happened !! (" + error.message + ")");
        });
    }
    catch (error) {
        console.error("Error : ", error.message);
    }
}
module.exports.get = getWeather;