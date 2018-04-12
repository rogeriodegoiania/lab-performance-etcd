const diskStat = require("disk-stat");

module.exports = function(dispositivoNome){
    var raw = diskStat.raw();
    return raw[dispositivoNome];
}