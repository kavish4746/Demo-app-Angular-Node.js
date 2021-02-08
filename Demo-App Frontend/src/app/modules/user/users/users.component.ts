import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
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

  constructor(private serviceOb: UserService, private routeOb: Router, public loaderService: LoaderService) { }

  displayedColumns: string[] = ['img', 'Name', 'Email', 'action'];
  dataSource = new MatTableDataSource(this.userArr);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  adduser(){
    this.routeOb.navigate(['addupdateuser']);
  }

  onDeleteUser(item){
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
        this.dataSource = new MatTableDataSource(this.userArr);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.Sort;
      }, error => {
        const errorMessage = `${error.status} Please Try Again aftersometime !!!`;
        window.alert(errorMessage);
      }
    );
    }
  }

  onupdateUser(item){
    this.routeOb.navigate(['addupdateuser', {id: item.id}]);
  }

  ngOnInit(): void {
    this.dataSource = null;
    this.serviceOb.getAllUser().subscribe(
      (data: any) => {
        this.userArr=data;
        this.dataSource = new MatTableDataSource(this.userArr);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.Sort;
      }, error => {
        const errorMessage = `${error.status} Could Not fetch data,Please Try or Refresh this page!!!`;
        window.alert(errorMessage);
      }
    );
  }

}
