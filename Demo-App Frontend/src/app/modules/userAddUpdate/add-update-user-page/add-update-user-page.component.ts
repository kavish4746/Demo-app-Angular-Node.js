import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { userClass } from '../../../Shared/Classes/userClass';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private serviceOb: UserService,
              private routeOb: Router,
              private acrouteOb: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  onChange(value: { target: { files: File[]; }; })
  {
    this.selectedFile = (value.target.files[0] as File);
  }

  addUser(){
    if (this.selectedFile === null)
    {
      this.serviceOb.adduserWithDefaultIMG(this.userObj).subscribe(() => {
        this.snackBar.open('User Successfully Added', 'Dismiss');
        this.routeOb.navigate(['/home']);
      });
    }
    else
    {
      const formData = new FormData();
      formData.append('name', this.userObj.name.toString());
      formData.append('email', this.userObj.email.toString());
      formData.append('img', this.selectedFile, this.selectedFile.name);
      this.serviceOb.adduser(formData).subscribe(() => {
        this.snackBar.open('User Successfully Added', 'Dismiss');
        this.routeOb.navigate(['/home']);
       });
    }

  }

  updateUser(){
    if (this.selectedFile === null)
    {
        this.serviceOb.updateuserWithoutIMG(this.userObj).subscribe(() => {
          this.snackBar.open('User data successfully Updated', 'Dismiss');
          this.routeOb.navigate(['/home']);
        });
    }
    else
    {
        const formData = new FormData();
        formData.append('id', this.userObj.id.toString());
        formData.append('name', this.userObj.name.toString());
        formData.append('email', this.userObj.email.toString());
        formData.append('img', this.selectedFile, this.selectedFile.name);
        this.serviceOb.userUpdateWithImg(formData).subscribe(() => {
            this.snackBar.open('User data successfully Updated', 'Dismiss');
            this.routeOb.navigate(['/']);
        });
    }
  }

  onclickcancel(){
    this.routeOb.navigate(['/home']);
  }
  ngOnInit(): void {
    const checkUrl = this.routeOb.url;
    if (checkUrl !== '/addupdateuser')
    {
      this.userObj.id = this.acrouteOb.snapshot.params.id;
      this.updatebtnFlag = true;
      this.addbtnFlag = false;
      this.serviceOb.getUserbyId(this.userObj.id).subscribe((data: userClass) => {
          this.userObj.name = data[0].name;
          this.userObj.email = data[0].email;
          this.userObj.img = data[0].img;
      });
    }
    else
    {
      this.addbtnFlag = true;
      this.updatebtnFlag = false;
    }
  }
}
