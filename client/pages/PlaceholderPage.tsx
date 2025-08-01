import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  feature: string;
}

export default function PlaceholderPage({ title, description, feature }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <div className="flex justify-center mb-4">
                <Construction className="w-16 h-16 text-primary/40" />
              </div>
              <CardTitle className="text-3xl mb-2">{title}</CardTitle>
              <CardDescription className="text-lg">{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
                <p className="text-muted-foreground">
                  The <strong>{feature}</strong> feature is coming soon! This will be a dedicated page for {feature.toLowerCase()} functionality.
                </p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Want to see this feature developed? Continue prompting for specific functionality you'd like to see implemented.
                </p>
                <Button asChild className="w-full">
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
