import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-details',
  imports: [RouterModule, MatButtonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent {

  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private router = inject(Router);

  course?: Course;

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.courseService
        .getCourseById(id)
        .subscribe(course => {

          this.course = course;

        });
    }
  }

  goBack() {
    this.router.navigate(['/courses']);
  }

}
