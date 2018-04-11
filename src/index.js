"use sctrict";

const cluster = require("cluster");
const processaResultado = require("./lib/processaResultado");

var quantidadeTrabalhadores = 1;
var contTrabalhadores = 0;
var trabalhadores = [];
var resultadosGlobal = [];
var quantidadeAmostras = 60;
var testeModuloNome = "get";

//console.log(process.argv);

if (process.argv[2]){
    testeModuloNome = process.argv[2].trim();
}
if (process.argv[3]){
    quantidadeTrabalhadores = parseInt(process.argv[3].trim());
}
if (process.argv[4]){
    quantidadeAmostras = parseInt(process.argv[4].trim());
}

console.log(testeModuloNome, "quantidadeTrabalhadores:", quantidadeTrabalhadores, "quantidadeAmostras:",quantidadeAmostras);

if (cluster.isMaster) {
    console.log("preparando workers...");
    for (var i = 0; i < quantidadeTrabalhadores; i++) {
        let worker = cluster.fork();
        contTrabalhadores++;
        trabalhadores.push(worker);
    }
    console.log("iniciando processamento...");
    trabalhadores.map(function (worker) {
        worker.send({qtd:parseInt(quantidadeAmostras), moduloNome: testeModuloNome});
    })

    cluster.on("message", function (worker, message, handle) {
        contTrabalhadores--;
        resultadosGlobal = resultadosGlobal.concat(message);
        if (contTrabalhadores === 0) {
            console.log(resultadosGlobal.length);
            processaResultado(resultadosGlobal);
        }
        worker.kill();
    });
}
else {
    process.on("message", function (msg) {
        async function executar(moduloNome, qtd) {
            var testeModuloRef = require("./teste/" + moduloNome);
            if (testeModuloRef){
                process.send(await testeModuloRef(qtd));
            }
            else{
                console.log("modulo não encontrado", moduloNome);
            }
        }

        executar(msg.moduloNome, msg.qtd);
    });
}