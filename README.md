![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

# Ignews
ig.news é projeto de um blog com inscrição para ter acesso a todo o conteúdo. 

Foi desenvolvido através do curso Ignite da Rocketseat.

## Instalação
Dentro da pasta Ignews, instale as depedências com o comando: ``yarn install``.

## Executar o projeto
Executar os comandos: ```yarn dev``` e ```yarn stripe```

## O que aprendi
- Fundamentos do NextJS
- SSR e SSG
- Como suar uma API de pagamentos (Stripe)
- Autenticação com Net Auth - OAuth com GitHub
- Utilização de FaunaDB
- Conceito de Serveless
- Utilização de Prismic CMS
- Criar testes unitários

## Tecnologias utilizadas
- ReactJS + NextJS
- TypeScript
- SASS
- Stripes
- Axios
- FaunaDB
- Prismic CMS
- Jest

## Configuração

### FaunaDB
Crie uma conta no FaunaDB [<https://fauna.com/>].
- Crie um novo banco de dados na região de US.
- Crie duas Collections: users e subscriptions.
- Crie os seguintes Indexes:
~~~
Index name: user_by_email

Source Collection: users

Terms: data.email

Unique
~~~
~~~
Index name: user_by_stripe_customer_id

Source Collection: users

Terms: data.stripe_customer_id
~~~    
~~~
Index name: subscription_by_id

Source Collection: subscriptions

Terms: data.id
~~~    
~~~
Index name: subscription_by_user_ref

Source Collection: subscriptions

Terms: data.userId
~~~  
~~~
Index name: subscription_by_status

Source Collection: subscriptions

Terms: data.status
~~~  

### Stripe
É necessário ter o Stripe CLI instalado <https://stripe.com/docs/stripe-cli>.

No windows eu utilizei o chocolatey: ```choco install stripe-cli```.


Crie uma conta no [<https://stripe.com/br>].

Para ter as chaves da API de teste:

Dashboard -> Desenvolvedores -> Chaves da API

### Prismic CMS
Crie uma conta no [<https://prismic.io/>].

No dashborad, crie um repositório.

Depois em "Custom type", clique em criar um "Repeatable Type" com UID, Title e Rich Text.


Para ter o endpoint e a chave da API: Settings -> API & Security


### Váriaveis locais
Crie um arquivo ``.env.local`` na raiz do projeto.
Adicione as seguintes chaves:

~~~
# Stripe
STRIPE_API_KEY= Chave secreta do Stripe
STRIPE_WEBHOOK_SECRET= Chave secreta do webhooks do Stripe, ele é gerado quando roda o comando yarn stripe (Necessário ter stripe-cli instalado)
STRIPE_SUCESS_URL=http://localhost:3000/posts/
STRIPE_CANCEL_URL=http://localhost:3000/
NEXT_PUBLIC_STRIPE_PUBLIC_KEY= Chave pública do Stripe

# Github (OAuth)
GITHUB_CLIENT_ID= Seu Client ID
GITHUB_CLIENT_SECRET= Sua chave Client Secret

# FaunaDB
FAUNADB_KEY= Chave secreta do FaunaDB

# SECRET
SIGNING_KEY= Sua chave para autenticação, você pode pegar uma randomica com o comando: openssl rand -base64 32

# Prismic CMS
PRISMIC_ENDPOINT= endpoint da API
PRISMIC_ACESS_TOKEN= Chave de acesso do prismic (Permanent access tokens)
~~~
