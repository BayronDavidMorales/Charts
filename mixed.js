import data from './data.js'
const { reaccion, frenadoSeco, frenadoMojado } = data;

var barChartData = {
    labels: reaccion.map(item => item.velocidad),
    datasets: [{
        label: 'Reaccion',
        backgroundColor: "rgba(220,220,220,0.5)",
        data: reaccion.map(item => item.metros)
    }, {
        label: 'Frenado en seco',
        backgroundColor: "rgba(151,187,205,0.5)",
        data: frenadoSeco.map(item => item.metros)
    }, {
        label: 'Frenado en mojado',
        backgroundColor: "rgba(82,154,190,0.5)",
        data: frenadoMojado.map(item => item.metros)
    }]

};

var ctx = document.getElementById("chart").getContext("2d");
var myBar = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
        title: {
            display: true,
            text: "Chart.js Bar Chart - Stacked"
        },
        tooltips: {
            mode: 'label',
     
        },
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
});


