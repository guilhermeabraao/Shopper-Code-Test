# Shopper-Code-Test

## Instalação de dependências

Para realizar a instalação das dependências necessárias para rodar a aplicação, será necessário abrir o terminal nas pastas "fackend" e "frontend"
e executar o seguinte comando

>npm install or yarn install

## Configurações básicas

Algumas variáveis de ambiente devem ser informadas para que a aplicação execute com sucesso.
Ambas as pastas contêm um arquivo example.env que servirá como base para as variáveis de ambiente.

No arquivo .env do backend é necessário informar a URL do banco de dados MYSQL que será utilizado.
No arquivo .env do frontend é necessário informar a URL do backend.

na pasta backend conterá também um arquivo dump.sql informando as configurações das tabelas usadas pelo backend.

## Executando a aplicação

No terminal da pasta backend, execute o seguinte comando para subir o backend

>npm run dev

No terminal da pasta frontend, execute o seguinte comando para subir o backend

>npm start 

## Tela inicial

Ao abrir a aplicação, será apresentado a seguinte tela

![tela Inicial](https://github.com/guilhermeabraao/Shopper-Code-Test/assets/112726349/611edee6-38d4-415d-bf40-814fe0c0ac3c)

## Enviar arquivo para validação

Para enviar um arquivo* , clique no botão **escolher arquivo**. Em seguida, clique no botão **validar**

![botão validar](https://github.com/guilhermeabraao/Shopper-Code-Test/assets/112726349/28c42bdc-8c32-4b51-8bc2-7899e4537499)

* *O arquivo usado para a atualização dos preços deve ser do formato csv, do contrário, um erro aparecerá na tela*

## Validando os preços

Aplicação que realiza a validação da atualização de preço dos produtos no banco de dados.
A validação segue as seguintes regras:

1 - O código do produto é válido?
2 - O preço informado é válido?
3 - O preço de venda dos produtos está abaixo do custo deles?
4 - O reajuste é maior ou menor do que 10% do preço atual do produto?
5 - Para pacotes de produtos, o mesmo arquivo deve
conter os reajustes dos preços dos componentes do pacote de modo que o preço final da
soma dos componentes seja igual ao preço do pacote.  

Em caso de quebra de alguma das regras acima, a regra será indicada ao lado das informações do produto.

![regras quebradas](https://github.com/guilhermeabraao/Shopper-Code-Test/assets/112726349/2e665b00-7cc4-44ad-b7c3-d638d3492bd3)

Em caso da validação ser bem sucedida, a aplicação não indicará erro e irá habilitar o botão de atualizar.

![validação bem sucedida](https://github.com/guilhermeabraao/Shopper-Code-Test/assets/112726349/a662ec3b-6c72-41f1-8689-f38f6f97e57c)

## Atualizando preços

Ao clicar no botão **Atualizar**, uma requisição será enviada para o backend solicitação o update dos valores no banco de dados.
Ao finalizar a atualização com sucesso, uma notificação será exibida na tela.

![Notificação](https://github.com/guilhermeabraao/Shopper-Code-Test/assets/112726349/af54b10d-e3ee-428b-8905-e75487b1ba13)



