# Introduction 
This is the source code of my travel Blog. It was forked from [this repo](https://github.com/krishnaacharyaa/wanderlust), but I made several modificiations:

1. splitted the project into two repositories for the backend and frontend. This make easier to deploy in containers.
2. Added new Google Analytics tags
3. Added a footer for "about us" page
4. Removed VITE framework because I had many troubles with it to deploy on Azure.

Currently this project is deployed on Azure, and you can access it through the following link:
[https://www.vivaviajando.blog.br/](https://www.vivaviajando.blog.br/)

![home page screenshot](https://vvstorage13eua.blob.core.windows.net/vv-other/cover-screenshot.png)

# Getting Started
This app is build in React (frontend) + Node.js Express (backend). 

To use this software it is pretty simple. You just need to clone the repository and run the following commands:

1. create an .env file for backend with `MONGOD_URI` variable pointing to your MongoDB database. I used the free tier of MongoDB Atlas.

2. create an .env file for frontend with these variables:
```
REACT_APP_API_PATH="http://localhost:5050"
REACT_APP_GA_ID="G-XXXXXXX"
REACT_APP_GA_CLIENT_ID="YOURID.apps.googleusercontent.com"
REACT_APP_DISQUS_APP_ID="YOURID"
```
PS: insert the secrets in github actions for devops.

I used free tier of Disqus and Google Analytics. You can create an account and get these variables for free.

3. run:
```npm install```
```npm start``` 


