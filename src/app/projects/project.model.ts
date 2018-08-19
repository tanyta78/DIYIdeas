import {Ingredient} from '../shared/ingredient.model';
import * as firebase from 'firebase';

export class Project {
	public name: string;
	public description: string;
	public imageUrl: string;
	public ingredients:Ingredient[];
	public authorId:string;
	public views: number;
	public likes: number;

	constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
		this.name = name;
		this.description = desc;
		this.imageUrl = imagePath;
		this.ingredients=ingredients;
		if (firebase.auth().currentUser !== null) 
		this.authorId=firebase.auth().currentUser.uid;
		this.views=0;
		this.likes=0;
		
	}
}