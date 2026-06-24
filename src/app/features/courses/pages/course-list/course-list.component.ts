import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatSortModule, MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-course-list',
  imports: [MatTableModule,MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule,MatSelectModule,
  FormsModule,RouterModule,MatSnackBarModule,MatPaginatorModule,MatDialogModule,MatSortModule,],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent implements OnInit , AfterViewInit{
  private courseService = inject(CourseService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  courses: Course[] = [];

  dataSource = new MatTableDataSource<Course>([]);

  searchTerm = '';
  selectedStatus = '';

  isLoading = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns = [
   'id',
   'courseName',
   'instructorName',
   'category',
   'status',
   'actions'
 ];

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.dataSource.data = data;
        /* console.log(data); */
      },
      error: (err) => {
        // console.error(err);
      }
    });

    this.loadCourses();
  }

  applyFilters() {

  const filtered = this.courses.filter(course => {

    const matchesSearch =
      course.courseName
      .toLowerCase()
      .includes(this.searchTerm.toLowerCase());

    const matchesStatus =
      !this.selectedStatus ||
      course.status === this.selectedStatus;

    return matchesSearch && matchesStatus;
  });
  this.dataSource.data = filtered;

}

loadCourses() {

  this.isLoading = true;

  this.courseService
    .getCourses()
    .subscribe(data => {

      this.courses = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;

      this.isLoading = false;

    });
}

deleteCourse(id: string | number) {

  const dialogRef = this.dialog.open(
    ConfirmDialogComponent
  );

  dialogRef.afterClosed()
    .subscribe(result => {

      if (!result) return;
        
      this.courseService.deleteCourse(id).subscribe(() => {
       this.snackBar.open('Course Deleted Successfully','Close',
                   {
                    duration: 3000
                   }
        );

       this.loadCourses();
    });

  

    });
}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

}
