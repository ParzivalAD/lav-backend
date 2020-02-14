# To Do

 - [x] Cadastrar user
 - [x] Login
 - [x] Cadastrar address
 - [x] Listar categories
 - [x] Listar items de uma category
 - [x] Cadastrar items na basket
 - [x] Adicionar order na basket
 - [x] Listar items da basket
 - [ ] Criar order
 - [ ] Processar payment
 - [ ] Atualizar order após payment "aprovado"

# Start

  - run ``` yarn ``` to install all dependencies inside each microservice folder
  - initialize rabbitmq server on docker
    ```
    docker-compose up -d

    or

    docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
    ```
  - copy .env.example file to .env and update the variable values
  - run ``` yarn dev ``` to start each of microservices
  - run ``` yarn dev ``` to start api gateway

  The aplication will run on http://localhost:3000

# Microservices ports

  - Api Gateway: 3000
  - User: 3001
  - Category: 3002
  - Item: 3003
  - Order: 3004
  - Notification: 3005
  - Address: 3006
  - Basket: 3007