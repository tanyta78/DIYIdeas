# DIYIdeas SPA (Angular 6)
## Introduction
DIYideas SPA is a project undertaken as a mandatory requirement for the course “Angular 6 Fundamentals ” in SoftUni. 
## Overall Description 
   DIYideas is free website. Users can upload, save, search, and manage different ideas for DIY projects. When choose DIY (do it yourself) project, user can add all needed ingredients to shopping list.

The public part is visible without authentication. This public part includes:
  - Application start page with last added projects;
  - Search form;
  - User login form;
  - User registration form;
  - Detail info for each idea with ability to add ingredients to personal shopping list;
  - Shopping list with ability to edit and delete ingredients;


Registered users have personal area in the web application accessible after successful login. This area hold:
   - User’s profiles management functionality;
   - The user's projects with ability to create edit and delete ideas;
   - List of other users ideas with ability to view, like and comment;

System administrators should have administrative access to the system and permissions to administer all major information objects in the system:
-  to create / edit / delete users,
-  to edit/ delete ideas projects
The goal of this project is to show the core concepts of building SPA with Angular using Firebase as a backend. 

## Project architecture
 In this project I've used:
### Create multiple feature modules for every independent feature of application with :
  - Components;
  - Service for each feature;
  - TypeScript models;      
  - Different type of data binding – string interpolation, property binding, event binding, two-way binding;
  - Structural directives(*ngIf,*ngFor) and attribute directives(ngStyle and ngClass);
  - Router and Guards to prevent unauthorized users to view routes that require authentication or admin rights
  - Reactive forms for handling user input and template-driven forms for sign in and register
### Create CoreModule 
   - header component, home component and interceptors;
   - All services which have to have one and only one instance per application (singleton services) are implemented here.
### Create SharedModule 
  - dropdown directive and filter pipe.
  - All the “dumb” components and pipes are implemented here. These components don’t import and inject services from core or other features in their constructors. They receive all data though attributes in the template of the component using them. This all sums up to the fact that SharedModule doesn’t have any dependency to the rest of our application.
### Lazy-loading for some of the modules so the app can start faster 
  - ProjectsModule and AdminModule.
  - Preload lazy-loaded modules after the app starts so they can be ready for use as soon as possible
### Interceptors for attach token to the request headers, showing notifications from the server response and error handling
### Use source control system - https://github.com/tanyta78/DIYIdeas
### Use responsive design – Bootstrap
### Deploy the application in a cloud environment –  https://diy-ideas.herokuapp.com/
### Use Subject for state management
### Use Angular Animations in shopping list

## Installation . Install the dependencies and start the client (port: 4200)
This project was generated with [Angular CLI] (https://github.com/angular/angular-cli) version 6.1.4.

$ cd..
$ cd client
$ npm install
$ ng serve

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

#### Author
* Tatyana Milanova https://github.com/tanyta78


