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

  constructor(private _service: UserService, private _route: Router,
              private _acroute: ActivatedRoute, public _loaderService: LoaderService) { }

  displayedColumns: string[] = ['img', 'Name', 'Email', 'action'];
  dataSource = new MatTableDataSource(this.userArr);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  adduser(){
    this._route.navigate(['addupdateuser']);
  }

  onDeleteUser(item){
    console.log(item.id);
    if (confirm('Are you sure to delete ' + item.name + ' ?')) {
    this._service.deleteUser(item.id).subscribe(
      (data: any) => {
        console.log('Deleted');
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
        console.log(`Error while Deleting the data ${error}`);
      }
    );
    }
  }

  onupdateUser(item){
    this._route.navigate(['addupdateuser', {id: item.id}]);
  }

  ngOnInit(): void {
    this.dataSource = null;
    this._service.getAllUser().subscribe(
      (data: any) => {
        console.log(data);
        this.userArr = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.Sort;
      }, error => {
        console.log(`Error while fetching the data ${error}`);
      }
    );
  }

}
