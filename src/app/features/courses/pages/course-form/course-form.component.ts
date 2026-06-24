import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute ,Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  imports: [RouterModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,MatSnackBarModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  isEditMode = false;
  courseId!: string | number;

  form = this.fb.group({
    courseName: ['', [Validators.required, Validators.minLength(3)]],
    instructorName: ['', Validators.required],
    category: ['', Validators.required],
    duration: [0, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0)]],
    status: ['', Validators.required],
    description: ['', Validators.maxLength(500)]
  });

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.courseId = id;

      this.courseService.getCourseById(this.courseId)
         .subscribe( {next: (course) => {
            this.form.patchValue(course);
          }
        });
    }
  }

  saveCourse() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const course = {
      ...this.form.value,
      createdDate: new Date().toISOString().split('T')[0]
      
    } as Course;

    if (this.isEditMode) {

      const updatedCourse: Course = {
       ...course,
       id: this.courseId
      } as Course;

      this.courseService
        .updateCourse(this.courseId, updatedCourse)
        .subscribe({
           next: (res) => {
            this.snackBar.open('Course Updated Successfully','Close',
                   {
                    duration: 3000
                   }
            );
            this.router.navigate(['/courses']);
           },
           error: (err) => {
           }
        });
      

    } else {

      this.courseService
        .addCourse(course as Course)
        .subscribe(() => {
          this.snackBar.open('Course Added Successfully','Close',
                   {
                    duration: 3000
                   }
            );
          this.router.navigate(['/courses']);
        });

    }
  }


}
