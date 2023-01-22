import { Component, OnInit,ViewChild } from '@angular/core';
import { CreateuserComponent } from './createuser/createuser.component';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from './service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'golang';
  displayedColumns: string[] = ['Username', 'category', 'date', 'experience','salary','about','Action'];
  //the displayed colums must and should in be order as it is in json and in createuser
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog : MatDialog,private api:ApiService){

  }
  ngOnInit():void{
    this.getallproducts();
  }
  openDialog() {
    this.dialog.open(CreateuserComponent, {
      width:"439px"//width of dialogboc
     
     
    }).afterClosed().subscribe(val=>{
      if(val=='save'){
        this.getallproducts();
      }
    })
  }
  getallproducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        // console.log(res);//checking if it is logging or not.
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort
      },
      error:()=>{
        alert("error while adding!")
      }
    })

  }
  editProduct(row:any){
    this.dialog.open(CreateuserComponent,{
      width:"439px",
      data:row//to open the dialog of create user component
    }).afterClosed().subscribe(val=>{//it is used because when an edit product is updated then then it doesn't require any refreshing the webpage
      if(val=='update'){
        this.getallproducts();
      }
    })
   
  }
  deleteproduct(id:number){//deleting the user based on given id which is mentioned in service as an argument in delete method
    this.api.deleteProduct(id)//deleting the paticular user id
    .subscribe({//make it as an observable instance
      next:(res)=>{
        alert("User Deleted Successfully")
        this.getallproducts();//doesn't require to refresh for getting results<<direct displaying data>>

      },
      error:()=>{
        alert("Error while Deleting!")//error message when it fails to delete product
      }
    })

  }
  applyFilter(event: Event) {//for applying filters need to include this function
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
