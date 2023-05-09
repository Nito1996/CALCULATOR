//Contiene la operación o resultado relativo.
let relativeResult = "";
//Ultimo operador seleccionado.
let lastOperatorTaken = "";
//Numero ingresado.
let number = "";
//Determina si lo ultimo ingresado es un numero o una operacion.
let lastDigitTyped = "";
//Elemento donde se colocaran las operacion que se esta realizando.
let operationResult = document.getElementById("storagedOperations");
//Elemento donde se colocará el resultado.
let txtResult = document.getElementById("storage");
//Actualizar el historial al recargar la pagina.
window.onload = history;
let idKey = 0;

//Presiono un simbolo de operación.

//Presiono un número.
function calculate(num) {
    //Concatenar el numero.
    number = number + num;
    //Contatenar la operacion hasta el momento.
    relativeResult = relativeResult + num;
    //Mostrar operacion
    operationResult.innerHTML = relativeResult;

    //Controlamos la división por 0.
    history()
}

//Limpiar variables y campos.

function btnClearC() {
    lastOperatorTaken = "";
    relativeResult = "";
    txtResult.innerHTML = "";
    number = "";
    operationResult.innerHTML = "0";
    history()
}

function btnClearCE() {
    operationResult.innerHTML = "0";
    lastOperatorTaken = "";
    relativeResult = "";
    history()
}

function btnClearDelete() {
    if (operationResult.innerHTML == operationResult.innerHTML) {
        operationResult.innerHTML = operationResult.innerHTML.slice(0, -1);
        relativeResult = operationResult.innerHTML;
    }
    if (operationResult.innerHTML == "") {
        operationResult.innerHTML = "0";
    }
}

function calculating() {
    //Muestro en la pantalla superior el resultado relativo.
    relativeResult = txtResult.innerHTML;
    //Verificar que el ultimo caracter es un operador.
    VerifyLastOperator = relativeResult.slice(-1);

    VerifyLastDigit = relativeResult.slice(1);
    VerifyLastDigitOfMainResult = operationResult.innerHTML.slice(1);


    //Borro el ultimo el ultimo operador si se ejecuta la funcion.
    deleteLastOperator = relativeResult.slice(0, -1);
    //Concateno el resultado con el operador.
    concatVariableAndOperator = relativeResult + lastOperatorTaken;


    if (relativeResult == undefined) {
        clear();
        localStorage.clear();
        history();
    } else {
        //Vuelvo a convetir relativeResult en string.
        relativeResult = relativeResult.toString()
        //blanqueo el numero.
        number = "";
        relativeResult = operationResult.innerHTML;
        firstValue = operationResult.innerHTML.slice(0, 1);

        //Validaciones.
        //Si introduce 0/0.
        if (operationResult.innerHTML == "NaN") {
            alert('"INFINITY", Introduce proper values, please!');
            clear();
            localStorage.clear();
            history();
        }
        //Si introduce cualquier numero dividido 0.
        if (operationResult.innerHTML == "Infinity") {
            localStorage.clear();
            alert('"INFINITY", Introduce proper values!');
            clear();
            localStorage.clear();
            history();
        }
        if (operationResult == "0") {
            localStorage.clear();
            alert("Introduce a valid operation, please")
            localStorage.clear();
            history();
        }
        if (operationResult.innerHTML == deleteLastOperator) {
            deleteLastOperator;
            //Si el primer caracter es uno de los siguientes simbolos será igual a 0.
        } else {
            if (firstValue == "%" || firstValue == "*" || firstValue == "/") {
                clear();
            }

            if (VerifyLastDigit == VerifyLastDigitOfMainResult) {
                relativeResult = deleteLastOperator;
                txtResult.innerHTML = relativeResult;
                operationResult.innerHTML = relativeResult;
            } else {
                //Con eval se verifica la operacion que esta en string, asi obtenemos un resultado numerico.
                relativeResult = eval(relativeResult);
                txtResult.innerHTML = operationResult.innerHTML + "=";

                operationResult.innerHTML = relativeResult;
                //Agrego al Local Storage.
                add();
            }
        }
    }
}

function operator(op) {debugger
    //Guardo la operación.
    number = "";
    lastOperatorTaken = op;
    lastDigitTyped = "operator";
    //No mostrar el operador en la pantalla principal.
    newRelativeResult = txtResult.innerHTML + op;
    //Validaciones.

    if (relativeResult + op == newRelativeResult) {
        dontShow = relativeResult.slice(0, -1);
        operationResult.innerHTML = dontShow + op;
        txtResult.innerHTML = dontShow + op;
        relativeResult = dontShow + op;
    } else {
        txtResult.innerHTML = relativeResult + op;
        relativeResult = relativeResult + op;
        txtResult.innerHTML = relativeResult;
    }
    history()
}

function history() {
    let body = document.createElement('tbody');
    body.id = 'carTableBody';

    for (let index = 0; index < localStorage.length; index++) {
        const id = localStorage.key(index);
        const { value, operation } = JSON.parse(localStorage.getItem(id));

        let idTd = document.createElement('td');
        let valueTd = document.createElement('td');
        let operationTd = document.createElement('td');
        let actionTd = document.createElement('td');
        let btnDelete = document.createElement('button');
        let row = document.createElement('tr');

        operationTd.textContent = operation;
        idTd.textContent = id;
        valueTd.textContent = value;
        btnDelete.id = 'btnDelete';
        row.id = 'rowId'

        btnDelete.textContent = 'REMOVE';
        btnDelete.onclick = function () {
            remove(id);
        };

        actionTd.appendChild(btnDelete);
        row.appendChild(idTd);
        row.appendChild(operationTd);
        row.appendChild(valueTd);
        row.appendChild(actionTd);
        body.appendChild(row);
    }
    document.getElementById('carTableBody').replaceWith(body);
};

const add = function () {

    const operation = document.getElementById('storage').innerHTML;
    const value = document.getElementById('storagedOperations').innerHTML;
    const stgValue = JSON.stringify({ operation, value });
    idKeyFunction()
    localStorage.setItem(idKey, stgValue);
    history();
};

const remove = function (id) {
    localStorage.removeItem(id);
    history();
};

function idKeyFunction() {
    idKey++;
}

function clear() {
    operationResult.innerHTML = "0";
    txtResult.innerHTML = "";
    relativeResult = "";
}