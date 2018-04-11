module.exports = function(resultados){
    //console.log(resultados);

    //console.log(resultados);
    //console.log("**");

    if (!(resultados)){
        return null;
    }
    else{
        if (resultados.length === 0){
            return resultados;
        }
    }

    resultados.sort(function(a, b){
        if (a.tempoResposta < b.tempoResposta){
            return -1;
        }
        else if (a.tempoResposta > b.tempoResposta){
            return 1;
        }
        else{
            return 0;
        }
    });

    let soma = resultados.reduce(function(anterior, atual, indice){
        if (indice === 1){
            return anterior.tempoResposta + atual.tempoResposta;
        }
        else{
            return anterior + atual.tempoResposta;
        }
    });
    
    let media = soma / resultados.length;
    let mediana = 0;
    if ((resultados.length % 2) === 0){
        let indiceMeio = resultados.length / 2;
        mediana = (resultados[indiceMeio - 1].tempoResposta + resultados[indiceMeio].tempoResposta) / 2;
    }
    else{
        let indiceMeio = (resultados.length - 1) / 2;
        mediana = resultados[indiceMeio].tempoResposta;
    }

    var resposta = {"media": media, "mediana":mediana, "minimo":resultados[0].tempoResposta, "maximo": resultados[resultados.length -1].tempoResposta}

    //console.log(resultados);

    console.log(resposta);
}