import data from './data.js'

const globalButton = document.querySelector('.all');

const carButton = document.querySelector('.car');
const truckButton = document.querySelector('.truck');
const motorcycleButton = document.querySelector('.motorcycle');
const heartButton = document.querySelector('.heart');

globalButton.style.color = '#12619c';

const ctx = document.querySelector('#chart').getContext('2d');
const titleLegend = ['Automovil', 'Camion', 'Motocicleta', 'Peaton']


var barChartData = {
    labels: data.truck.reaccion.map(item => item.velocidad),
    datasets: [
    // car
    {   
        label: 'Reaccion',
        backgroundColor: "rgba(82,255,10,0.5)",
        data: data.car.reaccion.map(item => item.metros)
    }, {
        label: 'Frenado en seco',
            backgroundColor: "rgba(82,255,10,0.75)",
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
        backgroundColor: "rgba(255,5,2,0.5)",
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
        backgroundColor: "rgba(255, 233, 8, 0.6)",
        data: data.motorcycle.frenadoSeco.map(item => item.metros)
    }, {
        label: 'Frenado en mojado',
        backgroundColor: "rgba(255, 233, 0, 1)",
        data: data.motorcycle.frenadoMojado.map(item => item.metros)
    },   
]
};


window.graficaGlobal = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
        title: {
            display: true,
            text: 'Automovil',
            fontSize: 30,
            padding: 30,
            fontColor: '#12619c'
        },
        responsive: true,
        legend:{
            display: false,
        },
        legendCallback: function (graficaGlobal) {
            var text = [];
            text.push('<div style=" font-size: 12px; right:0;"><br> Reaccion <br> Frenado en seco <br> Frenado en mojado</div>');
            let j=0;
            for (var i = 0; i < graficaGlobal.data.datasets.length; i++) {
                if (i % 3 == 0) { 
                    text.push('<div>'); 
                    text.push('<div><b>' + titleLegend[j] + '</b></div>');
                }
                text.push('<div style="width: 30px; margin: auto; border-top: 1px solid gray; background-color:' + graficaGlobal.data.datasets[i].backgroundColor +'">ㅤ</div>');
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
            }]
        }
    }
});
document.querySelector('.legend').innerHTML= graficaGlobal.generateLegend();


function limpiarPantalla(n){
    try{
        switch (n) {
            case 1:
                if (window.graficaGlobal) {
                    window.graficaGlobal.clear();
                    window.graficaGlobal.destroy();
                }
                break;
            case 2:
                if (window.grafica) {
                    window.grafica.clear();
                    window.grafica.destroy();
                }
        }
    } catch (e) {
        console.log('grafica no existe');
    }
    
}

globalButton.onclick = () => {
    limpiarPantalla(2)
}

            
carButton.onclick = () => {

                limpiarPantalla(1);
                carButton.style.color = '#12619c';
                truckButton.style.color = '#5e6e77';
                motorcycleButton.style.color = '#5e6e77';
                heartButton.style.color = '#eb617f';
                let { reaccion, frenadoSeco, frenadoMojado } = data.car;
                var grafica = new Chart(ctx, {
                type: 'line',
                data : {
                    labels: reaccion.map(item => item.velocidad),
                    datasets: [
                    {
                        label: 'Reaccion',
                        borderColor: "rgb(255,5,19)",
                        data: reaccion.map(item => item.metros)
                    },
                    {
                        label: 'Frenado en seco',
                        borderColor: "rgb(82,255,10)",
                        data: frenadoSeco.map(item => item.metros)
                    },
                    {
                        label: 'Frenado en mojado',
                        borderColor: "rgb(255, 233, 0)",
                        data: frenadoMojado.map(item => item.metros)
                    }]
                },
                options: {
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
                                max: 110,
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
            })
                grafica.update({
                duration: 800,
                    easing: 'easeOutBack'
                });

    }
truckButton.onclick      = () => {
                carButton.style.color = '#5e6e77';
                truckButton.style.color = '#12619c';
                motorcycleButton.style.color = '#5e6e77';
                heartButton.style.color = '#eb617f';
                let { reaccion, frenadoSeco, frenadoMojado } = data.truck;
                var grafica = new Chart(ctx, {
                type: 'line',
                data : {
                    labels: reaccion.map(item => item.velocidad),
                    datasets: [
                    {
                        label: 'Reaccion',
                        borderColor: "rgb(255,5,19)",
                        data: reaccion.map(item => item.metros)
                    },
                    {
                        label: 'Frenado en seco',
                        borderColor: "rgb(82,255,10)",
                        data: frenadoSeco.map(item => item.metros)
                    },
                    {
                        label: 'Frenado en mojado',
                        borderColor: "rgb(255, 233, 0)",
                        data: frenadoMojado.map(item => item.metros)
                    }]
                },
                options: {
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
                                max: 140,
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
            })
            grafica.update({
                duration: 800,
                easing: 'easeOutBack'
            });

                
}
motorcycleButton.onclick = () => {
                carButton.style.color = '#5e6e77';
                truckButton.style.color = '#5e6e77';
                motorcycleButton.style.color = '#12619c';
                heartButton.style.color = '#eb617f';
                let { reaccion, frenadoSeco, frenadoMojado } = data.motorcycle;
                var grafica = new Chart(ctx, {
                type: 'line',
                data : {
                    labels: reaccion.map(item => item.velocidad),
                    datasets: [
                    {
                        label: 'Reaccion',
                        borderColor: "rgb(255,5,19)",
                        data: reaccion.map(item => item.metros)
                    },
                    {
                        label: 'Frenado en seco',
                        borderColor: "rgb(82,255,10)",
                        data: frenadoSeco.map(item => item.metros)
                    },
                    {
                        label: 'Frenado en mojado',
                        borderColor: "rgb(255, 233, 0)",
                        data: frenadoMojado.map(item => item.metros)
                    }]
                },
                options: {
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
                                max: 120,
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
            })
            grafica.update({
                duration: 800,
                easing: 'easeOutBack'
            });
                
}
heartButton.onclick = () => {
                carButton.style.color = '#5e6e77';
                truckButton.style.color = '#5e6e77';
                motorcycleButton.style.color = '#5e6e77';
                heartButton.style.color = '#f03e3e';
                let {posibilities } = data.survived;
                var grafica = new Chart(ctx, {
                type: 'line',
                data : {
                    labels: posibilities.map(item => item.velocity),
                    datasets: [
                    {
                        label: `posibilidades de que un peatón sobreviva a un choque al aumentar la velocidad del impacto.`,
                        borderColor: "rgb(255,5,19)",
                        data: posibilities.map(item => item.percent)
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
                                labelString: 'Probabilidad de sobrevivir',
                                fontSize: 18,
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
            grafica.update({
                duration: 800,
            });
}

