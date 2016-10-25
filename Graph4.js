
const fs = require('fs');
var c = 0;
var country,indexCountry;
var population, indexPopulation;
var GDP, indexGDP;

var limit, limit1, index, index1;
var asiaContinent = ['India', 'China', 'Japan', 'Indonesia'];
var europeContinent = ['France', 'Russia', 'UK', 'Italy'];
var northAmericaContinent = ['Japan', 'Mexico', 'canada', 'USA'];
var southAmericaContinent = ['Saudi Arabia', 'Republic of Korea', 'Turkey'];
var australiaContinent = ['United Kingdom', 'Australia'];
var africaContinent = ['South Africa', 'Argentina', 'Brazil'];
var aggregateArray = [];
var arrContinentwisePopulation = [0, 0, 0, 0, 0, 0];
var arrContinentwiseGDP = [0, 0, 0, 0, 0, 0];
var arrContinents = ["africa", "europe", "northAmerica", "southAmerica", "australia", "asia"];

var lineReader = require('readline').createInterface({
  input: fs.createReadStream('datafile.csv'),
});

function aggregate(arrContinents, arrContinentwisePopulation, arrContinentwiseGDP) {
    this.continent = arrContinents;
    this.population = arrContinentwisePopulation;
    this.GDP = arrContinentwiseGDP;

}

lineReader.on('line', function (line) 
{

  var lineRecords = line.trim().split(',');

  if (c==0) {
   		 indexCountry = lineRecords.indexOf('Country Name');
   		 indexPopulation = lineRecords.indexOf('Population (Millions) 2013');
         indexGDP = lineRecords.indexOf('GDP Billions(USD)2013');  
        c++;
  } 
  else {
    country = lineRecords[indexCountry];
    
    if (!(country.indexOf('European Union')>-1)) {

    	population = lineRecords[indexPopulation];
		GDP = lineRecords[indexGDP];
						
      	index = parseInt(indexPopulation);
            index1 = parseInt(indexGDP);

            limitpop = indexPopulation + parseInt(6);
            limitGDP = indexGDP + parseInt(6);
           // console.log(limitpop+ " "+limitGDP);
            
            for (index = indexPopulation; index < limitpop; index++) {
                if (africaContinent.indexOf(country) > -1) {
                    continent = arrContinents[0];
                    arrContinentwisePopulation[0] = parseFloat(arrContinentwisePopulation[0]) + parseFloat(lineRecords[index]);
                 // console.log(arrContinentwisePopulation[0]);   
                } else if (europeContinent.indexOf(country) > -1) {
                    continent = arrContinents[1];
                    arrContinentwisePopulation[1] = parseFloat(arrContinentwisePopulation[1]) + parseFloat(lineRecords[index]);
                } else if (northAmericaContinent.indexOf(country) > -1) {
                    continent = arrContinents[2];
                    arrContinentwisePopulation[2] = parseFloat(arrContinentwisePopulation[2]) + parseFloat(lineRecords[index]);

                } else if (southAmericaContinent.indexOf(country) > -1) {
                    continent = arrContinents[3];
                    arrContinentwisePopulation[3] = parseFloat(arrContinentwisePopulation[3]) + parseFloat(lineRecords[index]);

                } else if (australiaContinent.indexOf(country) > -1) {
                    continent = arrContinents[4];
                    arrContinentwisePopulation[4] = parseFloat(arrContinentwisePopulation[4]) + parseFloat(lineRecords[index]);

                } else if (asiaContinent.indexOf(country) > -1) {
                    continent = arrContinents[5];

                    arrContinentwisePopulation[5] = parseFloat(arrContinentwisePopulation[5]) + parseFloat(lineRecords[index]);

                }
            }




            for (index1 = indexGDP; index1 < limitGDP; index1++) {
                if (africaContinent.indexOf(country) > -1) {
                    continent = arrContinents[0];
                    arrContinentwiseGDP[0] = parseFloat(arrContinentwiseGDP[0]) + parseFloat(lineRecords[index1]);

                } else if (europeContinent.indexOf(country) > -1) {
                    continent = arrContinents[1];
                    arrContinentwiseGDP[1] = parseFloat(arrContinentwiseGDP[1]) + parseFloat(lineRecords[index1]);

                } else if (northAmericaContinent.indexOf(country) > -1) {
                    continent = arrContinents[2];
                    arrContinentwiseGDP[2] = parseFloat(arrContinentwiseGDP[2]) + parseFloat(lineRecords[index1]);

                } else if (southAmericaContinent.indexOf(country) > -1) {
                    continent = arrContinents[3];
                    arrContinentwiseGDP[3] = parseFloat(arrContinentwiseGDP[3]) + parseFloat(lineRecords[index1]);

                } else if (australiaContinent.indexOf(country) > -1) {

                    continent = arrContinents[4];
                    arrContinentwiseGDP[4] = parseFloat(arrContinentwiseGDP[4]) + parseFloat(lineRecords[index]);

                } else if (asiaContinent.indexOf(country) > -1) {
                    continent = arrContinents[5];
                    arrContinentwiseGDP[5] = parseFloat(arrContinentwiseGDP[5]) + parseFloat(lineRecords[index]);

                }

            }

            if (country.length == 0) {
                for (var agg = 0; agg < 6; agg++) {
                    //Push the Aggregate value of GDP and population  into an Array
                    aggregateArray.push(new aggregate(arrContinents[agg], arrContinentwisePopulation[agg], arrContinentwiseGDP[agg]));
                }
                
                //Convert into JSON object and write it into the JSON File
                fs.writeFileSync("barchart4.json", JSON.stringify(aggregateArray), encoding = "utf8");
            }

       }

    }

});