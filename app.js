var weather = require("./weather.js");
var place = process.argv[2];
weather.get(place);