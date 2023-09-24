## Hola


https://github.com/cfsghost/passport-github/blob/master/examples/login/app.js

este es el codigo de la clase

archivos editados o nuevos

config/passport.local.config.js
config/passport.github.js
routes/api/auth.router.js
routes/index.js
views/login.handlebars
middlewares/api.middleware.js\
utils/jwt.utils.js

package.json

### Notas generales

La clase esta muy sencilla, hay que ingresar por github y con JWT
para github se implemento una estrategia de passport con varios callbacks
esta comentado el codigo

para JWT se implemento una nueva ruta de api para loguearse por usuario y contrasena y generar un token
el token debe de viajar en un header de authorization, por ejemplo

POST http://localhost:3000/api/productos
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0MmRiNThlMTQ1MWFiMTVkNjFkMTYiLCJmaXJzdG5hbWUiOiJMYWxvIiwibGFzdG5hbWUiOiJWZWxhenF1ZXoiLCJlbWFpbCI6ImxhbG8wODkyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHdGa3Y5U0lyNDdyZDUxTnV1bnJFSGVqQ2R2Tnl4bzcwTWdQWUlHbG5wUHNTV1hGMnNNWXkuIiwicm9sZSI6IkN1c3RvbWVyIiwiZ2VuZGVyIjoiTWFsZSIsImFnZSI6MTAsImNyZWF0ZWREYXRlIjoxNjkyNjc1NDc3MzczLCJfX3YiOjAsImlhdCI6MTY5MjY3NTgzMywiZXhwIjoxNjkyNzYyMjMzfQ.pvgeijRYxeXM7p4SrY9o6prf-oWm0c7bQD3Dxi6KQLo

