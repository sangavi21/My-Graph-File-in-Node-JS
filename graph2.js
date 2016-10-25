

// Include file system module.
var fs=require('fs');

// Include the readline module and read the csv file.
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('datafile.csv'),
});


function GDPChart(country, GDP) {
    this.country = country;
    this.GDP = GDP;

};

var country,GDP;
var indexCountry,indeXGDP;
var GDPArray = [];
var c=0;
//callback method to read a file line by line
lineReader.on('line', function (line) 
{

  var lineRecords = line.split(',');

  if (c==0) {

    //To Get the Index of country and GDP
    indexCountry = lineRecords.indexOf('Country Name');
    indexGDP = lineRecords.indexOf('GDP Billions(USD)2013');
    c++;
  } 
  else {
    country = lineRecords[indexCountry];
    

    if (!(country.indexOf('European Union')>-1)) {
      
      GDP = lineRecords[indexGDP];
      
      //Push the country and GDP value into an Array      
      GDPArray.push(new GDPChart(country, GDP));
      
      //Sort the values of GDP into Descending Order
      GDPArray.sort(function(a, b) {
                return parseFloat(b.GDP) - parseFloat(a.GDP)
            });
      
      //Convert into JSON object and write it into the JSON File
      fs.writeFileSync("barchart2.json", JSON.stringify(GDPArray), encoding = "utf8");
    }
  }

});




