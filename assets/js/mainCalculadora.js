async function calcularConversion() {
    const CAPITAL = parseFloat(document.getElementById("capital").value);
    const DIVISA = document.getElementById("divisa").value;

    const TIPO_DE_CAMBIO_API = async (urlApi) => {
        const response = await fetch(urlApi);
        const valor = await response.json();

        return urlApi.includes("dolar/oficial") ? valor.blue : valor.ask;
    };
    
    const TIPO_DE_CAMBIO = {
        usd: await TIPO_DE_CAMBIO_API("https://criptoya.com/api/dolar/oficial"),
        btc: await TIPO_DE_CAMBIO_API("https://criptoya.com/api/binance/btc/ars/0.1"),
        eth: await TIPO_DE_CAMBIO_API("https://criptoya.com/api/binance/eth/ars/0.1"),
        bnb: await TIPO_DE_CAMBIO_API("https://criptoya.com/api/binance/bnb/ars/0.1"),
    };

    if (isNaN(CAPITAL) || CAPITAL <= 0) {
        Swal.fire({
            icon: "error",
            text: "Ingrese un monto valido y mayor que cero.",
            showConfirmButton: false,
            position: "top",
            timer: 2500,
            toast: true
        });
        return;
    }

    if (!isNaN(CAPITAL) && TIPO_DE_CAMBIO[DIVISA]) {
        const CAMBIO = TIPO_DE_CAMBIO[DIVISA];
        const RESULTADO = (CAPITAL / CAMBIO).toFixed(2).toString().replace(".", ",");
        const FECHA_HORA = luxon.DateTime;

        document.getElementById("resultado").innerHTML = `${CAPITAL.toLocaleString("es-AR")} ARS = ${RESULTADO} ${DIVISA.toUpperCase()}`;
        console.log(CAMBIO);
        const CONVERSION = {
            tuDinero: CAPITAL.toLocaleString("es-AR"),
            monedaQueElegiste: DIVISA.toUpperCase(),
            resultado: RESULTADO.toString() + " " + DIVISA.toUpperCase(),
            fechaHora: FECHA_HORA.now().toFormat("dd/MM/yyyy - HH:mm:ss"),
            tipoDeCambio: CAMBIO.toLocaleString("es-AR") + " ARS"
        };
        
        historial.push(CONVERSION);
        localStorage.setItem("historial", JSON.stringify(historial));
        actualizarHistorial(historial);
        
    } else {
        Swal.fire({
            icon: "error",
            text: "Debe ingresar un monto valido",
            showConfirmButton: false,
            position: "top",
            timer: 2500,
            toast: true
        });
    }
};

function actualizarHistorial(datos) {
    const NUEVO_HISTORIAL = document.getElementById("historial").getElementsByTagName('tbody')[0];
    
    while (NUEVO_HISTORIAL.firstChild) {
        NUEVO_HISTORIAL.removeChild(NUEVO_HISTORIAL.firstChild);
    }

    for (let i = datos.length - 1; i >= 0; i--) {
        const conversion = datos[i];
        const row = document.createElement("tr");
        row.innerHTML =
            `<td>${conversion.fechaHora}</td>
            <td>${conversion.tuDinero.toLocaleString("es-AR")} ARS</td>
            <td>${conversion.monedaQueElegiste}</td>
            <td>${conversion.tipoDeCambio}</td>
            <td>${conversion.resultado.toString().replace(".", ",")}</td>`;
        NUEVO_HISTORIAL.appendChild(row);
    };
};

let historial = JSON.parse(localStorage.getItem("historial")) || [];

const BOTON_CALCULAR = document.getElementById("botonCalcular");
BOTON_CALCULAR.addEventListener("click", calcularConversion);

if (historial) {
    historial = JSON.parse(localStorage.getItem("historial"));
    actualizarHistorial(historial);
} else {
    historial = [];
}; 

const BOTON_BORRAR_HISTORIAL = document.getElementById("borrarHistorial");
BOTON_BORRAR_HISTORIAL.addEventListener("click", function () {
    historial = [];
    localStorage.setItem("historial", JSON.stringify(historial));
    actualizarHistorial(historial);
});