export interface Course {
  id: string | number;
  courseName: string;
  instructorName: string;
  category: string;
  duration: number;
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  description?: string;
  createdDate: string;
}