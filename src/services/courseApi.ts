import { Course } from '@/data/courses';

const API_BASE_URL = 'http://localhost:8080/api';

export const courseApi = {
  async getAllCourses(): Promise<Course[]> {
    const response = await fetch(`${API_BASE_URL}/courses`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  },

  async getCourseById(id: string): Promise<Course | null> {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error('Failed to fetch course');
    }
    return response.json();
  },
};
