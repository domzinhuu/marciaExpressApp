export class Notify{

    _id:string
    user:any
    message:string
    registeredAt:Date
    read:boolean

    constructor(user:any,message:string){
        this.user = user
        this.message = message

    }
}