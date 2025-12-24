import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SupportSection from '@/components/SupportSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCourse } from '@/hooks/useCourses';
import { ExternalLink, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user, isLoading: authLoading } = useAuth();
  const { data: course, isLoading: courseLoading } = useCourse(courseId || '');

  if (authLoading || courseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (!course) {
    return <Navigate to="/" />;
  }

  const handleStartLearning = () => {
    window.open(course.externalUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to courses
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Course Header */}
            <Card className="border-border/50 shadow-[var(--shadow-elevated)] mb-8 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${course.gradient}`} />
              <CardHeader className="pb-4">
                <div className="text-6xl mb-4">{course.icon}</div>
                <CardTitle className="text-3xl font-bold text-foreground">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleStartLearning}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  Start Learning
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card className="border-border/50 shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-xl font-bold">What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-4">
                  {[
                    'Industry-standard concepts and practices',
                    'Hands-on projects and exercises',
                    'Problem-solving techniques',
                    'Best practices and patterns',
                    'Real-world application examples',
                    'Interview preparation tips',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <SupportSection />
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
