import { Ingredient } from '../shared/ingredient.model';

export class Project {
	public id:string
	public name: string;
	public description: string;
	public imageUrl: string;
	public ingredients: Ingredient[];
	public authorId: string;

	constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[], authorId) {
		this.name = name;
		this.description = desc;
		this.imageUrl = imagePath;
		this.ingredients = ingredients;
		this.authorId = authorId;
		this.id=this.uniqueId();
	}

	/**
   * Creates a string that can be used for dynamic id attributes
   * Example: "id-so7567s1pcpojemi"
   * @returns {string}
   */
	uniqueId():string{
		return 'id-' + Math.random().toString(36).substr(2, 16);
	};
}
