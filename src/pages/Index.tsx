import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { LoginModal } from "@/components/auth/LoginModal";
import { Dashboard } from "@/pages/Dashboard";
import { FeatureCard } from "@/components/features/FeatureCard";
import { MapPin, Camera, Smartphone, Shield, Users, BarChart3, Lock, Clock, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-classguard.jpg";
import gpsIcon from "@/assets/icon-gps-security.png";
import faceIcon from "@/assets/icon-face-recognition.png";
import deviceIcon from "@/assets/icon-device-binding.png";

const Index = () => {
  const [user, setUser] = useState<{ name: string; role: "Admin" | "Teacher" | "Student" } | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = (userData: { name: string; role: "Admin" | "Teacher" | "Student" }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={handleLogout} />
        <Dashboard user={user} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLogin={() => setShowLoginModal(true)} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="ClassGuard Smart Attendance System" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-16 w-16" />
            <h1 className="text-5xl md:text-7xl font-bold">ClassGuard</h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Revolutionary attendance management with GPS verification, device binding, and facial recognition. 
            Eliminate proxy attendance forever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="glass"
              onClick={() => setShowLoginModal(true)}
              className="text-lg px-8 py-4"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="glass p-4 rounded-lg text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">99.9% Accuracy</p>
            </div>
            <div className="glass p-4 rounded-lg text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">10,000+ Users</p>
            </div>
            <div className="glass p-4 rounded-lg text-center">
              <Lock className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Bank-Level Security</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Three-Layer Security System</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ClassGuard uses multiple verification methods to ensure only physically present students can mark attendance
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<img src={gpsIcon} alt="GPS Security" className="h-16 w-16" />}
              title="GPS Verification"
              description="Students must be within the classroom's GPS radius to mark attendance. Location is verified in real-time using precise geolocation technology."
              status="secure"
            />
            <FeatureCard
              icon={<img src={deviceIcon} alt="Device Binding" className="h-16 w-16" />}
              title="Device Binding"
              description="Each student account is permanently linked to their registered device, preventing account sharing and proxy attendance attempts."
              status="secure"
            />
            <FeatureCard
              icon={<img src={faceIcon} alt="Face Recognition" className="h-16 w-16" />}
              title="Facial Recognition"
              description="Advanced biometric verification ensures the registered student is physically present. AI-powered spoof detection prevents photo attacks."
              status="secure"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose ClassGuard?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed for educational institutions that demand accuracy, security, and ease of use
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Clock className="h-12 w-12" />}
              title="Real-Time Tracking"
              description="Monitor attendance as it happens with live session management and instant notifications."
            />
            <FeatureCard
              icon={<BarChart3 className="h-12 w-12" />}
              title="Detailed Analytics"
              description="Comprehensive reports and analytics help teachers and administrators make informed decisions."
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12" />}
              title="Bank-Level Security"
              description="End-to-end encryption and JWT authentication protect sensitive student data."
            />
            <FeatureCard
              icon={<Users className="h-12 w-12" />}
              title="Multi-Role Support"
              description="Tailored interfaces for students, teachers, and administrators with role-based permissions."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glass p-12 rounded-2xl">
            <h2 className="text-4xl font-bold mb-6">Ready to Eliminate Proxy Attendance?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of educational institutions already using ClassGuard to ensure accurate attendance tracking.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => setShowLoginModal(true)}
                className="text-lg px-8 py-4"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-4"
              >
                Schedule Demo
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • 30-day free trial • 24/7 support
            </p>
          </div>
        </div>
      </section>

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default Index;
