"use sctrict";

const config = require("./config");
const Etcd3 = require("etcd3").Etcd3;
const cliente = new Etcd3(config.etcd);

var chave = "chave1";
var valor = "valor1";
if (process.argv[2]){
    chave = process.argv[2].trim();
}
if (process.argv[3]){
    valor = process.argv[3].trim();
}

async function teste(){
    var resposta = await cliente.put(chave).value(valor);
    console.log(resposta);
}

teste();