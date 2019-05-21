let api = require("nekos-moosik");
let { GOOGLE_API_KEY } = require("./config.js");

let music = new api.musicClient(GOOGLE_API_KEY);

module.exports = music;
