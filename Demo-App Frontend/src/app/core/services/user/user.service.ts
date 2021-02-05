import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { userClass } from '../../../Shared/Classes/userClass';
import { apiRoutes } from '../../../config/api-route-points'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public _http: HttpClient) { }

  getAllUser(){
    return this._http.get(apiRoutes.User.USER_OPERATION);
  }

  deleteUser(id){
    return this._http.delete(`${apiRoutes.User.USER_OPERATION}/${id}`);
  }

  adduserWithDefaultIMG(item:userClass){
    return this._http.post(apiRoutes.User.ADD_USER_WITH_DEFAULT_IMG,item)
  }

  adduser(item:FormData){
    return this._http.post(apiRoutes.User.USER_OPERATION,item)
  }

  getUserbyId(id){
    return this._http.get(`${apiRoutes.User.USER_OPERATION}/${id}`);
  }

  updateuserWithoutIMG(item:userClass){
    return this._http.put(apiRoutes.User.USER_OPERATION,item);
  }

  userUpdateWithImg(item){
    return this._http.put(apiRoutes.User.UPDATE_WITH_IMG,item);
  }
}
