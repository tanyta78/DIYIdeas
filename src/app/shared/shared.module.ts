import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { FilterPipe } from './filter.pipe';

@NgModule({
	declarations:[
		DropdownDirective,
		FilterPipe
	],
	exports:[
		CommonModule,
		DropdownDirective
	]
})
export class SharedModule{}