

// Include file system module.
var fs=require('fs');

// Include the readline module and read the csv file.
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('datafile.csv'),
});


function purchasingPowerChart(country, purchasingPowesrByCountry) {
    this.country = country;
    this.purchasingPowerByCountry = purchasingPowerByCountry;

};

var country,purchasingPowerByCountry;
var indexCountry,indexPurchasingPowerByCountry;
var purchasingPowerByCountryArray= [];
var c=0;
//callback method to read a file line by line
lineReader.on('line', function (line) 
{

  var lineRecords = line.split(',');

  if (c==0) {
    indexCountry = lineRecords.indexOf('Country Name');
    indexPurchasingPowerByCountry = lineRecords.indexOf('GDP_for_ Purchasing-Power-Parity(PPP)2013');
    c++;
  } 
  else {
    country = lineRecords[indexCountry];
    
    if (!(country.indexOf('European Union')>-1)) {
      
       purchasingPowerByCountry = lineRecords[indexPurchasingPowerByCountry];
       
       //Push the country and Purchasing Power value into an Array          
       purchasingPowerByCountryArray.push(new purchasingPowerChart(country, purchasingPowerByCountry));

       //Sort the values of Purchasing power into Descending Order
       purchasingPowerByCountryArray.sort(function(a, b) {
                return parseFloat(b.purchasingPowerByCountry) - parseFloat(a.purchasingPowerByCountry)
            });
      
      //Convert into JSON object and write it into the JSON File
      fs.writeFileSync("barchart3.json", JSON.stringify(purchasingPowerByCountryArray), encoding = "utf8");
    }
  }

});




