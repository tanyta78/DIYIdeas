
export class User{
	public id:string;
	public email:string;
	public username:string;
	public imageUrl:string;
	public role:string;
	public status:string;
	// public favoriteProjectsIds:number[];

	constructor(id:string,email:string,username:string,imageUrl:string){
		this.id=id;
		this.email=email;
		this.username=username;
		this.imageUrl=imageUrl;
		this.role='user';
		this.status='on';
	}
}