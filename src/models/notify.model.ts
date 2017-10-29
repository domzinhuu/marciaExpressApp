export class Notify{

    _id:string
    user:any
    message:string
    description:string
    registeredAt:Date
    read:boolean

    constructor(user:any,message:string,description?:string){
        this.user = user
        this.message = message
        this.description = description

    }
}