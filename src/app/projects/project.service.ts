import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Project } from './project.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { map } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://diy-ideas-e2852.firebaseio.com/projects';

@Injectable()
export class ProjectService {
  projectsChanged = new Subject<Project[]>()
  
  private projects: Project[] = [
    new Project(
    'Pop Tabs Bag',
    "OK, you are going to need lots and lots of pop tabs. Don't give yourself renal failure trying to drink them all yourself. Spread it out or enlist the help of your family, friends, workmates, or maybe even the local recycling center.",
    'https://static.boredpanda.com/blog/wp-content/uuuploads/creative-diy-ideas/creative-diy-ideas-1-2.jpg',
    [
      new Ingredient('Beers tabs', 1000),
      new Ingredient('Cutters', 1),
      new Ingredient('Staple remover', 1),
      new Ingredient('Old key', 1),
    ],
  'ELsSCfuNHRZZ0OomuBnfZaatfwr2'),
  new Project(
    'DIY Spoon Lamp',
    "Spoon Lamp, made from plastic spoons and bottle became the winner in Ecology and Design nomination of the «FutureNow» mafazine in 2010. Spoon Lamp is a successful experiment of using materials, complex for processing and recycling, as well as an excellent example of how to turn ordinary items into design object.On photos you can see the detailed process of creating a lamp. In addition to spoons and bottles you will need glue, knife, pliers, and lamp with a cable.",
     'https://static.boredpanda.com/blog/wp-content/uuuploads/creative-diy-ideas/creative-diy-ideas-12-2.jpg',
    [
      new Ingredient('glue', 0.500),
      new Ingredient('knife', 1),
      new Ingredient('pliers', 1),
      new Ingredient('lamp with a cable', 2)
    ],
  'ELsSCfuNHRZZ0OomuBnfZaatfwr2'),
  new Project(
    'Lace Lamp',
    'Starting with this lamp.(It is so dark here at the moment – cant get the photos so crisp that I like).But the lamp is easy to make an truly a beauty.First we used a huge baloon that I bought at a party store.Then you collect all the old Dollys (?) crochet or lace small tablecloths.I found mine at a flea market.Paint them with lots of wallpaper glue so they are soaked.Hang the ballon on a string and put the soaked lace on the baloon. They have to overlap eachother so they will stick together and connect.I always put on onother coat of extra glue when thay are all on the baloon.Just to be sure.Then wait for a while. Maybe a whole night.Pop the baloon when the glue is dry. And attach a nice looking cord and lamp fitting.You mos def want to use a LED lamp or a energy saving bulb because it’s cold and it will not affect the glue either.Voilá a new lamp!',
     'https://static.boredpanda.com/blog/wp-content/uuuploads/creative-diy-ideas/creative-diy-ideas-2-4.jpg',
    [
      new Ingredient('wallpaper glue', 0.500),
      new Ingredient('baloon', 2),
      new Ingredient('crochet', 4),
      new Ingredient('LED lamp', 1),
    ],
  'wzecBnjMhXUumWyVqXgrefZCeRH2')];

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  setProjects(projects: Project[]){
    this.projects = projects;
    this.projectsChanged.next(this.projects.slice());
  }

  storeProjects() {
		return this.http.put('https://diy-ideas-e2852.firebaseio.com/projects.json', this.getProjects());
  }
  
  getAllProjects(){
    return this.http.get<Project[]>('https://diy-ideas-e2852.firebaseio.com/projects.json')
    .pipe(map((projectDb) => {
      const ids = Object.keys(projectDb);
      const projects: Project[] = [];
      for (const i of ids) {
        projects.push(projectDb[i]);
      }
      this.projects = projects;
      return projects as Project[];
    })).subscribe(
      (allprojects: Project[])=>{
        this.projects = allprojects;
        this.projectsChanged.next(this.projects.slice())
      }
    );
  }

  getProjects(){
    return this.projects.slice();
  }

  getProject(projectId:string){
    let index = this.projects.findIndex(item=>projectId===item.id);
		console.log(index);
    return this.projects[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients);
  }
  
  addProject(project:Project){
    this.projects.push(project);
    this.projectsChanged.next(this.projects.slice())
  }

  addProjectToDatabase(project:Project){
    return this.http.put(`${baseUrl}/${project.id}/.json`, project);
  }

  updateProject(newProject: Project){
    let index = this.projects.findIndex(item=>newProject.id===item.id);
    this.projects[index]=newProject;
    this.projectsChanged.next(this.projects.slice());
  }

  editProjectOnDatabase(projectId: string, newProject: Project){
   return this.http.patch(`${baseUrl}/${projectId}/.json`, newProject);
  }

  deleteProject(projectId:string){
    let index = this.projects.findIndex(item=>projectId===item.id);
    this.projects.splice(index,1);
    this.projectsChanged.next(this.projects.slice());
  }

  deleteProjectOnDatabase(projectId:string){
    return this.http.delete(`${baseUrl}/${projectId}/.json`);
  }
}
