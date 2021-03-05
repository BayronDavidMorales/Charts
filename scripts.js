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

function hideGraph(n, id) { // n=0 => ocultar, n=1 => mostrar
    switch (n) {
        case 0:
            document.querySelector('.' + id).style.display = "none";
            break;
        case 1:
            document.querySelector('.' + id).style.display = "block";
            break
    }
}

function responsive(n){
    switch (n) {
        case 0:
        document.querySelector('#padre').style.width = '100%';
        document.querySelector('#padre').style.height = '90%';
        document.querySelector('#padre').style.display = 'grid';
        document.querySelector('#padre').style.margin = '3em';
    
        document.querySelector('.graph').style.width = '100%';
    
        document.querySelector('.menuButtons').style.display = 'flex';
        document.querySelector('.menuButtons').style.justifyContent = 'center';
        document.querySelector('.menuButtons').style.width = '100%';
        document.querySelector('.menuButtons').style.marginLeft = '50px';
    
        document.querySelector('.subtitle').style.margin = 'auto';
        document.querySelector('.subtitle').style.top = '-22px';
        break

        case 1:
            document.querySelector('.graph').style={
                width: '90%'
            };
            document.querySelector('.menuButtons').style = {
                display: 'grid',
                width: '10%',
                marginRight: '50px'
            };
            document.querySelector('#padre').style = {
                display: 'flex',
                width: '90%',
                marginRight: '50px',
                marginLeft: '3em',
                marginRight: '1em',
                position: 'relative'
            };
            break;
        default: responsive(0)
    }
}
responsive(0);
var barChartData = {
    labels: data.truck.reaccion.map(item => item.velocidad),
    datasets: [
        // car
        {
            label: 'Reacción en automovil',
            backgroundColor: "rgba(82,255,10,0.3)",
            data: data.car.reaccion.map(item => item.metros),
        }, {
            label: 'Frenado sobre seco en automovil',
            backgroundColor: "rgba(82,255,30,0.6)",
            data: data.car.frenadoSeco.map(item => item.metros)
        }, {
            label: 'Frenado sobre mojado en automovil',
            backgroundColor: "rgba(82,255,10,1)",
            data: data.car.frenadoMojado.map(item => item.metros),
        },
        // truck
        {
            label: 'Reacción en camión',
            backgroundColor: "rgba(255 ,5, 0,0.2)",
            data: data.truck.reaccion.map(item => item.metros)
        }, {
            label: 'Frenado sobre seco en camión',
            backgroundColor: "rgba(255,50,70,0.5)",
            data: data.truck.frenadoSeco.map(item => item.metros)
        }, {
            label: 'Frenado sobre mojado en camión',
            backgroundColor: "rgb(255,5,19)",
            data: data.truck.frenadoMojado.map(item => item.metros)
        },
        // motorcycle
        {
            label: 'Reacción en motocicleta',
            backgroundColor: "rgba(255, 233, 0, 0.3)",
            data: data.motorcycle.reaccion.map(item => item.metros)
        }, {
            label: 'Frenado sobre seco en motocicleta',
            backgroundColor: "rgba(255, 250, 38, 0.6)",
            data: data.motorcycle.frenadoSeco.map(item => item.metros)
        }, {
            label: 'Frenado sobre mojado en motocicleta',
            backgroundColor: "rgba(255, 233, 0, 1)",
            data: data.motorcycle.frenadoMojado.map(item => item.metros)
        },
        // peaton
        {
            label: 'Probabilidad de que un peatón sobreviva     .....',
            type: 'line',
            // borderColor: 'rgba(255, 0, 0, 0.3)',
            backgroundColor: "#293133",
            data: data.survived.posibilities.map(item => item.percent),
            yAxisID: "right-y-axis"
        },
    ]
};


var graficaGlobal = new Chart(ctxGlobal, {
    type: 'bar',
    data: barChartData,
    options: {
        // maintainAspectRatio: false,
        responsive: true,
        title: {
            display: true,
            text: 'Datos generales',
            fontSize: 25,
            fontColor: '#12619c'
        },
        legend: {
            display: true,
            position: 'right',
            align: 'start',
            rotation: '90',
            labels:{
                usePointStyle: 'true',

            }
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
                    }
                },
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
                        return "  "+value + " %"
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Indice de supervivencia del peatón',
                    fontSize: 18,
                    fontColor: '#293133',
                    
                },
                gridLines: 'false'
            },
            ]
        },
        tooltips:{
                backgroundColor: '#0584f6',
                enabled: true,
                mode: 'single',
                callbacks: {
                afterLabel: function (t, d) {
                    var xLabel = d.datasets[t.datasetIndex].label;
                    var yLabel = t.yLabel;
                    // if line chart
                        if (t.datasetIndex < 9) return "Velocidad y distancia recorrida por el vehículo desde frenar hasta detenerse";
                    // if bar chart
                    else return "En caso de siniestro vial";
                },
                
                title: function (tooltipItem, data) {
                    return "     v: " + data.labels[tooltipItem[0].index];
                },
                label: function (t, d) {
                    var xLabel = d.datasets[t.datasetIndex].label;
                    var yLabel = t.yLabel;
                    // if line chart
                    if (t.datasetIndex < 9) return xLabel + ': ' + yLabel + ' m';
                    // if bar chart
                    else return 'Probabilidad de que un peatón sobreviva al golpe: ' + yLabel + "%";
                },
                 
                
            }
        },
        elements: {
            line: {
                borderWidth: 4,
                fill: 'true',
            },
            point: {
                pointStyle: 'triangle',
                radius: 6,
                borderWidth: 5,
                hoverRadius: 6,
                hoverBackgroundColor: 'red',
                hoverBorderColor: 'red',
                hoverBorderWidth: 4
            }
        },
        
    }
});
// document.querySelector('.legend').innerHTML = graficaGlobal.generateLegend();


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
    options: {
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
            mode: 'x',
            callbacks: {
                beforeTitle: function (tooltipItem, data) {
                    return "Velocidad y distancia recorrida por el vehículo desde frenar hasta detenerse"
                },
                title: function (tooltipItem, data) {
                    return "" + data.labels[tooltipItem[0].index];
                },
                label: function (tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.yLabel + 'm'
                    return label;
                }

            }
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
})
globalButton.onclick = () => {
    responsive(0);

    carButton.style.color = '#5e6e77';
    truckButton.style.color = '#5e6e77';
    motorcycleButton.style.color = '#5e6e77';
    heartButton.style.color = '#f03e3e';
    globalButton.style.color = '#12619c';
    hideGraph(0, 'graficoIndividual')
    hideGraph(1, 'graficoGlobal')

}
carButton.onclick = () => {
    responsive(1);
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
                label: 'Reacción',
                borderColor: 'red',
                data: reaccion.map(item => item.metros)
            },
            {
                label: 'Frenado sobre seco',
                borderColor: "rgb(82,255,10)",
                data: frenadoSeco.map(item => item.metros)
            },
            {
                label: 'Frenado sobre mojado',
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
            titleFontSize: 15,
            mode: 'x',
            callbacks: {
                beforeTitle: function (tooltipItem, data) {
                    return "Velocidad y distancia recorrida por el vehículo desde frenar hasta detenerse"
                },
                title: function (tooltipItem, data) {
                    return "" + data.labels[tooltipItem[0].index];
                },
                label: function (tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.yLabel + 'm'
                    return label;
                }
                
            }
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
        

    });
}
truckButton.onclick = () => {
    responsive(1);
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
                label: 'Reacción',
                borderColor: 'red',
                data: reaccion.map(item => item.metros)
            },
            {
                label: 'Frenado sobre seco',
                borderColor: "rgb(82,255,10)",
                data: frenadoSeco.map(item => item.metros)
            },
            {
                label: 'Frenado sobre mojado',
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
            titleFontSize: 15,
            xPadding: 20,
            yPaddinf: 20,
            bodyFontSize: 15,
            bodySpacing: 10,
            mode: 'x',
            callbacks: {
                beforeTitle: function (tooltipItem, data) {
                    return "Velocidad y distancia recorrida por el vehículo desde frenar hasta detenerse"
                },
                title: function (tooltipItem, data) {
                    return "" + data.labels[tooltipItem[0].index];
                },
                label: function (tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.yLabel + 'm'
                    return label;
                }
            }
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
        
    });


}
motorcycleButton.onclick = () => {
    responsive(1);
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
                label: 'Reacción',
                borderColor: 'red',
                data: reaccion.map(item => item.metros)
            },
            {
                label: 'Frenado sobre seco',
                borderColor: "rgb(82,255,10)",
                data: frenadoSeco.map(item => item.metros)
            },
            {
                label: 'Frenado sobre mojado',
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
            titleFontSize: 15,
            xPadding: 20,
            yPaddinf: 20,
            bodyFontSize: 15,
            bodySpacing: 10,
            mode: 'x',
            callbacks: {
                beforeTitle: function (tooltipItem, data) {
                    return "Velocidad y distancia recorrida por el vehículo desde frenar hasta detenerse"
                },
                title: function (tooltipItem, data) {
                    return "" + data.labels[tooltipItem[0].index];
                },
                label: function (tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';

                    if (label) {
                        label += ': ';
                    }
                    label += tooltipItem.yLabel + 'm'
                    return label;
                }
            }
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
        
    });

}
heartButton.onclick = () => {
    responsive(1);
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
                label: `Probabilidad de que un peatón sobreviva al golpe`,
                borderColor: 'red',
                backgroundColor: "rgba(255,50,70,0.2)",
                data: posibilities.map(item => item.percent)
            }]
    }
    grafica.options = {
        title: {
            display: true,
            text: 'Indice de supervivencia del peatón',
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
                    labelString: 'Probabilidad',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Velocidad del vehículo',
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
            titleFontSize: 15,
            xPadding: 20,
            yPaddinf: 20,
            bodyFontSize: 15,
            bodySpacing: 10,
            mode: 'x',
            
                enabled: true,
                mode: 'single',
                callbacks: {
                    
                    title: function (tooltipItem, data) {
                        return "En caso de siniestro vial" 
                    },
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += tooltipItem.yLabel + '%'
                        return label;
                    }
                    
                }
        },
        elements: {
            line: {
                borderWidth: 4,
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
    hideGraph(0, 'graficoGlobal')
    hideGraph(1, 'graficoIndividual')
    grafica.update({
        duration: 2500,
    });
}
