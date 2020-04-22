# INI

https://zerobugs.com.br/ver-post/manipulando-arquivos-ini-com-nodejs/

Pacote para leitura e escrita de arquivos .ini

```
npm i -S ini
```

```ini
; ARQUIVO DE CONFIGURAÇÃO
; https://zerobugs.com.br/ver-post/manipulando-arquivos-ini-com-nodejs/
[producao]
porta = 3306
host = localhost
admin = admin
URL = 'https://www.aneel.gov.br/contatos-das-distribuidoras#Permissionarias'

[desenvolvimento]
porta = 3306
host = localhost
admin = admin
URL = 'https://www.aneel.gov.br/contatos-das-distribuidoras#Permissionarias'
```

```js
const fs = require('fs');
const ini = require('ini');
const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
const website = config.producao.URL;

console.log(`Consultando ${website}`);
config.desenvolvimento.host = '127.0.0.1';
config.producao.porta = '3308';
config.producao.novaChave = 'Esta é uma nova chave!'
fs.writeFileSync('./config_modified.ini', ini.stringify(config))
```