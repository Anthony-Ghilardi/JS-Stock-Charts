import { mockData } from './mockData.js';

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=3dad661f285c4d3da8d272bc86e3878a');
    let result = await response.json()
    console.log(result)

        
    const {GME, MSFT, DIS, BNTX} = mockData
    const stocks = [GME, MSFT, DIS, BNTX];
    console.log(stocks)

    let highestPricePerStock = [];

    /***********Time chart below***********/    
        stocks.forEach( stock => stock.values.reverse())

        const timeChartContext = timeChartCanvas.getContext('2d');

        let timeChart = new Chart(timeChartContext, {
            type: 'line',
            data: {
                labels: stocks[0].values.map(value => value.datetime),
                datasets: stocks.map(stock => ({
                    label: stock.meta.symbol,
                    data: stock.values.map(value => parseFloat(value.high)),
                    backgroundColor: getColor(stock.meta.symbol),
                    borderColor: getColor(stock.meta.symbol),
                }))
            },
        });

/***********Highest stock price chart below***********/
        const highestPriceContext = highestPriceChartCanvas.getContext('2d');

        let highestPriceChart = new Chart(highestPriceContext, {
            type: 'bar',
            data: {
                labels: stocks.map(stock => stock.meta.symbol),
                datasets: [{
                    label: 'Highest',
                    data: getHighestStock(),
                    backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                    borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
                    borderWidth: 1
                }]
            }
        });

/***********Highest stock price Function found below***********/

console.log('Highest Price Per Stock:', highestPricePerStock);
function getHighestStock() {
    stocks.forEach(stock => {
        if (stock && stock.values) {
            let highValues = stock.values.map(value => parseFloat(value.high));
            let highestForStock = Math.max(...highValues);
            highestPricePerStock.push(highestForStock); // Fixed typo here
        }
    });
    return highestPricePerStock;
}


    /***********Color Function found below***********/
        function getColor(stock){
            if(stock === "GME"){
                return 'rgba(61, 161, 61, 0.7)'
            }
            if(stock === "MSFT"){
                return 'rgba(209, 4, 25, 0.7)'
            }
            if(stock === "DIS"){
                return 'rgba(18, 4, 209, 0.7)'
            }
            if(stock === "BNTX"){
                return 'rgba(166, 43, 158, 0.7)'
            }
        }
        
    };

    main()

// My api key 3dad661f285c4d3da8d272bc86e3878a

