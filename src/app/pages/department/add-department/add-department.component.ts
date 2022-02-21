import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
})
export class AddDepartmentComponent implements OnInit {
  createDepartment: FormGroup;
  hodList: any[] = [];
  teachersList: any[] = [];
  sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private loader: LoaderService,
    private departmentServe: DepartmentService,
    private router: Router,
    private teacherServe: TeacherService,
  ) {
    this.createDepartment = this.fb.group({
      departmentName: ['', [Validators.required]],
      departmentCode: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      departmentHod: ['', [Validators.required]],
      years: this.fb.group({
        firstYear: this.fb.array([]),
        secondYear: this.fb.array([]),
        thirdYear: this.fb.array([]),
        fourthYear: this.fb.array([]),
      }),
    });

    this.addFirstYearSection();
    this.addSecondYearSection();
    this.addThirdYearSection();
    this.addFourthYearSection();

    this.createDepartment
      .get('departmentName')
      ?.valueChanges.subscribe((v: string) => {
        this.firstYearSection.controls.forEach((c) =>
          c.get('departmentName')?.setValue(v)
        );
        this.secondYearSection.controls.forEach((c) =>
          c.get('departmentName')?.setValue(v)
        );
        this.thirdYearSection.controls.forEach((c) =>
          c.get('departmentName')?.setValue(v)
        );
        this.fourthYearSection.controls.forEach((c) =>
          c.get('departmentName')?.setValue(v)
        );
      });
  }

  // first year section controls
  get firstYearSection(): FormArray {
    return this.createDepartment.get('years')?.get('firstYear') as FormArray;
  }

  createFirstYearSection({ section, name }: any = {}): FormGroup {
    return this.fb.group({
      departmentName: [name],
      section: [section],
      classIncharge: ['', [Validators.required]],
    });
  }

  createFirstYearSectionWithIdentifier(): FormGroup {
    const i = this.createDepartment?.value?.years?.firstYear?.length || 0;
    const name = this.createDepartment?.value?.departmentName || '';
    const s = this.createFirstYearSection({ section: this.sections[i], name });
    return s;
  }

  addFirstYearSection(): void {
    if (this.createDepartment && this.firstYearSection.controls.length === 10) {
      alert('Max 10 Sections only allowed');
      return;
    }
    this.firstYearSection.push(this.createFirstYearSectionWithIdentifier());
  }

  removeFirstYearSection(position: any): void {
    const control = this.createDepartment
      .get('years')
      ?.get('firstYear') as FormArray;
    control.removeAt(position);

    const sectionList = this.createDepartment?.value?.years?.firstYear;
    const section = sectionList.map((x: any, i: any) => {
      x.section = this.sections[i];
    })
    this.createDepartment.get('years')?.get('firstYear')?.patchValue(sectionList);
  }

  // second year section controls
  get secondYearSection(): FormArray {
    return this.createDepartment.get('years')?.get('secondYear') as FormArray;
  }

  createSecondYearSection({ section, name }: any = {}): FormGroup {
    return this.fb.group({
      departmentName: [name],
      section: [section],
      classIncharge: ['', [Validators.required]],
    });
  }

  createSecondYearSectionWithIdentifier(): FormGroup {
    const i = this.createDepartment?.value?.years?.secondYear?.length || 0;
    const name = this.createDepartment?.value?.departmentName || '';
    const s = this.createSecondYearSection({ section: this.sections[i], name });
    return s;
  }

  addSecondYearSection(): void {
    if (
      this.createDepartment &&
      this.secondYearSection.controls.length === 10
    ) {
      alert('Max 10 Sections only allowed');
      return;
    }
    this.secondYearSection.push(this.createSecondYearSectionWithIdentifier());
  }

  removeSecondYearSection(position: any): void {
    const control = this.createDepartment
      .get('years')
      ?.get('secondYear') as FormArray;
    control.removeAt(position);

    const sectionList = this.createDepartment?.value?.years?.secondYear;
    const section = sectionList.map((x: any, i: any) => {
      x.section = this.sections[i];
    })
    this.createDepartment.get('years')?.get('secondYear')?.patchValue(sectionList);
  }

  // third year section controls

  get thirdYearSection(): FormArray {
    return this.createDepartment.get('years')?.get('thirdYear') as FormArray;
  }

  createThirdYearSection({ section, name }: any = {}): FormGroup {
    return this.fb.group({
      departmentName: [name],
      section: [section],
      classIncharge: ['', [Validators.required]],
    });
  }

  createThirdYearSectionWithIdentifier(): FormGroup {
    const i = this.createDepartment?.value?.years?.thirdYear?.length || 0;
    const name = this.createDepartment?.value?.departmentName || '';
    const s = this.createThirdYearSection({ section: this.sections[i], name });
    return s;
  }

  addThirdYearSection(): void {
    if (this.createDepartment && this.thirdYearSection.controls.length === 10) {
      alert('Max 10 Sections only allowed');
      return;
    }
    this.thirdYearSection.push(this.createThirdYearSectionWithIdentifier());
  }

  removeThirdYearSection(position: any): void {
    const control = this.createDepartment
      .get('years')
      ?.get('thirdYear') as FormArray;
    control.removeAt(position);

    const sectionList = this.createDepartment?.value?.years?.thirdYear;
    const section = sectionList.map((x: any, i: any) => {
      x.section = this.sections[i];
    })
    this.createDepartment.get('years')?.get('thirdYear')?.patchValue(sectionList);
  }

  // fourth year section control

  get fourthYearSection(): FormArray {
    return this.createDepartment.get('years')?.get('fourthYear') as FormArray;
  }

  createFourthYearSection({ section, name }: any = {}): FormGroup {
    return this.fb.group({
      departmentName: [name],
      section: [section],
      classIncharge: ['', [Validators.required]],
    });
  }

  createFourthYearSectionWithIdentifier(): FormGroup {
    const i = this.createDepartment?.value?.years?.fourthYear?.length || 0;
    const name = this.createDepartment?.value?.departmentName || '';
    const s = this.createFourthYearSection({ section: this.sections[i], name });
    return s;
  }

  addFourthYearSection(): void {
    if (
      this.createDepartment &&
      this.fourthYearSection.controls.length === 10
    ) {
      alert('Max 10 Sections only allowed');
      return;
    }
    this.fourthYearSection.push(this.createFourthYearSectionWithIdentifier());
  }

  removeFourthYearSection(position: any): void {
    const control = this.createDepartment
      .get('years')
      ?.get('fourthYear') as FormArray;
    control.removeAt(position);

    const sectionList = this.createDepartment?.value?.years?.fourthYear;
    const section = sectionList.map((x: any, i: any) => {
      x.section = this.sections[i];
    })
    this.createDepartment.get('years')?.get('fourthYear')?.patchValue(sectionList);
  }

  // get hod list

  async getHodList(): Promise<void> {
    try {
      this.hodList = await this.departmentServe.getHods();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to fetch hod list');
    }
  }

  // get teachers list

  async getTeachersList(): Promise<void> {
    try {
      const filters = {};
      this.teachersList = await this.teacherServe.getTeachers(filters);
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to fetch Teachers')
    }
  }

  // handle submit
  async handleSubmit(): Promise<void> {
    try {
      const data = this.createDepartment.value;
      console.log(data);
      this.loader.show();
      await this.departmentServe.createDepartment(data);
      this.toast.success('successfully created');
      this.router.navigate(["/department"]);
    } catch (error: any) {
      console.log(error.error);
      this.toast.error(error.error);
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getHodList();
    this.getTeachersList();
  }
}
