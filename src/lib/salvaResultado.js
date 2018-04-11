var fs = require("fs");
var cabecalho = 'data,tempo resposta';

function formataData(valor){
    var data = new Date(valor);
    return data.toISOString();
}

module.exports = function(nome, dados){
    var texto = cabecalho;
    dados.map(function(item){
        texto += '\n"' + formataData(item.tempo) + '",' + item.tempoResposta;
    });
    fs.writeFileSync(nome + ".csv", texto);
}


//resultados.push({tempo:tempoInicio, tempoResposta:deltaTempo});
//somente para teste
/*
var resultados = [];
for (var i = 0; i < 100; i++){
    resultados.push({tempo:new Date().getTime(), tempoResposta:90});
    resultados.push({tempo:new Date().getTime(), tempoResposta:80});
    resultados.push({tempo:new Date().getTime(), tempoResposta:20});
    resultados.push({tempo:new Date().getTime(), tempoResposta:10});
    resultados.push({tempo:new Date().getTime(), tempoResposta:85});
    resultados.push({tempo:new Date().getTime(), tempoResposta:70});
    resultados.push({tempo:new Date().getTime(), tempoResposta:80});
    resultados.push({tempo:new Date().getTime(), tempoResposta:60});
}
module.exports(resultados);
*/