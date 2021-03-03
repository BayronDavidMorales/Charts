import data from './data.js'

const carButton = document.querySelector('.car');
const truckButton = document.querySelector('.truck');
const motorcycleButton = document.querySelector('.motorcycle');
const heartButton = document.querySelector('.heart');
carButton.style.color = '#12619c';


var { reaccion, frenadoSeco, frenadoMojado} = data.car;

const ctx = document.querySelector('#chart').getContext('2d');

var grafica = new Chart(ctx, {
    type: 'line',
    data: {
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
            }
        ]
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
                    max: 100,
                    callback: function (value) {
                        return value + " m"
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Distancia (m)',
                    fontSize: 21,
                    fontColor: '#12619c'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Velocidad (km/h)',
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
    });
            
carButton.onclick = () => {
                // carButton.style.fontSize= '45px';
                carButton.style.color = '#12619c';
                truckButton.style.color = '#5e6e77';
                motorcycleButton.style.color = '#5e6e77';
                heartButton.style.color = '#eb617f';
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
                grafica.options= {
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
                                labelString: 'Distancia (m)',
                                fontSize: 21,
                                fontColor: '#12619c'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Velocidad (km/h)',
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
truckButton.onclick      = () => {
                carButton.style.color = '#5e6e77';
                truckButton.style.color = '#12619c';
                motorcycleButton.style.color = '#5e6e77';
                heartButton.style.color = '#eb617f';
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
                grafica.options= {
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
                                labelString: 'Distancia (m)',
                                fontSize: 21,
                                fontColor: '#12619c'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Velocidad (km/h)',
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
                carButton.style.color = '#5e6e77';
                truckButton.style.color = '#5e6e77';
                motorcycleButton.style.color = '#12619c';
                heartButton.style.color = '#eb617f';
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
                grafica.options= {
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
                                labelString: 'Distancia (m)',
                                fontSize: 21,
                                fontColor: '#12619c'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Velocidad (km/h)',
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
                carButton.style.color = '#5e6e77';
                truckButton.style.color = '#5e6e77';
                motorcycleButton.style.color = '#5e6e77';
                heartButton.style.color = '#f03e3e';
                var {posibilities } = data.survived;
                grafica.data = {
                    labels: posibilities.map(item => item.velocity),
                    datasets: [
                    {
                        label: 'posibilidades de que un peatón sobreviva a un choque al aumentar la velocidad del impacto.',
                        borderColor: 'red',
                        data: posibilities.map(item => item.percent)
                    }]
                }
                grafica.options= {
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
                                labelString: 'Porcentaje (%)',
                                fontSize: 21,
                                fontColor: '#12619c'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Velocidad (km/h)',
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

