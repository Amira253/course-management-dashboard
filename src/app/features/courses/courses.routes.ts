import { Routes } from '@angular/router';

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/course-list/course-list.component')
        .then(c => c.CourseListComponent)
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./pages/course-form/course-form.component')
        .then(c => c.CourseFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/course-form/course-form.component')
        .then(c => c.CourseFormComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/course-details/course-details.component')
        .then(c => c.CourseDetailsComponent)
  }
];