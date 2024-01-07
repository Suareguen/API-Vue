# API-Vue Documentation

## Overview
API-Vue is a sophisticated REST API constructed utilizing Express JS, MongoDB, and Mongoose technologies.

### Project Initialization

**Setting Up**: Commence by navigating to the root directory where the `package.json` is located and execute the following command to install all dependencies:

```bash
   npm install or npm i
```
**Server Activation:** Continue by initiating the server from the same directory employing one of the subsequent commands:
```bash
node --watch index.js or nodemon index.js
```

Prerequisites
Database Configuration: It's imperative to establish and configure a MongoDB database. The specific setup might vary, accommodating personal preferences and either local or remote configurations.

API Keys Necessity:

- GitHub: Access to the desired repositories mandates a GitHub API key. Generate one by adhering to the guidelines provided in the [GitHub Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
- OpenAI: To leverage OpenAI's capabilities for generating corrections and comments on GitHub exercises, registration and generation of an API key in the "API KEYS" section are essential. Be aware that utilizing OpenAI's API involves a cost contingent on the model and usage volume.


**Important Considerations**

Token Authentication: Most routes necessitate an access token for authentication purposes.
Costs and Setup: Utilizing APIs, especially OpenAI, may entail varied costs based on the chosen model and request volume.

### GitHub Webhook Configuration

For the creation and management of GitHub webhooks, refer to the official documentation: [Create webhook](https://docs.github.com/es/webhooks/using-webhooks/creating-webhooks) and [Handle webhook](https://docs.github.com/es/webhooks/using-webhooks/handling-webhook-deliveries)



## Modelos

The API incorporates the following models: Courses, Labs, and Students.


## Endpoints

### Github endpoints

| METHOD | ENDPOINT                                   | POST PARAMS                | RETURNS                              |
| ------ | -----------------------------------------  | -------------------------- | ------------------------------------ |
| PUT    | /github/pullRequests/org/:org/repo/:repo   | repo, org                  | "Pull Requests updated"              |
| DELETE | /github/createCommentPullRequest/:repoName | repoName                   | "Pull Request comment and closed"    |


These two endpoints allow us to update our database with users who have submitted a lab, marking them as uncorrected, provided that the user making the Pull Requests is in our database. Conversely, the other endpoint facilitates the correction of open Pull Requests by generating a comment for them, subsequently closing them, and ultimately updating our database to reflect the user who was initially marked as uncorrected but has now been corrected.


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
