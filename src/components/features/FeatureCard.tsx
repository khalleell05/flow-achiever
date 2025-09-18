import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status?: "secure" | "warning" | "danger" | "neutral";
}

export const FeatureCard = ({ icon, title, description, status = "neutral" }: FeatureCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "secure":
        return "status-secure";
      case "warning":
        return "status-warning";
      case "danger":
        return "status-danger";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className="glass hover:shadow-xl transition-smooth hover:scale-105 border-primary/10">
      <CardHeader className="text-center">
        <div className={`flex justify-center mb-4 ${getStatusColor()}`}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};