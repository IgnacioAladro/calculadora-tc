console.log("Estan viendo un simulador de conversion de monedas, por el momento el tipo de cambio va a ser fijo. A futuro la idea seria que la plataforma tome ese dato de otro lado para que se actualice todo el tiempo.");

let historial = localStorage.getItem("historial");

if (historial) {
    historial = JSON.parse(historial);
    actualizarHistorial(historial);
} else {
    historial = [];
}; 

const BOTON_CALCULAR = document.getElementById("botonCalcular");

BOTON_CALCULAR.addEventListener("click", calcularConversion);

function calcularConversion() {
    const CAPITAL = parseFloat(document.getElementById("capital").value);
    const DIVISA = document.getElementById("divisa").value;
    const TIPO_DE_CAMBIO = {
        eur: 847,
        usd: 805,
        cny: 110,
        btc: 9501396
    };

    if (isNaN(CAPITAL) || CAPITAL <= 0) {
        document.getElementById("resultado").innerHTML = "Ingrese un monto valido y mayor que cero.";
        return;
    }

    if (!isNaN(CAPITAL) && TIPO_DE_CAMBIO[DIVISA]) {
        const RESULTADO = (CAPITAL / TIPO_DE_CAMBIO[DIVISA]).toFixed(DIVISA === "btc" ? 8 : 2);
        document.getElementById("resultado").innerHTML = `${CAPITAL} ARS = ${RESULTADO} ${DIVISA}`;

        const CONVERSION = {
            tuDinero: CAPITAL,
            monedaQueElegiste: DIVISA,
            resultado: RESULTADO
        };
        
        historial.push(CONVERSION);
        localStorage.setItem("historial", JSON.stringify(historial));
        actualizarHistorial(historial);
        
    } else {
        document.getElementById("resultado").innerHTML = "Debe ingresar un monto valido";
    }
};

function actualizarHistorial(histo) {
    const NUEVO_HISTORIAL = document.getElementById("historial").getElementsByTagName('tbody')[0];
    
    while (NUEVO_HISTORIAL.firstChild) {
        NUEVO_HISTORIAL.removeChild(NUEVO_HISTORIAL.firstChild);
    }

    histo.forEach(conversion => {
        const row = document.createElement("tr");
        row.innerHTML = 
            `<td>${conversion.tuDinero} ARS</td>
            <td>${conversion.monedaQueElegiste}</td>
            <td>${conversion.resultado}</td>`;
        NUEVO_HISTORIAL.appendChild(row);
    });
};

const BOTON_BORRAR_HISTORIAL = document.getElementById("borrarHistorial");
BOTON_BORRAR_HISTORIAL.addEventListener("click", function () {
    historial = [];
    localStorage.setItem("historial", JSON.stringify(historial));
    actualizarHistorial(historial);
});

BOTON_CALCULAR.addEventListener("click", calcularConversion);