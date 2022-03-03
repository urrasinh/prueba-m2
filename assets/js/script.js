const heroNombre = document.querySelector("#hero-nombre")
const heroTabla = document.querySelector("#hero-tabla")
const heroImagen = document.querySelector("#hero-imagen")
const heroFormulario = document.querySelector("#hero-formulario")
const heroBuscar = document.querySelector("#hero-buscar")



heroFormulario.addEventListener("submit", (event) => {
    event.preventDefault()
    const hero = heroBuscar.value
    fetch(`https://superheroapi.com/api.php/4905856019427443/${hero}`).then((respuesta) => {
        respuesta.json().then((data) => {
            console.log(data)
            grafico(data)
            const nombre = data.name
            const bando = data.biography.alignment
            const imagen = data.image
            heroNombre.innerHTML = nombre
             heroImagen.innerHTML = `
            <img src="${imagen.url}" alt="${nombre}" class="card-img-top rounded mx-auto d-block"  style="height: 300px; width: auto;">
             `
            heroTabla.innerHTML = `
            <p class="card-text"><span class="fw-bold">Occupation:</span> ${data.work.occupation}</p>
			<p class="card-text"><span class="fw-bold">First Appearance:</span> ${data.biography["first-appearance"]}</p>
			<p class="card-text"><span class="fw-bold">Height:</span> ${data.appearance.height}</p>
			<p class="card-text"><span class="fw-bold">Weight:</span> ${data.appearance.weight}</p>
			<p class="card-text"><span class="fw-bold">Aliases:</span> ${data.biography.aliases}</p>
            `
        })
    })
})

// funcion que crea el grafico

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

    if (d.powerstats.strength !== "null") {
        let chart = new CanvasJS.Chart("estadisticas", config)
        chart.render()
    } else {
        alert("El heroe seleccionado no tiene datos para mostrar en el grafico")
        estadisticas2.innerHTML = `<h1>SIN DATOS QUE MOSTRAR</h1>`
    }


}
