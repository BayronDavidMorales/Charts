import data from './data.js'

const globalButton = document.querySelector('.all');

const carButton = document.querySelector('.car');
const truckButton = document.querySelector('.truck');
const motorcycleButton = document.querySelector('.motorcycle');
const heartButton = document.querySelector('.heart');

globalButton.style.color = '#12619c';
document.querySelector('.graficoIndividual').style.display = 'none';


const ctx = document.querySelector('#chart').getContext('2d');
const ctxGlobal = document.querySelector('#chartGlobal').getContext('2d');

const titleLegend = ['Automovil', 'Camion', 'Motocicleta', 'Peaton']

function hideGraph(n, id){ // n=0 => ocultar, n=1 => mostrar
    switch(n){
        case 0:
            document.querySelector('.'+id).style.display = "none";
            break;
        case 1:
            document.querySelector('.'+id).style.display = "block";
            break
    }
}

var barChartData = {
    labels: data.truck.reaccion.map(item => item.velocidad),
    datasets: [
    // car
    {   
        label: 'Reaccion',
        backgroundColor: "rgba(82,255,10,0.3)",
        data: data.car.reaccion.map(item => item.metros),
    }, {
        label: 'Frenado en seco',
            backgroundColor: "rgba(82,255,30,0.6)",
        data: data.car.frenadoSeco.map(item => item.metros)
    }, {
        label: 'Frenado en mojado',
        backgroundColor: "rgba(82,255,10,1)",
        data: data.car.frenadoMojado.map(item => item.metros),
    },
    // truck
    {
        label: 'Reaccion',
        backgroundColor: "rgba(255 ,5, 0,0.2)",
        data: data.truck.reaccion.map(item => item.metros)
    }, {
        label: 'Frenado en seco',
        backgroundColor: "rgba(255,50,70,0.5)",
        data: data.truck.frenadoSeco.map(item => item.metros)
    }, {
        label: 'Frenado en mojado',
        backgroundColor: "rgb(255,5,19)",
        data: data.truck.frenadoMojado.map(item => item.metros)
    },
    // motorcycle
    {
        label: 'Reaccion',
        backgroundColor: "rgba(255, 233, 0, 0.3)",
        data: data.motorcycle.reaccion.map(item => item.metros)
    }, {
        label: 'Frenado en seco',
        backgroundColor: "rgba(255, 250, 38, 0.6)",
        data: data.motorcycle.frenadoSeco.map(item => item.metros)
    }, {
        label: 'Frenado en mojado',
        backgroundColor: "rgba(255, 233, 0, 1)",
        data: data.motorcycle.frenadoMojado.map(item => item.metros)
    },   
    // peaton
    {
        label: 'Peatón',
        type: 'line',
        borderColor: "rgb(224, 87, 87)",
        data: data.survived.posibilities.map(item => item.percent),
        yAxisID: "right-y-axis"
    },
]
};


var graficaGlobal = new Chart(ctxGlobal, {
    type: 'bar',
    data: barChartData,
    options: {
        title: {
            display: true,
            text: 'Datos generales',
            fontSize: 25,
            // padding: 30,
            fontColor: '#12619c'
        },
        responsive: true,
        legend:{
            display: false,
        },
        legendCallback: function (graficaGlobal) {
            var text = [];
            text.push('<div style=" font-size: 9px; right:0;"><br> Reaccion <br> Frenado en seco <br> Frenado en mojado</div>');
            let j=0;
            for (var i = 0; i < graficaGlobal.data.datasets.length; i++) {
                if (i % 3 == 0) { 
                    text.push('<div>'); 
                    text.push('<div><b>' + titleLegend[j] + '</b></div>');
                }
                text.push('<div style="width: 30px; height: 10px; margin: auto; border-top: 1px solid gray; background-color:' + graficaGlobal.data.datasets[i].backgroundColor +'">ㅤ</div>');
                if (i % 3 == 2) { text.push('</div>'); j++}
            }
            return text.join("");
        },
        scales: {
            xAxes: [{
                display: true,
                text: 'Distancia',
                scaleLabel: {
                    display: true,
                    labelString: 'Velocidad ',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    callback: function (value) {
                        return value + " m"
                    }},
                    scaleLabel: {
                    display: true,
                    labelString: 'Distancia ',
                    fontSize: 21,
                    fontColor: '#12619c'
                    }
            }, {
                    id: "right-y-axis",
                    position: "right",
                    ticks: {
                        min: 0,
                        callback: function (value) {
                            return value + " %"
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Indice de supervivencia del peatón',
                        fontSize: 18,
                        fontColor: 'rgb(224, 87, 87)',
                    },
                    gridLines: 'false'
                },
        ]
        },
        elements: {
            line: {
                borderWidth: 1,
                fill: 'false',
            },
            point:{
                pointStyle: 'triangle'
            }
        },
        tooltips:{
            mode: 'x'
        }
    }
});
document.querySelector('.legend').innerHTML= graficaGlobal.generateLegend();


var grafica = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.survived.posibilities.map(item => item.velocity),
        datasets: [
            {
                label: `probabilidad de sobrevivir a un choque al aumentar la velocidad del impacto.`,
                borderColor: 'red',
                data: data.survived.posibilities.map(item => item.percent)
            }]
    },
    options:{
        title: {
            display: true,
            text: 'Peaton',
            fontSize: 30,
            padding: 30,
            fontColor: '#12619c'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                    callback: function (value) {
                        return value + " %"
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Porcentaje ',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Velocidad ',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }]
        },
        legend: {
            position: 'top',
            labels: {
                boxWidth: 15,
                yPaddinf: 50,
                fontFamily: 'system-ui',
                fontColor: '#034475'
            }
        },
        layout: {
            padding: { right: 50 },
        },
        tooltips: {
            backgroundColor: '#0584f6',
            titleFontSize: 20,
            xPadding: 20,
            yPaddinf: 20,
            bodyFontSize: 15,
            bodySpacing: 10,
            mode: 'x'
        },
        elements: {
            line: {
                borderWidth: 4,
                // fill: false
            },
            point: {
                radius: 6,
                borderWidth: 4,
                backgroundColor: 'white',
                hoverRadius: 10,
                hoverBorderWidth: 4
            }
        },
    }})
globalButton.onclick = () => {
    graficaGlobal.update({
        duration: 800,
    });
    carButton.style.color = '#5e6e77';
    truckButton.style.color = '#5e6e77';
    motorcycleButton.style.color = '#5e6e77';
    heartButton.style.color = '#f03e3e';
    globalButton.style.color = '#12619c';
    hideGraph(0, 'graficoIndividual')
    hideGraph(1, 'graficoGlobal')

    
    grafica.update({
        duration: 800,
        easing: 'easeOutBack'

    });

}
carButton.onclick = () => {
    hideGraph(0, 'graficoGlobal')
    hideGraph(1, 'graficoIndividual')

    carButton.style.color = '#12619c';
    truckButton.style.color = '#5e6e77';
    motorcycleButton.style.color = '#5e6e77';
    heartButton.style.color = '#eb617f';
    globalButton.style.color = '#5e6e77';

    var { reaccion, frenadoSeco, frenadoMojado } = data.car;

    grafica.data = {
        labels: reaccion.map(item => item.velocidad),
        datasets: [
            {
                label: 'Reaccion',
                borderColor: 'red',
                data: reaccion.map(item => item.metros)
            },
            {
                label: 'Frenado en seco',
                borderColor: 'green',
                data: frenadoSeco.map(item => item.metros)
            },
            {
                label: 'Frenado en mojado',
                borderColor: 'yellow',
                data: frenadoMojado.map(item => item.metros)
            }]
    }
    grafica.options = {
        title: {
            display: true,
            text: 'Automovil',
            fontSize: 30,
            padding: 30,
            fontColor: '#12619c'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                    callback: function (value) {
                        return value + " m"
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Distancia',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Velocidad',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }]
        },
        legend: {
            position: 'top',
            labels: {
                boxWidth: 15,
                yPaddinf: 50,
                fontFamily: 'system-ui',
                fontColor: '#034475'
            }
        },
        layout: {
            padding: { right: 50 },
        },
        tooltips: {
            backgroundColor: '#0584f6',
            titleFontSize: 20,
            xPadding: 20,
            yPaddinf: 20,
            bodyFontSize: 15,
            bodySpacing: 10,
            mode: 'x'
        },
        elements: {
            line: {
                borderWidth: 4,
                // fill: false
            },
            point: {
                radius: 6,
                borderWidth: 4,
                backgroundColor: 'white',
                hoverRadius: 10,
                hoverBorderWidth: 4
            }
        },
    }
    grafica.update({
        duration: 800,
        easing: 'easeOutBack'

    });
}
truckButton.onclick = () => {
    hideGraph(0, 'graficoGlobal')
    hideGraph(1, 'graficoIndividual')
    carButton.style.color = '#5e6e77';
    truckButton.style.color = '#12619c';
    motorcycleButton.style.color = '#5e6e77';
    heartButton.style.color = '#eb617f';
    globalButton.style.color = '#5e6e77';
    var { reaccion, frenadoSeco, frenadoMojado } = data.truck;
    grafica.data = {
        labels: reaccion.map(item => item.velocidad),
        datasets: [
            {
                label: 'Reaccion',
                borderColor: 'red',
                data: reaccion.map(item => item.metros)
            },
            {
                label: 'Frenado en seco',
                borderColor: 'green',
                data: frenadoSeco.map(item => item.metros)
            },
            {
                label: 'Frenado en mojado',
                borderColor: 'yellow',
                data: frenadoMojado.map(item => item.metros)
            }]
    }
    grafica.options = {
        title: {
            display: true,
            text: 'Camion',
            fontSize: 30,
            padding: 30,
            fontColor: '#12619c'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 120,
                    callback: function (value) {
                        return value + " m"
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Distancia ',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Velocidad ',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }]
        },
        legend: {
            position: 'top',
            labels: {
                boxWidth: 15,
                yPaddinf: 50,
                fontFamily: 'system-ui',
                fontColor: '#034475'
            }
        },
        layout: {
            padding: { right: 50 },
        },
        tooltips: {
            backgroundColor: '#0584f6',
            titleFontSize: 20,
            xPadding: 20,
            yPaddinf: 20,
            bodyFontSize: 15,
            bodySpacing: 10,
            mode: 'x'
        },
        elements: {
            line: {
                borderWidth: 4,
                // fill: false
            },
            point: {
                radius: 6,
                borderWidth: 4,
                backgroundColor: 'white',
                hoverRadius: 10,
                hoverBorderWidth: 4
            }
        },
    }
    grafica.update({
        duration: 800,
        easing: 'easeOutBack'
    });


}
motorcycleButton.onclick = () => {
    hideGraph(0, 'graficoGlobal')
    hideGraph(1, 'graficoIndividual')
    carButton.style.color = '#5e6e77';
    truckButton.style.color = '#5e6e77';
    motorcycleButton.style.color = '#12619c';
    heartButton.style.color = '#eb617f';
    globalButton.style.color = '#5e6e77';

    var { reaccion, frenadoSeco, frenadoMojado } = data.motorcycle;
    grafica.data = {
        labels: reaccion.map(item => item.velocidad),
        datasets: [
            {
                label: 'Reaccion',
                borderColor: 'red',
                data: reaccion.map(item => item.metros)
            },
            {
                label: 'Frenado en seco',
                borderColor: 'green',
                data: frenadoSeco.map(item => item.metros)
            },
            {
                label: 'Frenado en mojado',
                borderColor: 'yellow',
                data: frenadoMojado.map(item => item.metros)
            }]
    }
    grafica.options = {
        title: {
            display: true,
            text: 'Motocicleta',
            fontSize: 30,
            padding: 30,
            fontColor: '#12619c'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 110,
                    callback: function (value) {
                        return value + " m"
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Distancia ',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Velocidad ',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }]
        },
        legend: {
            position: 'top',
            labels: {
                boxWidth: 15,
                yPaddinf: 50,
                fontFamily: 'system-ui',
                fontColor: '#034475'
            }
        },
        layout: {
            padding: { right: 50 },
        },
        tooltips: {
            backgroundColor: '#0584f6',
            titleFontSize: 20,
            xPadding: 20,
            yPaddinf: 20,
            bodyFontSize: 15,
            bodySpacing: 10,
            mode: 'x'
        },
        elements: {
            line: {
                borderWidth: 4,
                // fill: false
            },
            point: {
                radius: 6,
                borderWidth: 4,
                backgroundColor: 'white',
                hoverRadius: 10,
                hoverBorderWidth: 4
            }
        },
    }
    grafica.update({
        duration: 800,
        easing: 'easeOutBack'
    });

}
heartButton.onclick = () => {
    hideGraph(0, 'graficoGlobal')
    hideGraph(1, 'graficoIndividual')
    carButton.style.color = '#5e6e77';
    truckButton.style.color = '#5e6e77';
    motorcycleButton.style.color = '#5e6e77';
    heartButton.style.color = '#f03e3e';
    globalButton.style.color = '#5e6e77';

    var { posibilities } = data.survived;
    grafica.data = {
        labels: posibilities.map(item => item.velocity),
        datasets: [
            {
                label: `Probabilidad de que un peatón sobreviva a un choque`,
                borderColor: 'red',
                data: posibilities.map(item => item.percent)
            }]
    }
    grafica.options = {
        title: {
            display: true,
            text: 'Peaton',
            fontSize: 30,
            padding: 30,
            fontColor: '#12619c'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                    callback: function (value) {
                        return value + " %"
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Probabilidad ',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Velocidad del vehiculo',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }]
        },
        legend: {
            position: 'top',
            labels: {
                boxWidth: 15,
                yPaddinf: 50,
                fontFamily: 'system-ui',
                fontColor: '#034475'
            }
        },
        layout: {
            padding: { right: 50 },
        },
        tooltips: {
            backgroundColor: '#0584f6',
            titleFontSize: 20,
            xPadding: 20,
            yPaddinf: 20,
            bodyFontSize: 15,
            bodySpacing: 10,
            mode: 'x'
        },
        elements: {
            line: {
                borderWidth: 4,
                // fill: false
            },
            point: {
                radius: 6,
                borderWidth: 4,
                backgroundColor: 'white',
                hoverRadius: 10,
                hoverBorderWidth: 4,
                pointStyle: 'triangle'
            }
        },
    }
    grafica.update({
        duration: 800,
    });
}