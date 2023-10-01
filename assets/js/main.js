console.log("Estan viendo un simulador de conversion de monedas, por el momento el tipo de cambio va a ser fijo. A futuro la idea seria que la plataforma tome ese dato de otro lado para que se actualice todo el tiempo.");

function conversor(capital, tipoDeCambio) {
    let resultado = capital / tipoDeCambio;
    return resultado.toFixed(2);
}

function conversorCripto(capital, tipoDeCambio) {
    let resultado = capital / tipoDeCambio;
    return resultado.toFixed(8);
}

const TIPO_DE_CAMBIO = {
    eur: 847,
    usd: 805,
    cny: 110,
    btc: 9501396
};

let ultimaConversion = {};
const HISTORIAL = [];

let respuestaUsuario = prompt("Hola, bienvenid@ al conversor de divisas\n¿Quieres convertir una divisa?");

while (respuestaUsuario.toUpperCase() == "SI") {
    const CAPITAL = parseFloat(prompt("Ingrese la cantidad de nominales en pesos argentinos que quiere cambiar"))
    const DIVISA_CAMBIO = prompt("Ingrese la divisa por la que quiere cambiar\nEUR -- USD -- CNY -- BTC");

    if (!isNaN(CAPITAL)) {
        switch (DIVISA_CAMBIO.trim().toUpperCase()) {
            case "EUR":
                alert("El monto nominal de " + CAPITAL + " pesos argentinos representa " + conversor(CAPITAL, TIPO_DE_CAMBIO.eur) + " " + DIVISA_CAMBIO);
                ultimaConversion = {
                    tuDinero: CAPITAL,
                    monedaQueElegiste: DIVISA_CAMBIO,
                    resultado: conversor(CAPITAL, TIPO_DE_CAMBIO.eur)
                }
                HISTORIAL.unshift(ultimaConversion);
                break;
            case "USD":
                alert("El monto nominal de " + CAPITAL + " pesos argentinos representa " + conversor(CAPITAL, TIPO_DE_CAMBIO.usd) + " " + DIVISA_CAMBIO);
                ultimaConversion = {
                    tuDinero: CAPITAL,
                    monedaQueElegiste: DIVISA_CAMBIO,
                    resultado: conversor(CAPITAL, TIPO_DE_CAMBIO.usd)
                }
                HISTORIAL.unshift(ultimaConversion);
                break;
            case "CNY":
                alert("El monto nominal de " + CAPITAL + " pesos argentinos representa " + conversor(CAPITAL, TIPO_DE_CAMBIO.cny) + " " + DIVISA_CAMBIO);
                ultimaConversion = {
                    tuDinero: CAPITAL,
                    monedaQueElegiste: DIVISA_CAMBIO,
                    resultado: conversor(CAPITAL, TIPO_DE_CAMBIO.cny)
                }
                HISTORIAL.unshift(ultimaConversion);
                break;
            case "BTC":
                alert("El monto nominal de " + CAPITAL + " pesos argentinos representa " + conversorCripto(CAPITAL, TIPO_DE_CAMBIO.btc) + " " + DIVISA_CAMBIO);
                ultimaConversion = {
                    tuDinero: CAPITAL,
                    monedaQueElegiste: DIVISA_CAMBIO,
                    resultado: conversorCripto(CAPITAL, TIPO_DE_CAMBIO.btc)
                }
                HISTORIAL.unshift(ultimaConversion);
                break;
            default:
                alert("Por el momento las divisas con las que contamos son EUR, USD, CNY, BTC");
                break;
        }
    } else {
        alert("Por favor ingrese los nominales en numeros");
    }

    console.log(HISTORIAL);

    respuestaUsuario = prompt("¿Quieres realizar una nueva conversion?");
}

let filtrarHistorial = prompt("¿Quiere ver el historial aplicando un flitro por divisa?") 

while (filtrarHistorial.toUpperCase() == "SI") {
    const DIVISA_FILTRO = prompt("¿Por cual divisa quiere filtrar el historial?\nEUR -- USD -- CNY -- BTC")
    const HISTORIAL_FILTRADO = HISTORIAL.filter(
        conversionHecha => {
        return (conversionHecha.monedaQueElegiste.trim().toLowerCase().includes(DIVISA_FILTRO.trim().toLowerCase()));
    });

    if (HISTORIAL_FILTRADO.length !== 0) {
        console.table(HISTORIAL_FILTRADO);
    } else {
        console.log("No se encunetran converiosnes realizadas con esa divisa.");
    }

    filtrarHistorial = prompt("¿Desea volver a intentar filtrar el historial?");
}




