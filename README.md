# API Para Gerenciamento de Documentos

## Configuração de ambiente local

1. **Variaveis de ambiente:** Baseado no .env.example crie o arquivo .env, o valor já atribuido no DATABASE_URL ira funcionar no ambiente de teste dentro do docker.
2. **Subir ambiente de teste local:** Rode o comando `npm  run start`, a url para testes estara disponivel em **http://localhost:<VALOR COLOCADO NA CONSTANTE PORT NO .ENV>**, documentação se encontra no endpoint **/api/docs**

## Configuração de ambiente de teste

1. **Variaveis de ambiente:** Baseado no .env.example crie o arquivo .env
2. **Testes:** Rode o comando `npm run test`

Os testes de integração podem ser executados isoladamente rodando `npm run test:integration`, porém não dei muita atenção a eles, mas podem ser executados se desejar.
