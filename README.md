# Buyed Backend
CRUD para buyed app hecho en GraphQL y MongoDB.

### V0.1
Query 
      - getUser (Devuelve los datos del usuario logueado)
      - getLists (Devuelve las listas del usuario logueado)
      - getListById (Devuelve la lista pedida con el id)
      - getListsByStatus (Devuelve listas con el estado pedido)
      - getListsByCreateDate (Devuelve listas creadas en un rango de tiempo)
      - getListsByBuyedDate (Devuelve listas compradas en un rango de tiempo)
Mutation 
      - newUser (Crea un usuario)
      - authUser (Login)
      - updateUser (Actualiza los datos del usuario)
      - newList (Crea una lista)
      - updateList (Actualiza una lista)
      - deleteList (Elimina una lista)
      
### Usar 

Requerimientos NodeJS, MongoDB Url

Crear .env archivo con el format del archivo .env.example

1 - Git clone
2 - Npm Install
3 - Npm run dev

