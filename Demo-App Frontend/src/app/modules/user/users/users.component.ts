import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user/user.service';
import { userClass } from '../../../Shared/Classes/userClass';
import { LoaderService } from '../../../core/services/loader/loader.service';
import { url } from '../../../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) Sort: MatSort;

  userArr: userClass[] = [];
  endPoint: string = url.endPoint;

  constructor(private serviceOb: UserService,
              private routeOb: Router,
              public loaderService: LoaderService,
              private snackBar: MatSnackBar) { }

  displayedColumns: string[] = ['img', 'Name', 'Email', 'action'];
  dataSource = new MatTableDataSource(this.userArr);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  adduser(){
    this.routeOb.navigate(['addupdateuser']);
  }

  onupdateUser(item: { id: number; }){
    this.routeOb.navigate(['addupdateuser', {id: item.id}]);
  }

  onDeleteUser(item: userClass){
    console.log(item.id);
    if (confirm('Are you sure to delete ' + item.name + ' ?')) {
    this.serviceOb.deleteUser(item.id).subscribe(
      () => {
        for (let i = 0; i < this.userArr.length; i++)
        {
          if (this.userArr[i].id === item.id)
          {
            this.userArr.splice(i, 1);
          }
        }
        this.snackBar.open('User Deleted Successfully', 'Dismiss');
        this.dataSource = new MatTableDataSource(this.userArr);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.Sort;
      }
    );
    }
  }

  ngOnInit(): void {
    this.dataSource = null;
    this.serviceOb.getAllUser().subscribe(
      (data: any) => {
        this.userArr = data;
        this.dataSource = new MatTableDataSource(this.userArr);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.Sort;
      }
    );
  }

}
