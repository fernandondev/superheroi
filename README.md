<div align="center">

# SUPER HEROI API

<div>
  <a>
    <img src="https://i.pinimg.com/originals/e4/26/70/e426702edf874b181aced1e2fa5c6cde.gif" alt="Logo" width="100">
  </a>
<p><strong>Projeto feito em NESTJS</strong></p>
</div>
<hr>
<br>
<br>
</div>


## Documentação Técnica de api em PRODUÇÃO ( Swagger )
PRODUÇÃO: <a href="http://3.95.180.183/api">Swagger</a>

## Como rodar localmente

A partir da raiz do projeto "/superheroi", dar build
```
docker build -t testedocker .
```
Run container docker, passando .env enviado por email como variável
<br>OBS: o .env deverá estar no mesmo diretório que o Dockerfile
```
docker run --env-file ./.env -d -p 3000:3000 --name superheroi-container testedocker
```
* OBS: foi preparada a estrutura de docker-compose, com a criação de uma rede de containers para três serviços: node, postgres e mongodb. Contudo, para questão de agilidade, fica mais fácil consumir os bancos que estão em produção e que passarei as credenciais no .env via email, sendo mais adequado, desse modo, a utilização do container apenas com o serviço  node.

### Primeiros passos:
  * Criação de usuário (cadastro) no endpoint POST '/usuario'
  * Autenticação do usuário no endpoint POST '/autenticacao/login'
  * Acompanhar a documentação para facilitar a chamada dos outros endpoints: <a href="http://3.95.180.183/api">Swagger</a>

<div id="about"></div>

# Sobre o projeto

Projeto com módulo de usuários, autenticação JWT e crud de superheróis, consumindo um sample específico. Esse projeto tem como finalidade principal


<br>

Detalhes do app:
* Login / Cadastro / Logout / Reautenticação / Inativação DE USUÁRIO
* Criação / Edição / recuperação  DE USUÁRIOS
* Criação / Atualização / Obtenção  DE SUPER HERÓIS
* Cadastro / Edição / Deleção DE ATRIBUTOS E PODERES
* Batalhas de super heróis e editoras
* Registro de logs
* Tratamento de exceções, com filter global
* Paginação
* Proteção contra sql injection
* Módulos de teste
* Configuração de Ci / Cd
* Deploy em produção


<p align="right">(<a href="#top">back to top</a>)</p>

 

<div id="built-with"></div>

### Tecnologias usadas

Este aplicativo foi realizado em Flutter, utilizando Provider e SQLite em arquiterura de módulos.

Para a autenticação foi utilizado o Firebase

* Nestjs
* Typescript
* Typeorm
* MongoDb (para registro de logs)
* ExpressJS
* Postgresql
* Controle de cache
* JWT
* BCRYPT (para senhas)
* UUID (para ids de usuário)
* Validadores
* DOCKER

<p align="right">(<a href="#top">back to top</a>)</p>

<div id="demo"></div>

## PRINCIPAIS REGRAS DE NEGÓCIO
<br>

## Autenticação
Esse módulo segue as seguintes regras:   
  * Apenas um token por usuário por vez  (quando gerar um novo, expira o anterior)
  * Blacklist temporária de JWT's (para logout e inativação de usuário) usando cache com TTL proporcional ao TTL do token
  * Refresh token em JWT para reautenticação
  * Autenticação usando CPF ou Email.

## Super heróis
Esse módulo segue as seguintes regras:   
  * Endpoints protegidos por guard
  * Só pode ser cadastrado heróis diferentes
  * Obtenção de todas as batalhas possíveis entre heróis, identificando o vitorioso, com base no valor dos atributos
  * Obtenção de resultado de confronto entre editoras
  * Cadastro / edição / deleção de atributos e poderes

## Usuários
Esse módulo segue as seguintes regras:   
  * Cadastro / Obtenção / Edição de usuário
<br>
<br>

## Sample banco de dados:
O sample de banco de dados abaixo deve ser utilizado apenas para os endpoints
dos CRUD e relatórios referentes aos requisitos 8, 9, 10, 11 e 12:
https://www.databasestar.com/sample-database-superheroes/

https://github.com/bbrumm/databasestar/tree/main/sample_databases/sample_db_s
uperheroes/postgres

### DEPLOY NA AWS
Passos:
  * Abrir módulo de ec2 na AWS
  * Clicar em "executar instâncias"
  * Selecionar sistema operacional desejado, configurar grupos de segurança, salvar private key e criar instância
  * Acessar instância via SSH
  * Instalar docker ( para após o CD, ser realizado o deploy na aws em forma de container docker )
  * Configuração do proxy reverso do NGINX para apontar a porta 80 (exposta pela instância) para a porta definida pelo container docker
  * Configuração dos serviços de bancos de dados
      * Para o POSTGRES, realizei o dump do banco de dados local ( em que tinha rodado as migrations pelo typeorm ) e já haviam alguns dados pre preenchidos
      * Para o MONGODB, apenas criei o banco de dados superheroidb4 e criei a collection "log", que será utilizada no serviço de logs.
  * Para ambos os bancos de dados, tive que configurar o grupo de seguraça para expor as portas (5432 e 27017), para acessar os dados remotamente.(credenciais enviadas via email)<
<br>
<br>

### CONFIGURAÇÃO DE CI CD (pipelines)
Passos:
  * Configurar .yml para ci e cd ( ci.yml, cd.yml), para definir os actions no github
  * A pipeline utilizada será do tipo self-hosted, em que será cadastrado um runner no github e na instância EC2. A instância EC2 ficará aguardando um evento de atualização no repositório docker. Quando ocorrer esse   evento, será realizado o deploy da nova aplicação na instância.
  * Cadastrar um runner no github actions
<br>
<br>

### Elaboração container docker
Passos:
  * Build do container, utilizando uma imagem em node e o script em nestjs.
  * Run do container, injetando as .envs 
<br>
<br>



