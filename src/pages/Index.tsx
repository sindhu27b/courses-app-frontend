import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import SupportSection from '@/components/SupportSection';
import { useCourses } from '@/hooks/useCourses';
import { Skeleton } from '@/components/ui/skeleton';
import heroImage from '@/assets/image.png';

const Index = () => {
  const { data: courses, isLoading, error } = useCourses();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[400px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="container mx-auto text-center relative z-10 h-full flex flex-col justify-end pb-4 px-4">
            <h1 className="text-2xl md:text-3xl font-medium text-foreground/90 mb-2">
              Learn. Build. Grow.
            </h1>
            <p className="text-sm text-foreground">
              Start coding journey today.
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {isLoading ? (
                <>
                  <Skeleton className="h-48 rounded-lg" />
                  <Skeleton className="h-48 rounded-lg" />
                </>
              ) : error ? (
                <p className="col-span-2 text-center text-destructive">Failed to load courses</p>
              ) : (
                courses?.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <SupportSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;