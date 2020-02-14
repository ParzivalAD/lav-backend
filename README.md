# To Do

 - [] Cadastrar user
 - [] Login
 - [] Cadastrar address
 - [] Listar categories
 - [] Listar items de uma category
 - [] Cadastrar items na basket
 - [] Criar order
 - [] Processar payment
 - [] Atualizar order após payment "aprovado"

# Complete CRUD

 - User
 - Category
 - Item

# Incomplete CRUD
 
 - Address
 - Order
 - Notification

# Start

  - run ``` yarn ``` to install all dependencies inside each microservice folder
  - initialize rabbitmq server on docker
    ```
    docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
    ```
  - copy .env.example file to .env and update the variables values
  - run ``` yarn dev ``` to start each of microservices (User, Category and Item are ready)
  - run ``` yarn dev ``` to start api gateway

  The aplication will run on http://localhost:3000