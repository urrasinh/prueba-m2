const heroNombre = document.querySelector("#hero-nombre")
const heroBando = document.querySelector("#hero-bando")
const heroTabla = document.querySelector("#hero-tabla")
const heroImagen = document.querySelector("#hero-imagen")
const heroFormulario = document.querySelector("#hero-formulario")
const heroBuscar = document.querySelector("#hero-buscar")

const grafico = (d) => {
    console.log(d)
    let estadisticas = [] // variable arreglo vacio

    Object.entries(d.powerstats).forEach((s) => {  
        estadisticas.push({ 
            label: s[0], 
            y: s[1], 
        })
    })

    let config = {
        data: [
            {
                type: "pie",
                animationEnabled: true,
                //startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: estadisticas,
            }
        ]
    }
console.log(estadisticas)
    let chart = new CanvasJS.Chart("estadisticas", config)

    chart.render()

}


heroFormulario.addEventListener("submit", (event) => {
    event.preventDefault()
    const hero = heroBuscar.value
    fetch(`https://superheroapi.com/api.php/4905856019427443/${hero}`).then((respuesta) => {
        respuesta.json().then((data) => {
            console.log(data)
            grafico(data)
            const nombre = data.name
            const bando = data.biography.alignment
            const imagen = data.biography.alignment
            heroNombre.innerHTML = nombre
            heroBando.innerHTML = bando
            heroTabla.innerHTML = `
            <tr>
                <td>Bando</td>
                <td>${bando}</td>
            </tr>
            `;
        })
    })
})

