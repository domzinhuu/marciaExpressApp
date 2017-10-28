import { Storage } from '@ionic/storage';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler{

    constructor(private injector:Injector){
    }

    handleError(errorResponse:HttpErrorResponse | any){
        if(errorResponse instanceof HttpErrorResponse){
            switch (errorResponse.status) {
                case 403:
                case 401:
                    const storage = this.injector.get(Storage)
                    storage.clear()
                    break;
                default:
                    break;
            }
        }
        console.log(errorResponse)
    }
}