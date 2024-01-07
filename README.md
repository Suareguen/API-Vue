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
gener un comentario en Github.

**Importante:** la mayoría de las rutas requieren de token para acceder a ellas.

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
