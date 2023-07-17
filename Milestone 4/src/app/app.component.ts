import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ProductService } from './services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularcrudapp';
  displayedColumns: string[] = [  'id', 'productName','productPrice','productQuantity', 'action',
   
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor (private _dialog: MatDialog, private productService: ProductService){}

  ngOnInit(): void {
    this.getProduct();
  }
  openAddEditProductForm(){
    const dialogref = this._dialog.open(ProductAddEditComponent);
    dialogref.afterClosed().subscribe({
      next: (value) =>{
        if(value){
          this.getProduct();
        }
      }
    })
  }

  getProduct(){

    this.productService.getProduct().subscribe({

      next: (res)=> {

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      },
      error:(err) =>{
        console.log(err);
      }
  })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe({

      next: (res) =>{
        alert('Product deleted');
        this.getProduct();
      },
      error: console.log,

    });
  }
  openEditProductForm(data:any){
     this._dialog.open(ProductAddEditComponent, {
data,


     });
  
  }

  
}
