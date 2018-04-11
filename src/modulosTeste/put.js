"use sctrict";

const Etcd3 = require("etcd3").Etcd3;

module.exports = async function(quantidade){
    async function teste(cliente, qtd){
        var resultados = [];
        for(var i = 0; i < qtd; i++){
            let tempoInicio = new Date().getTime();
            try {
                await cliente.put("chave" + i).value("valor " + i);
            }
            catch (error) {
                console.log(error);
                return resultados;
            }
            let deltaTempo = new Date().getTime() - tempoInicio;
    
            resultados.push({tempo:tempoInicio, tempoResposta:deltaTempo});
        }
        return resultados;
    }
    
    const cliente1 = new Etcd3();
    return await teste(cliente1, quantidade);
}