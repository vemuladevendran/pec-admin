import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { DepartmentService } from 'src/app/services/department/department.service';
import { NotesService } from 'src/app/services/notes/notes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  departmentList: any[] = [];
  notes: any[] = [];
  filtersForm: FormGroup;
  filters = {};
  constructor(
    private fb: FormBuilder,
    private departmentServe: DepartmentService,
    private toast: ToastrService,
    private notesServe: NotesService,
  ) {
    this.filtersForm = this.fb.group({
      departmentName: [''],
      year: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
      .subscribe(() => {
        this.filters = this.filtersForm?.value
        this.getNotesList(this.filters);
      });
  }


  async getDepartments(): Promise<void> {
    try {
      this.departmentList = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);

    }
  }

  // get notes
  async getNotesList(filters: any): Promise<void> {
    try {
      this.notes = await this.notesServe.getNotes(filters);
      console.log(this.notes, '-----------');
    } catch (error) {
      console.log(error);

    }
  }

  // delete notes
  async deleteNotes(id: string): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await this.notesServe.deleteNotes(id);
        this.toast.success('Deleted');
        this.getNotesList(this.filters);
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('Fail to Delete');
      }
    }
  }

  ngOnInit(): void {
    this.getNotesList(this.filters);
    this.getDepartments();
  }

}
