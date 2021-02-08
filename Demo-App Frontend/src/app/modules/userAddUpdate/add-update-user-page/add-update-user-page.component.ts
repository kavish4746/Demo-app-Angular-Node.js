import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { userClass } from '../../../Shared/Classes/userClass';

@Component({
  selector: 'app-add-update-user-page',
  templateUrl: './add-update-user-page.component.html',
  styleUrls: ['./add-update-user-page.component.css']
})
export class AddUpdateUserPageComponent implements OnInit {
  selectedFile: File = null;
  addbtnFlag = false;
  updatebtnFlag = false;
  userObj = {} as userClass;

  constructor(private serviceObj: UserService, private routeOb: Router,
              private acrouteOb: ActivatedRoute) { }

  onChange(value: { target: { files: File[]; }; })
  {
    this.selectedFile = (value.target.files[0] as File);
  }

  adduser(){
    if (this.selectedFile === null)
    {
      this.serviceObj.adduserWithDefaultIMG(this.userObj).subscribe(() => {
        this.routeOb.navigate(['/']);
      }, error => {
        const errorMessage = `${error.status} Error occured:, Please Try Again !!!`;
        window.alert(errorMessage);
      });
    }
    else
    {
      const fd = new FormData();
      fd.append('name', this.userObj.name.toString());
      fd.append('email', this.userObj.email.toString());
      fd.append('img', this.selectedFile, this.selectedFile.name);
      this.serviceObj.adduser(fd).subscribe(() => {
         this.routeOb.navigate(['/']);
       }, error => {
        const errorMessage = `${error.status} Error occured:, Please Try Again !!!`;
        window.alert(errorMessage);
       });
    }

  }

  updateuser(){
    if (this.selectedFile == null)
    {
        this.serviceObj.updateuserWithoutIMG(this.userObj).subscribe((data: userClass) => {
          console.log(data);
          this.routeOb.navigate(['/']);
        }, err => {
          const errorMessage = `${err.status} Error while updating user,please Try Again`;
          window.alert(errorMessage);
        });
    }
    else
    {
        const fd = new FormData();
        fd.append('id', this.userObj.id.toString());
        fd.append('name', this.userObj.name.toString());
        fd.append('email', this.userObj.email.toString());
        fd.append('img', this.selectedFile, this.selectedFile.name);
        this.serviceObj.userUpdateWithImg(fd).subscribe((data: userClass) => {
            this.routeOb.navigate(['/']);
        }, err => {
          const errorMessage = `${err.status} Error while updating user,please Try Again`;
          window.alert(errorMessage);
        });
    }
  }

  onclickcancel(){
    this.routeOb.navigate(['/']);
  }
  ngOnInit(): void {
    const checkUrl = this.routeOb.url;
    if (checkUrl !== '/addupdateuser')
    {
      this.userObj.id = this.acrouteOb.snapshot.params.id;
      console.log(this.userObj.id);
      this.updatebtnFlag = true;
      this.addbtnFlag = false;
      this.serviceObj.getUserbyId(this.userObj.id).subscribe((data: userClass) => {
          this.userObj.name = data[0].name;
          this.userObj.email = data[0].email;
          this.userObj.img = data[0].img;
      }, err => {
        const errorMessage = `${err.status} Could not Get User Data`;
        window.alert(errorMessage);
      });
    }
    else
    {
      this.addbtnFlag = true;
      this.updatebtnFlag = false;
    }
  }
}
