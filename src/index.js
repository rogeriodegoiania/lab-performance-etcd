"use sctrict";

const cluster = require("cluster");
const salvarResultado = require("./lib/salvarResultado");
const config = require("./config");
const infoDisco = require("./lib/infoDisco");

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
if (process.argv[5]){
    config.dispositivoDiscoNome = process.argv[5].trim();
}

var nomeArquivo = testeModuloNome + "_" + quantidadeTrabalhadores + "_" + quantidadeAmostras;

console.log(testeModuloNome, "quantidadeTrabalhadores:", quantidadeTrabalhadores, "quantidadeAmostras:",quantidadeAmostras);

if (cluster.isMaster) {
    console.log("preparando workers...");
    var tempoDiscoGravacaoInicio = 0;
    var tempoDiscoLeituraInicio = 0;
    var tempoDiscoGravacaoFim = 0;
    var tempoDiscoLeituraFim = 0;
    var dadosInfoDisco = infoDisco(config.dispositivoDiscoNome);
    if (dadosInfoDisco){
        tempoDiscoGravacaoInicio = dadosInfoDisco.msWriting;
        tempoDiscoLeituraInicio = dadosInfoDisco.msReading;
    }
    
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

            var dadosInfoDisco = infoDisco(config.dispositivoDiscoNome);
            if (dadosInfoDisco){
                tempoDiscoGravacaoFim = dadosInfoDisco.msWriting;
                tempoDiscoLeituraFim = dadosInfoDisco.msReading;
            }

            console.log("Latência gravação(ms): " + (tempoDiscoGravacaoFim - tempoDiscoGravacaoInicio));
            console.log("Latência leitura(ms): " + (tempoDiscoGravacaoFim - tempoDiscoGravacaoInicio));

            salvarResultado(nomeArquivo, resultadosGlobal);
        }
        worker.kill();
    });
}
else {
    process.on("message", function (msg) {
        async function executar(moduloNome, qtd) {
            var testeModuloRef = require("./modulosTeste/" + moduloNome);
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