// Include file system module.
var fs=require('fs');

// Include the readline module and read the csv file.
var lineReader = require('readline').createInterface({
	input: fs.createReadStream('datafile.csv'),
});


function populationChart(country, population) {

	this.country = country;
	this.population = population;
};

var country,population;
var indexCountry,indexPopulation;
var populationArray = [];
var c=0;
//callback method to read a file line by line
lineReader.on('line', function (line) 
{

	var lineRecords = line.split(',');
	if (c==0) {

		//To Get the Index of country and population
		indexCountry = lineRecords.indexOf('Country Name');
		indexPopulation = lineRecords.indexOf('Population (Millions) 2013');
		c++;
	} 
	else {
		country = lineRecords[indexCountry];
		if (!(country.indexOf('European Union')>-1)) {
			
			population = lineRecords[indexPopulation];			
			
			//Push the country and population value into an Array
			populationArray.push(new populationChart(country, population));
			
			//Sort the values of Population into Descending Order
			populationArray.sort(function(a, b) {
				return parseFloat(b.population) - parseFloat(a.population)
			});
			
			//Convert into JSON object and write it into the JSON File
			fs.writeFileSync("barchart1.json", JSON.stringify(populationArray), encoding = "utf8");
		}
	}

});




