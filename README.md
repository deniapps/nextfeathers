# NextFeathers
nextJS + feathersJS = Perfect! 


[**DEMO**](https://deniapps.com)

## What's Next?
NextJS is the React Framework for a lot of things: 
 - Production 
 - Pre-Rendered Apps 
 - Static Websites 
 - the Jamstack 
 - the Enterprise 
 - the Desktop 
 - the Mobile Web 
 - Lightweight Apps 
 - SEO-Friendly Sites 
 - PWAs 
 - Electron
Don't forget to check out their amazing DOC: https://nextjs.org/docs/getting-started
But here, let's call it the frontend of NextFeathers :-)

## What's Feathers?
FeathersJS is a framework for real-time applications and REST APIs. And here, let's call it the backend of NextFeathers :-)
One thing I really like is feathers-cli, with which I can create an API in a couple minutes. Learn more at: https://feathersjs.com/

## What's NextFeathers?
You probably know now: it's simply nextJS + FeathersJS! But more than that,it's actually a Javascript Blog System with ReactJS on Node. 
I know we need a better name, so I call it "DNA" - [DeNiApps](https://deniapps.com) 
Also, I am adding a lot of examples about how to use nextJS, feathersJS, reactJS, MongoDB, semantic-ui, ckEditor, and more! 
You can find it at [Playground](https://deniapps.com/playground)

## How to use it?
```
git clone https://github.com/deniapps/nextfeathers.git
cd nextfeathers
cd next 
code . // assume you are using vscode - highly recommanded!!!

cd ../feathers
code .

//NOTE, you can start vscode on the top level (i.e., PATH-TO/nextfeathers,) 
//but I see some issue for eslint working properly. 
//Since they are two separated frameworks, I would recommand to open two vscode windows.

//Then in each command window, run
npm install
npm run dev

//You need mongodb for blog system (DNA) to work, so after setup a mongo database, 
//add your configuration at nextfeathers/feathers/config
//default.json is for dev, and production.json is for produciton

  "mongodb": "mongodb://localhost:27017/deniapps", 
  "mongoUser": "admin",
  "mongoPass": "admin123$",

//Then use Postman, to create an user
//Endpoint: http://localhost:3030/user
//Method: POST
//Raw Body:
{
  "email": "admin@deniapps.com",
  "password": "admin123$"
}

//NOTE: after you have admin account created, add authentication to the services/users/users.hooks.js, 
//it will be like this: 
module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [hashPassword("password"),authenticate("jwt")],
    update: [hashPassword("password"), authenticate("jwt")],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

//And then, whereever hooked with authenticate["jwt"], the authentication is required, 
//to get jwt token, call this:

//Endpoint: http://localhost:3030/authentication
//Methond: POST
//Body:
{
	"strategy": "local",
	"email": "admin@deniapps.com",
  "password": "admin123$"
}
```
I hope this is clear. I will try to write a tutorial soon. 

==Warning
This is not production ready yet. I am still working on *DNA*. What's that? I meant Blog system. :-)
