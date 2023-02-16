import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },

  {
    path: '',
    component: AppShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'teachers',
        loadChildren: () =>
          import('./pages/teachers/teachers.module').then(
            (m) => m.TeachersModule
          ),
      },
      {
        path: 'students',
        loadChildren: () =>
          import('./pages/students/students.module').then(
            (m) => m.StudentsModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'department',
        loadChildren: () =>
          import('./pages/department/department.module').then(
            (m) => m.DepartmentModule
          ),
      },
      {
        path: 'attendance-report',
        loadChildren: () =>
          import('./pages/attendance-report/attendance-report.module').then(
            (m) => m.AttendanceReportModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'subjects',
        loadChildren: () => import('./pages/subjects/subjects.module').then(m => m.SubjectsModule)
      },
      {
        path: 'timetable',
        loadChildren: () => import('./pages/timetable/timetable.module').then(m => m.TimetableModule)
      },
      {
        path: 'notes',
        loadChildren: () => import('./pages/notes/notes.module').then(m => m.NotesModule)
      },
      { path: 'announcement', loadChildren: () => import('./pages/announcement/announcement.module').then(m => m.AnnouncementModule) },
      { path: 'exam-marks', loadChildren: () => import('./pages/exam-marks/exam-marks.module').then(m => m.ExamMarksModule) },

      {
        path: '**',
        redirectTo: '/teachers',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
