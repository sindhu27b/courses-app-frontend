import { useQuery } from '@tanstack/react-query';
import { courseApi } from '@/services/courseApi';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: courseApi.getAllCourses,
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => courseApi.getCourseById(id),
    enabled: !!id,
  });
};
