require('dotenv').config()
var jsfile = process.env.JSFile

require(`./${jsfile}.js`)