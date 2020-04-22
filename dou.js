var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://pesquisa.in.gov.br/imprensa/core/jornalList.action',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'tipo-pesquisa': '0',
    'sitema-busca': '2',
    'termo-pesquisado': '0',
    'jornal': 'do1',
    'edicao.dtInicio': '15/04',
    'edicao.dtFim': '15/04',
    'edicao.ano': '2020'
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});