export type SlecteOptions = {
	[key: string]: any;
}

type Role = 'USER' | 'ADMIN'

export interface IUser {
	id        		?:string, 
	email     		?:string,
	name      		?:string,
	password  		?:string,
	role			?:Role,
	refreshToken	?:string,
	banned			?:boolean,
	roadmaps		?:IRoadmap[],
	createdAt 		?:Date,
	updatedAt 		?:Date,
}

export interface IRoadmap {
	id        		?:string,
	imageUrl		?:string,
	title     		?:string,
	description     ?:string,
	author			?:IUser,
	authorId		?:string,
	rating			?:number,
	numberRatings	?:number,
	isPublished		?:boolean,
	createdAt 		?:Date,
	updatedAt 		?:Date,
}