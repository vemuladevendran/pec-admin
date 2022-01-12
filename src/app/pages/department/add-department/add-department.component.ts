import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  createDepartment: FormGroup;
  firstYearClass: FormGroup | any;

  sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

  constructor(
    private fb: FormBuilder
  ) {
    this.createDepartment = this.fb.group({
      departmentName: ['', [Validators.required]],
      departmentCode: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      departmentHOD: ['', [Validators.required]],
      firstYear: this.fb.array([this.createFirstYearSection()]),
      // secondYear: this.fb.array([]),
      // thirdYear: this.fb.array([]),
      // fourthYear: this.fb.array([])
    })
  }


  // first year section controls
  get firstYearSection(): FormArray {
    return this.createDepartment.get('firstYear') as FormArray
  }

  createFirstYearSection(): any {
    return this.firstYearClass = this.fb.group({
      departmentName: [],
      section: [],
      classIncharge: ['', [Validators.required]],
    })
  }

  addFirstYearSection(): void {
    if (this.createDepartment && this.firstYearSection.controls.length === 10) {
      alert('Max 10 Sections only allowed');
      return;
    }
    this.firstYearSection.push(this.createFirstYearSection())
  }

  removeFirstYearSection(position: any): void {
    const control = this.createDepartment.get('firstYear') as FormArray
    control.removeAt(position)
  }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    console.log(this.createDepartment.value);
  }

}
