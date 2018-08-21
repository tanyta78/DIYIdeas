import {Ingredient} from '../shared/ingredient.model';

export class Project {
	public name: string;
	public description: string;
	public imageUrl: string;
	public ingredients:Ingredient[];
	public authorId:string;

	constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[],authorId) {
		this.name = name;
		this.description = desc;
		this.imageUrl = imagePath;
		this.ingredients=ingredients;
		this.authorId=authorId;
	}
}