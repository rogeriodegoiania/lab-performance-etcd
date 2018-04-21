"use sctrict";

const config = require("./config");
const Etcd3 = require("etcd3").Etcd3;
const cliente = new Etcd3(config.etcd);

var chave = "chave1";
if (process.argv[2]){
    chave = process.argv[2].trim();
}

async function teste(){
    var resposta = await cliente.get(chave);
    console.log(resposta);
}

teste();