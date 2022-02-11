import { AddStudentComponent } from './pages/students/add-student/add-student.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent } from './components/app-shell/app-shell.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./auth/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: '',
    component: AppShellComponent,
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

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
