"use sctrict";

const Etcd3 = require("etcd3").Etcd3;
const cliente = new Etcd3();

var chave = "chave1";
if (process.argv[2]){
    chave = process.argv[2].trim();
}

async function teste(){
    var resposta = await cliente.get(chave);
    //.string()
    console.log(resposta);
}

teste();