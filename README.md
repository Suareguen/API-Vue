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

## Enpoint importantes

### Github endpoints

| METHOD | ENDPOINT                                   | POST PARAMS                | RETURNS                              |
| ------ | -----------------------------------------  | -------------------------- | ------------------------------------ |
| PUT    | /github/pullRequests/org/:org/repo/:repo   | repo, org                  | "Pull Requests updated"              |
| DELETE | /github/createCommentPullRequest/:repoName | repoName                   | "Pull Request comment and closed"    |