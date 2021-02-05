import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { userClass } from '../../../Shared/Classes/userClass';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-update-user-page',
  templateUrl: './add-update-user-page.component.html',
  styleUrls: ['./add-update-user-page.component.css']
})
export class AddUpdateUserPageComponent implements OnInit {

  name: string;
  email: string;
  selectedFile: File = null;
  img: string;
  id: number;
  addbtnFlag:boolean = false;
  updatebtnFlag:boolean = false;
  userArr: userClass[] = [];


  constructor(private _service: UserService, private _route: Router, 
              private _acroute: ActivatedRoute) { }
  
  onChange(value)
  {
    this.selectedFile = (value.target.files[0] as File);
  }

  adduser(){
    if (this.selectedFile === null)
    {
      this.userArr.push(new userClass(this.name, this.email, this.img));
      this._service.adduserWithDefaultIMG(this.userArr[0]).subscribe((data: userClass) => {
        console.log(data);
        this._route.navigate(['/']);
      });
    }
    else
    {
      const fd = new FormData();
      fd.append('name', this.name);
      fd.append('email', this.email);
      fd.append('img', this.selectedFile, this.selectedFile.name);
      this._service.adduser(fd).subscribe((data: userClass) => {
         console.log(data);
         this._route.navigate(['/']);
       });
    }

  }

  updateuser(){
    if (this.selectedFile == null)
    {
        this.userArr.push(new userClass(this.name, this.email, this.img, this.id));
        this._service.updateuserWithoutIMG(this.userArr[0]).subscribe((data: userClass) => {
          console.log(data);
          this._route.navigate(['/']);
        }, err => {
            console.log(err);
        }, () => {
        });
    }
    else
    {
        const fd = new FormData();
        fd.append('id', this.id.toString());
        fd.append('name', this.name);
        fd.append('email', this.email);
        fd.append('img', this.selectedFile, this.selectedFile.name);
        this._service.userUpdateWithImg(fd).subscribe((data: userClass) => {
            this._route.navigate(['/']);
        },err=>{
          throwError(err);
        });
    }
  }

  onclickcancel(){
    this._route.navigate(['/']);
  }
  ngOnInit(): void {
    let checkUrl=this._route.url;
    if (checkUrl !== '/addupdateuser')
    {
      this.id = this._acroute.snapshot.params.id;
      console.log(this.id);
      this.updatebtnFlag = true;
      this.addbtnFlag = false;
      this._service.getUserbyId(this.id).subscribe((data: userClass) => {
          this.name = data[0].name;
          this.email = data[0].email;
          this.img = data[0].img;
      },err=>{
        console.log(err);
      });
    }
    else
    {
      this.addbtnFlag = true;
      this.updatebtnFlag = false;
    }
  }
}
