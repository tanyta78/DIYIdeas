
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();
	startedEditing=new Subject<number>();

	private ingredients: Ingredient[] = [
		new Ingredient('Apple', 5),
		new Ingredient('Wheat', 2)
	];

	getIngredients() {
		return this.ingredients.slice();
	}

	addIngredient(ingredient: Ingredient) {
		
		this.ingredients.push(ingredient);
		this.groupIngredients();
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	
	addIngredients(ingredientsForAddition: Ingredient[]) {
		this.ingredients.push(...ingredientsForAddition);
		this.groupIngredients();		
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	getIngredient(index: number){
		return this.ingredients[index];
	}

	updateIngredient(index: number, newIngredient: Ingredient){
		this.ingredients[index]= newIngredient;
		this.ingredientsChanged.next(this.ingredients.slice());
	}

	deleteIngredient(index: number){
		this.ingredients.splice(index,1);
		this.ingredientsChanged.next(this.ingredients.slice());

	}

	groupIngredients(){
		let grouped = [];
		this.ingredients.forEach(function (o) {
			if (!this[o.name]) {
				this[o.name] = { name: o.name, amount: 0 };
				grouped.push(this[o.name]);
			}
			this[o.name].amount += o.amount;
		}, Object.create(null));
		this.ingredients=grouped;
	}
}