async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    async function getStonks(){
        let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=3dad661f285c4d3da8d272bc86e3878a', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let result = await response.json()
        let GME = result.GME
        let MSFT = result.MSFT
        let DIS = result.DIS
        let BNTX = result.BNTX

        const stocks = [GME, MSFT, DIS, BNTX];
        console.log(stocks[0].values)

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
        
        stocks.forEach( stock => stock.values.reverse())

        new Chart(timeChartCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: stocks[0].values.map(value => value.datetime),
                datasets: stocks.map( stock => ({
                    label: stock.meta.symbol,
                    data: stock.values.map(value => parseFloat(value.high)),
                    backgroundColor:getColor(stock.meta.symbol),
                    borderColor: getColor(stock.meta.symbol),
                }))
            }
        });
        
    }
    getStonks()

}

// My api key 3dad661f285c4d3da8d272bc86e3878a

main()