var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

/* GET users listing. */
router.get('/:ticker', function(req, res, next) {

    companies = [];
    ticker = req.params.ticker;
    console.log("\napi call\n");
    
    fetch(`https://api.tiingo.com/tiingo/utilities/search?query=${ticker}&token=ab79e2f94d8d2281da9fed46e5eafac35d19807b`)
    .then(res => res.json())
    .then(data => processData(data))
    .then(data => res.send(data));

});

function processData(data) {

  var result = {
    companies: [],
    total: 0
  };

  for (var i = 0; i < data.length; i++){
    console.log()
    if (data[i].name) {
      result.companies.push({
        name: data[i].name,
        ticker: data[i].ticker
      })
    }

  }

  result.total = result.companies.length;

  return result;

}

module.exports = router;