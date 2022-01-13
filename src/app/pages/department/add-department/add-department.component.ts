import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  createDepartment: FormGroup;

  sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

  constructor(
    private fb: FormBuilder
  ) {
    this.createDepartment = this.fb.group({
      departmentName: ['', [Validators.required]],
      departmentCode: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      departmentHOD: ['', [Validators.required]],
      firstYear: this.fb.array([]),
      secondYear: this.fb.array([]),
      thirdYear: this.fb.array([]),
      fourthYear: this.fb.array([])
    })

    this.addFirstYearSection();
    this.addSecondYearSection();
    this.addThirdYearSection();
    this.addFourthYearSection();

    this.createDepartment.get('departmentName')?.valueChanges.subscribe((v: string) => {
      this.firstYearSection.controls.forEach(c => c.get('departmentName')?.setValue(v));
      this.secondYearSection.controls.forEach(c => c.get('departmentName')?.setValue(v));
      this.thirdYearSection.controls.forEach(c => c.get('departmentName')?.setValue(v));
      this.fourthYearSection.controls.forEach(c => c.get('departmentName')?.setValue(v));
    })
  }


  // first year section controls
  get firstYearSection(): FormArray {
    return this.createDepartment.get('firstYear') as FormArray
  }

  createFirstYearSection({ section, name }: any = {}): FormGroup {
    return this.fb.group({
      departmentName: [name],
      section: [section],
      classIncharge: ['', [Validators.required]],
    });
  }

  createFirstYearSectionWithIdentifier(): FormGroup {
    const i = this.createDepartment?.value?.firstYear?.length || 0;
    const name = this.createDepartment?.value?.departmentName || '';
    const s = this.createFirstYearSection({ section: this.sections[i], name });
    return s;
  }

  addFirstYearSection(): void {
    if (this.createDepartment && this.firstYearSection.controls.length === 10) {
      alert('Max 10 Sections only allowed');
      return;
    }
    this.firstYearSection.push(this.createFirstYearSectionWithIdentifier())
  }

  removeFirstYearSection(position: any): void {
    const control = this.createDepartment.get('firstYear') as FormArray
    control.removeAt(position)
  }

  // second year section controls
  get secondYearSection(): FormArray {
    return this.createDepartment.get('secondYear') as FormArray
  }

  createSecondYearSection({ section, name }: any = {}): FormGroup {
    return this.fb.group({
      departmentName: [name],
      section: [section],
      classIncharge: ['', [Validators.required]],
    });
  }

  createSecondYearSectionWithIdentifier(): FormGroup {
    const i = this.createDepartment?.value?.secondYear?.length || 0;
    const name = this.createDepartment?.value?.departmentName || '';
    const s = this.createSecondYearSection({ section: this.sections[i], name });
    return s;
  }

  addSecondYearSection(): void {
    if (this.createDepartment && this.secondYearSection.controls.length === 10) {
      alert('Max 10 Sections only allowed');
      return;
    }
    this.secondYearSection.push(this.createSecondYearSectionWithIdentifier())
  }

  removeSecondYearSection(position: any): void {
    const control = this.createDepartment.get('secondYear') as FormArray
    control.removeAt(position)
  }

  // third year section controls

  get thirdYearSection(): FormArray {
    return this.createDepartment.get('thirdYear') as FormArray
  }

  createThirdYearSection({ section, name }: any = {}): FormGroup {
    return this.fb.group({
      departmentName: [name],
      section: [section],
      classIncharge: ['', [Validators.required]],
    });
  }

  createThirdYearSectionWithIdentifier(): FormGroup {
    const i = this.createDepartment?.value?.thirdYear?.length || 0;
    const name = this.createDepartment?.value?.departmentName || '';
    const s = this.createThirdYearSection({ section: this.sections[i], name });
    return s;
  }

  addThirdYearSection(): void {
    if (this.createDepartment && this.thirdYearSection.controls.length === 10) {
      alert('Max 10 Sections only allowed');
      return;
    }
    this.thirdYearSection.push(this.createThirdYearSectionWithIdentifier())
  }

  removeThirdYearSection(position: any): void {
    const control = this.createDepartment.get('thirdYear') as FormArray
    control.removeAt(position)
  }

  // fourth year section control

  get fourthYearSection(): FormArray {
    return this.createDepartment.get('fourthYear') as FormArray
  }

  createFourthYearSection({ section, name }: any = {}): FormGroup {
    return this.fb.group({
      departmentName: [name],
      section: [section],
      classIncharge: ['', [Validators.required]],
    });
  }

  createFourthYearSectionWithIdentifier(): FormGroup {
    const i = this.createDepartment?.value?.fourthYear?.length || 0;
    const name = this.createDepartment?.value?.departmentName || '';
    const s = this.createFourthYearSection({ section: this.sections[i], name });
    return s;
  }

  addFourthYearSection(): void {
    if (this.createDepartment && this.fourthYearSection.controls.length === 10) {
      alert('Max 10 Sections only allowed');
      return;
    }
    this.fourthYearSection.push(this.createFourthYearSectionWithIdentifier())
  }

  removeFourthYearSection(position: any): void {
    const control = this.createDepartment.get('fourthYear') as FormArray
    control.removeAt(position)
  }


  ngOnInit(): void {
  }

  handleSubmit(): void {
    console.log(this.createDepartment.value);
  }

}
