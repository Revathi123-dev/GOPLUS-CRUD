import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
freshness=["Fresher","Trainee","Employee"]//array of options that an user wants to select
productForm !: FormGroup;//import formmodule in appmodule.ts to use form
actionBtn:string="save" //we use action btn as two ways:updation and saving 

  constructor(private formbuilder:FormBuilder,private api:ApiService,//api service must and should insert in constructor as a parameter
    @Inject(MAT_DIALOG_DATA) public editData:any,//injecting matdialog data
    private dialoRef:MatDialogRef<CreateuserComponent>) { }
//private dialogref:MatDialogRef<DialogComponent>) for entering the details again we need this

  ngOnInit(): void {
    
    this.productForm=this.formbuilder.group({
      Username:['',Validators.required],//for entering values  of user
      category:['',Validators.required],
      date:['',Validators.required],
      experience:['',Validators.required],
      salary:['',Validators.required],
      about:['',Validators.required],
      
    })
    // console.log(this.editData);//viewing the Array is getting in concole or not when edits
    if(this.editData){``  //inthis ngOnInit method whatever the data is getting to use that data if the condition is true
      this.actionBtn="Update";//whenever click on update mat-icon it should convert into update
      this.productForm.controls['Username'].setValue(this.editData.Username);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['experience'].setValue(this.editData.experience);
      this.productForm.controls['salary'].setValue(this.editData.salary);
      this.productForm.controls['about'].setValue(this.editData.date.about);

    }
  }
  addproduct(){
   if(!this.editData){//if it is not edit data it should process down if condition
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({//using subscribe for receiving data have an consciousness to notice each string or value entered by user and observable instance
        next:(res)=>{//nextblock for response
          alert("UserAdded Successfully")//if user is added show this message
          this.productForm.reset();//for second entry of json data
          this.dialoRef.close('save');//for saving the data again in json server
        },
      error:()=>{
        alert("Error while Adding!")//note:if an user is failed to add show this message
      }
      })
       // console.log(this.productForm.value);
     }
   }
   else{
    this.updateProduct()
   }
  

   }
   updateProduct(){
   this.api.putProduct(this.productForm.value,this.editData.id)//
   .subscribe({
    next:(res)=>{
     
      alert("Updated Successfully")//displays alert if the user is updated
      this.productForm.reset();
      this.dialoRef.close('update')
    },
    error:(err)=>{
      alert("Error While Updating!")
    }
   })//Note:in update user we need to create api must and should
    // console.log(this.productForm.value)//for checking it is binding or not
  }
}
