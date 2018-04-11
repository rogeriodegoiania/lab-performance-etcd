# lab performance etcd

# Baixar e descompactar
```
wget https://github.com/coreos/etcd/releases/download/v3.2.18/etcd-v3.2.18-linux-amd64.tar.gz
```

# Instalar nodejs em debian
```
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

# Servidores etcd
* servidor1 139.59.174.217
* servidor2 139.59.163.179
* servidor3 167.99.193.137

# Iniciar serviços em cada servidor
* etcd --name servidor1 --initial-advertise-peer-urls http://139.59.174.217:2380 --listen-peer-urls http://139.59.174.217:2380 --listen-client-urls http://139.59.174.217:2379,http://127.0.0.1:2379 --advertise-client-urls http://139.59.174.217:2379 --initial-cluster-token etcd-cluster-1 --initial-cluster-state new --initial-cluster servidor1=http://139.59.174.217:2380,servidor2=http://139.59.163.179:2380,servidor3=http://167.99.193.137:2380
* etcd --name servidor2 --initial-advertise-peer-urls http://139.59.163.179:2380 --listen-peer-urls http://139.59.163.179:2380 --listen-client-urls http://139.59.163.179:2379,http://127.0.0.1:2379 --advertise-client-urls http://139.59.163.179:2379 --initial-cluster-token etcd-cluster-1 --initial-cluster-state new --initial-cluster servidor1=http://139.59.174.217:2380,servidor2=http://139.59.163.179:2380,servidor3=http://167.99.193.137:2380
* etcd --name servidor3 --initial-advertise-peer-urls http://167.99.193.137:2380 --listen-peer-urls http://167.99.193.137:2380 --listen-client-urls http://167.99.193.137:2379,http://127.0.0.1:2379 --advertise-client-urls http://167.99.193.137:2379 --initial-cluster-token etcd-cluster-1 --initial-cluster-state new --initial-cluster servidor1=http://139.59.174.217:2380,servidor2=http://139.59.163.179:2380,servidor3=http://167.99.193.137:2380

# Verificar se o cluster está online
```
./etcdctl cluster-health
```

# Baixar ferramentas de teste
https://github.com/coreos/etcd/archive/master.zip

# Configuração do ambiente - executar comando dentro da pasta deste projeto
```
npm install
```

#Copiar arquivo de resultado no servidor remoto para máquina local
```
sftp -P 3000 root@139.59.174.217:/root/lab-performance-etcd/put_1_1000.csv .
```