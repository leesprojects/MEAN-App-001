# MeanApp001

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

##My MEAN Setup Guide
MEAN Setup guide following the [Udemy course by Maximillian S](https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/)
This installation document was hand-made as of 13/08/2022 as I started to get a good grasp of MEAN

##Initial Setup
Install NodeJS https://nodejs.org/en/   //Installs NodeJS to this PC
>> 'npm install -g @angular/cli'          //Installs angular cli to this PC
>> 'ng new <<app-name>>'
>> 'cd <<app-name>>'
>> 'npm install'
>> 'ng serve'

##Packages
>> 'npm add @angular/materials'          //https://material.angular.io/
>> 'npm install --save express'          //https://expressjs.com/
>> 'npm install --save -dev nodemon'     //https://www.npmjs.com/package/nodemon
>> 'npm install --save mongoose'         //https://mongoosejs.com/
>> 'npm install --save body-parser'      //https://www.npmjs.com/package/body-parser

##package.json updates
Add to package.json scripts
  '"start:server": "nodemon server.js"'


##app.module.ts imports
  import { NgModule }                 from '@angular/core';                         //https://angular.io/guide/ngmodules
  import { BrowserModule }            from '@angular/platform-browser';
  import { FormsModule }              from '@angular/forms';
  import { MatInputModule }           from '@angular/material/input';
  import { MatButtonModule }          from '@angular/material/button';
  import { MatCardModule }            from '@angular/material/card';
  import { MatToolbarModule }         from '@angular/material/toolbar';
  import { MatIconModule }            from '@angular/material/icon'
  import { MatExpansionModule }       from '@angular/material/expansion'
  import { BrowserAnimationsModule }  from '@angular/platform-browser/animations'
  import { AppRoutingModule }         from './app-routing.module';
  import { HttpClientModule }         from '@angular/common/http';

app.module.ts imports declarator
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    HttpClientModule,
  ],



##Creating Components                                
  [Angular Components](//https://angular.io/guide/component-overview)
  
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',                          //Name of component
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']            //Can have multiple stylesheets
  })

  export class AppComponent { }                    //Export Component to be rendered


##Importing Components
  <app-header></app-header>
    <main>
      <app-post-create></app-post-create>
      <app-post-list></app-post-list>
    </main>


##Backend Setup
server.js in the root folder

const app = require("./backend/app");                   //Imports the backend Express App
const debug = require("debug")("node-angular");
const http = require("http");
const port = process.env.PORT || "3000";                //Uses the provided port or uses 3000
app.set("port", port);
const server = http.createServer(app);                  //Creates an Express server using the backend Express App
server.listen(port);
