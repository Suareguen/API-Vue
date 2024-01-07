# API-Vue
API REST realizada con las siguientes tecnologías: Express JS, MongoDB y Mongoose.
Inicialización de proyecto:
En primer lugar, accedemos a la carpeta raíz donde se encuentra el ```package.json``` e instlamos las dependencias:
```bash
npm install or npm i
```
Posteriormente arrancamos el servidor desde la misma ruta en la qe estabamos con cualquiera de los siguientes comandos:
```bash
node --watch index.js or nodemon index.js
```

**Importante:** Cabe destacar que has de tener la base de datos creada en mongo, en mi caso la tengo en local, así que para gusto de cada uno que lo use de la manera que mejor le convenga.

Cabe destacar que han de tener las **API_KEY** tanto de Github para poder acceder al contenido de los repositorios deseados así como la de openAI para poder 
generar una correción y un comentario en Github al ejercicio corregiido.

Para la creación del token de Github lo podemos hacer siguiendo las instrucciones del siguente link: [Link](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
Para la **API_KEY** de openAI bastará con registrarnos y crear una key en el apartado "API KEYS", cabe destacar que para el uso de esta API hace falta ingresar un mínimo de 5 euros para poder empezar a hacer peticiones, a su vez dependiendo del tipo de modelo (got4, gpy-3.5, etc) que usemos nuestras peticiones serán más costosas o no.

**Importante:** la mayoría de las rutas requieren de token para acceder a ellas.

Para la creaciñon y manejo del webhook de Github basta con seguir los pasos en la doumentsción que nos suministra Github:
- Crear: [Link](https://docs.github.com/es/webhooks/using-webhooks/creating-webhooks)
- Manejar: [Link](https://docs.github.com/es/webhooks/using-webhooks/handling-webhook-deliveries)

## Endpoints

### Github endpoints

| METHOD | ENDPOINT                                   | POST PARAMS                | RETURNS                              |
| ------ | -----------------------------------------  | -------------------------- | ------------------------------------ |
| PUT    | /github/pullRequests/org/:org/repo/:repo   | repo, org                  | "Pull Requests updated"              |
| DELETE | /github/createCommentPullRequest/:repoName | repoName                   | "Pull Request comment and closed"    |

### Courses endpoints

| METHOD | ENDPOINT                                   | POST PARAMS                | RETURNS                              |
| ------ | -----------------------------------------  | -------------------------- | ------------------------------------ |
| PUT    | /courses/:id                               | courseId                   | "Course updated"                     |
| DELETE | /courses/:id                               | courseId                   | "Course deleted"                     |
| GET    | /courses                                   |                            | [courses]                            |
| GET    | /courses/:id                               | courseId                   | {course}                             |
| POST   | /courses                                   | data course                | "Course created"                     |


### Students endpoints

| METHOD | ENDPOINT                                   | POST PARAMS                | RETURNS                              |
| ------ | -----------------------------------------  | -------------------------- | ------------------------------------ |
| PUT    | /students/:id                              | studentId                  | "Student updated"                     |
| DELETE | /students/:id                              | studentId                  | "Student deleted"                     |
| GET    | /students                                  |                            | [students]                            |
| GET    | /students/:id                              | rstudentId                 | {student}                             |
| POST   | /students                                  | data student               | "Student created"                     |
### Labs endpoints

| METHOD | ENDPOINT                                   | POST PARAMS                | RETURNS                              |
| ------ | -----------------------------------------  | -------------------------- | ------------------------------------ |
| PUT    | /labs/:id                                  | labId                      | "Lab updated"                     |
| DELETE | /labs/:id                                  | labId                      | "Lab deleted"                     |
| GET    | /labs                                      |                            | [labs]                            |
| GET    | /labs/:id                                  |                            | {lab}                             |
| POST   | /labs                                      | data lab                   | "Lab created"                     |
