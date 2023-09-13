console.log("Hola equipo docende de Coder para la comision 47060 de JS. En este trabajo van a encontrar el comienzo de un proyecto que va a buscar ser una herramienta para las personas que, como yo, operan los mercados de valores todos los dias y utilizamos hermmaientas que suelen estar en diferentes lugares. La idea principal es poder amalgamarlas en una pantalla facil de ver y navegar. Veremos como sale xD")

console.log("Aqui comienza la 1° Pre Entrega del Proyecto Final")

// Estan viendo un simulador de conversion de monedas, por el momento es el usuario quien va a ingresar los tipos de cambio. A futuro la idea seria que la plataforma tome ese dato de otro lado

function multiplicador(capital, tipoDeCambio) {
    let resultado = capital * tipoDeCambio;
    return resultado;
}

let respuestaUsuario = prompt("Hola, bienvenid@ al conversor de divisas\n¿Quieres convertir una divisa?");

while (respuestaUsuario.toUpperCase() == "SI") {
    const DIVISA_UNO = prompt("Elije la divisa que quieres cambiar\nEUR -- USD -- ARS -- CNY -- BTC")
    const CAPITAL = parseFloat(prompt("Ingrese la cantidad de nominales que quiere cambiar"))
    const DIVISA_DOS = prompt("Ingrese la divisa POR la que quiere cambiar\nEUR -- USD -- ARS -- CNY -- BTC");
    const TIPO_DE_CAMBIO = parseFloat(prompt("Ingrese el tipo de cambio"));

    if (!isNaN(CAPITAL) && !isNaN(TIPO_DE_CAMBIO)) {
        switch (DIVISA_UNO.trim().toUpperCase()) {
            case "EUR":
                alert("El monto nominal de " + CAPITAL + " euros representa " + multiplicador(CAPITAL, TIPO_DE_CAMBIO) + " " + DIVISA_DOS); 
                break;
            case "USD":
                alert("El monto nominal de " + CAPITAL + " dolares estadounidenses representa " + multiplicador(CAPITAL, TIPO_DE_CAMBIO) + " " + DIVISA_DOS); 
                break;
            case "ARS":
                alert("El monto nominal de " + CAPITAL + " pesos argentinos representa " + multiplicador(CAPITAL, TIPO_DE_CAMBIO) + " " + DIVISA_DOS); 
                break;
            case "CNY":
                alert("El monto nominal de " + CAPITAL + " yuanes chinos representa" + multiplicador(CAPITAL, TIPO_DE_CAMBIO) + " " + DIVISA_DOS); 
                break;
            case "BTC":
                alert("El monto nominal de " + CAPITAL + " bitcoins representa" + multiplicador(CAPITAL, TIPO_DE_CAMBIO) + " " + DIVISA_DOS); 
                break;
            default:
                alert("Por el momento las divisas con las que contamos son EUR, USD, ARS, CNY, BTC");
                break;
        }
    } else {
        alert("Por favor ingrese los nominales en numeros");
    }
    respuestaUsuario = prompt("¿Quieres realizar una nueva conversion?");
}




