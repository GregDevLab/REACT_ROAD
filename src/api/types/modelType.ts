export type SlecteOptions = {
	[key: string]: any;
}

type Role = 'USER' | 'ADMIN'

enum ReactionType {
	LIKE = 'LIKE',
	DISLIKE = 'DISLIKE'
}
export interface IUser {
	id        		?:string, 
	email     		?:string,
	name      		?:string,
	password  		?:string,
	role			?:Role,
	refreshToken	?:string,
	banned			?:boolean,
	roadmaps		?:IRoadmap[],
	steps			?:IStep[],
	createdAt 		?:Date,
	updatedAt 		?:Date,
	_count			?:{[key:string]:any}
	reactions		?:IReaction[],
}

export interface IRoadmap {
	id        		?:string,
	imageUrl		?:string,
	title     		?:string,
	description     ?:string,
	author			?:IUser,
	steps			?:IStep[],
	authorId		?:string,
	rating			?:number,
	numberRatings	?:number,
	isPublished		?:boolean,
	createdAt 		?:Date,
	updatedAt 		?:Date,
	reactions		?:IReaction[],
}

export interface IStep {
	id        			?:string   
	title     			?:string	 
	content				?:string
	author				?:IUser	 
	roadmap				?:IRoadmap	 
	roadmapId			?:string	 
	authorId			?:string	 
	rating				?:number	 
	numberRatings		?:number		 
	isPublished			?:Boolean  
	createdAt 			?:Date 
	updatedAt 			?:Date 
}

export interface IReaction {
	id       	?:string,       
	type     	?:ReactionType,
	userId   	?:string,       
	roadmapId   ?:string ,   	 
	user     	?:IUser,         
    roadmap     ?:IRoadmap,      
}