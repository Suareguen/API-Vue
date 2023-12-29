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




## Enpoints importantes

### Github endpoints

| METHOD | ENDPOINT                                   | POST PARAMS                | RETURNS                              |
| ------ | -----------------------------------------  | -------------------------- | ------------------------------------ |
| PUT    | /github/pullRequests/org/:org/repo/:repo   | repo, org                  | "Pull Requests updated"              |
| DELETE | /github/createCommentPullRequest/:repoName | repoName                   | "Pull Request comment and closed"    |