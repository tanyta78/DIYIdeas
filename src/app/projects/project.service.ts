import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Project } from './project.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

const baseUrl = 'https://diy-ideas-e2852.firebaseio.com/projects';

@Injectable()
export class ProjectService {
  projectsChanged = new Subject<Project[]>()

  private projects: Project[] = [
    new Project(
    'Pasta Bolognese',
    'Our best ever spaghetti Bolognese is super easy and a true Italian classic with a meaty, chilli sauce.', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/the-best-spaghetti-bolognese.jpg?itok=PH6AqY-g',
    [
      new Ingredient('Spaghetti', 0.500),
      new Ingredient('Beef mince', 0.500),
      new Ingredient('Onion', 2),
      new Ingredient('Carrot', 2),
      new Ingredient('Garlic', 2),
      new Ingredient('Rosemary', 2),
      new Ingredient('Bacon', 4),
      new Ingredient('Oil', 1),
      new Ingredient('Tomatoes plum tin', 0.800),
      new Ingredient('Basil', 2),
      new Ingredient('Oregano', 1),
      new Ingredient('Tomato puree', 2),
      new Ingredient('Red wine', 0.125),
      new Ingredient('Parmesan', 0.075)
    ]),
  new Project(
    'Classic Burger',
    'Sink your teeth into a delicious restaurant-style, hamburger recipe made from lean beef. ', 'https://imagesvc.timeincapp.com/v3/mm/image?url=http%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fclassic-burgers-u.jpg%3Fitok%3DyvPXhq5J&w=900&q=85',
    [
      new Ingredient('Beef mince', 0.500),
      new Ingredient('Onion', 2),
      new Ingredient('Egg', 1),
      new Ingredient('Garlic', 2),
      new Ingredient('Salt', 1.5),
      new Ingredient('Pepper', 1),
      new Ingredient('Worcestershire', 1),
      new Ingredient('Hamburger buns', 4),
      new Ingredient('Mayonnaise', .125),
      new Ingredient('Ketchup', 0.125),
      new Ingredient('Tomato ', 2),
      new Ingredient('Red onion', 0.125),
      new Ingredient('Lettuce leaves', 4)
    ]),
  new Project(
    'Mandarin Chicken Pasta Salad',
    'It is a fruity Asian chicken salad that even my family picky eaters enjoy.', 'https://images.media-allrecipes.com/images/75131.jpg',
    [
      new Ingredient('Fussili Pasta', 0.500),
      new Ingredient('Cooked chicken', 0.500),
      new Ingredient('Ginger tsp', 1),
      new Ingredient('Rice Vinegar', 0.100),
      new Ingredient('Orange juice', 0.07),
      new Ingredient('Sesame oil tsp', 1),
      new Ingredient('Oil', 0.07),
      new Ingredient('Onion dry soup mix', 1),
      new Ingredient('White sugar tsp', 2),
      new Ingredient('Cucumber', 1),
      new Ingredient('Bell pepper', 2),
      new Ingredient('Red onoin', 0.125),
      new Ingredient('Tomatoes', 0.400),
      new Ingredient('Carrot', 0.100),
      new Ingredient('Almounds toasted', 0.100)


    ])];

  constructor(
    private shoppingListService: ShoppingListService,
    private http: Http,
    private authService: AuthService
  ) { }

  setProjects(projects: Project[]){
    this.projects = projects;
    this.projectsChanged.next(this.projects.slice());
  }

  storeProjects() {
		const token = this.authService.getToken();
		return this.http.put('https://diy-ideas-e2852.firebaseio.com/projects.json?auth='+token, this.getProjects());
	}

  getProjects(){
    return this.projects.slice();
  }

  getProject(index:number){
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
    const token = this.authService.getToken();
    let nextId = this.getProjects().length-1;
    return this.http.put(`${baseUrl}/${nextId}/.json?auth=`+token, project);
  }

  updateProject(index: number, newProject: Project){
    this.projects[index]=newProject;
    this.projectsChanged.next(this.projects.slice());
  }

  editProjectOnDatabase(projectId: number, newProject: Project){
    const token = this.authService.getToken();
   
    return this.http.patch(`${baseUrl}/${projectId}/.json?auth=`+token, newProject);
  }

  deleteProject(index:number){
    this.projects.splice(index,1);
    this.projectsChanged.next(this.projects.slice());
  }

  deleteProjectOnDatabase(projectId:number){
    const token = this.authService.getToken();
    return this.http.delete(`${baseUrl}/${projectId}/.json?auth=`+token);
  }
}
