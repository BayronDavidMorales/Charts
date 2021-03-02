import data from './data.js'

// document.querySelector('.car').addEventListener('click', vehicleSelector);

const { reaccion, frenadoSeco, frenadoMojado} = data.car;


function vehicleSelector(id){
    // if(document.getElementById(id)==car){
    //     document.querySelector('vehicle').innerHTML ='<h2 class="vehicle">Automovil</h2>'
    //     const { reaccion, frenadoSeco, frenadoMojado } = data.car;
    // }
    // if (document.getElementById(id) == truck) {
    //     document.querySelector('vehicle').innerHTML = '<h2 class="vehicle">Camion</h2>'
    //     const { reaccion, frenadoSeco, frenadoMojado } = data.truck;
    // }
    // if (document.getElementById(id) == motorcycle) {
    //     document.querySelector('vehicle').innerHTML = '<h2 class="vehicle">Motocicleta</h2>'
    //     const { reaccion, frenadoSeco, frenadoMojado } = data.motorcycle;
    // }
    alert(id)
}


function totalCasesChart(ctx){
    const chart= new Chart(ctx, {
        type: 'line',
        data:{
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
                label: 'Frenado en Mojado',
                borderColor: 'yellow',
                data: frenadoMojado.map(item => item.metros)
                }
            ]
        },
        options:{
            title:{
                display:true,
                text: 'Datos rápidos de la distancia de frenado',
                fontSize: 30,
                padding:30,
                fontColor: '#12619c'
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Metros (m)',
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
            legend:{
                position: 'bottom',
                labels:{
                    padding: 20, 
                    boxWidth:25,
                    fontFamily: 'system-ui',
                    fontColor: 'black'
                }
            },
            layout:{
                padding:{right: 50},
                
            },
            tooltips:{
                backgroundColor: '#0584f6',
                titleFontSize: 20,
                xPadding: 20,
                yPaddinf:20,
                bodyFontSize: 15,
                bodySpacing:10,
                mode:'x'
            },
            elemets:{
                line:{
                    borderWidth: 8,
                    fill:false
                },
                point:{
                    radius: 6,
                    borderWidth:4,
                    backgroundColor:  'red',
                    hoverRadius: 10,
                    hoverBorderWidth:4
                }
            },
            scaleLabel:{
                display: true,
                labelString: 'Metros'
            
            },
        }
    });
    
}
function renderCharts(){
    const ctx =document.querySelector('#chart').getContext('2d');
    totalCasesChart(ctx);
}
renderCharts();