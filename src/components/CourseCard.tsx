import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Course } from '@/data/courses';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  const handleClick = () => {
     if (isLoading) {
      return; // Wait for auth check to complete
    }
    if (isAuthenticated) {
      navigate(`/course/${course.id}`);
    } else {
      navigate('/auth');
    }
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1">
         <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none`} />
          <CardHeader className="pb-3">
        <div className="text-4xl mb-3">{course.icon}</div>
        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {course.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm leading-relaxed">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          onClick={handleClick}
           className="w-full bg-primary hover:bg-primary/80 text-primary-foreground shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 font-semibold">
          Start Learning
           <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /> </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
