import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import {MatDialogRef} from '@angular/material/dialog';
import { createTextMaskInputElement } from 'text-mask-core';  


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent {
  
  empForm: FormGroup
  Clinic: string[] = [
     'Поликлиника №1',
     'Поликлиника №2',
     'Поликлиника №3'
  ]
  checked = false

  constructor (
    private _fb:FormBuilder, 
    private _empService: EmployeeService, 
    private _dialogRef: MatDialogRef <EmpAddEditComponent>
   ) {
    this.empForm  = this._fb.group({
      'firstname': ['',Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я]+$/)])],
      'lastname': ['',Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Zа-яА-Я]+$/)])],
      'dob': ['', Validators.required],    
      'clinic': ['', Validators.required],
      'email': ['', Validators.email],
      'policy': '',     
      'mask': ['', Validators.required],
    })
  }
  oneFormSubmit() {
    if(this.empForm.valid) {
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val:any) => {
          this._dialogRef.close()
        },
        error: (err:any) => {   
          console.error(err)
        }
      })
     }
     else{

     }
    } 
  closeDialog() {
    this._dialogRef.close()
   } 
   maxDate: Date = new Date(); 
   
   createPhoneNumberMask(): any {
    return {
      mask: ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
      guide: true,
      placeholderChar: '_',
      pipe: undefined,
      keepCharPositions: true,
      showMask: false
    };
  }
  
  }
  

  