import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent  implements OnInit{

  productForm: FormGroup;



  constructor(
    
    private fb: FormBuilder, 
    private productService: ProductService, 
    private dialogRef:MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ){
    this.productForm = this.fb.group({

      productName: '',
      productPrice: '',
      productQuantity: '',

    });
  }

  ngOnInit(): void{

    this.productForm.patchValue(this.data);
  }
  onFormSubmit(){
    if(this.productForm.valid){
      if(this.data){

        this.productService.editProduct(this.data.id, this.productForm.value).subscribe({

          next: (val: any) =>{
      alert('Product updated ');
      this.dialogRef.close(true);
      
          },
          error: (err: any) =>{
            console.error(err);
          },
         });
      }else{

        this.productService.addProduct(this.productForm.value).subscribe({

          next: (val: any) =>{
      alert('Product added sucessfully');
      this.dialogRef.close(true);
      
          },
          error: (err: any) =>{
            console.error(err);
          },
         });
      }


     
    }
  }
}
