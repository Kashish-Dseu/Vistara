import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Settings,
  Heart,
  MessageSquare,
  HelpCircle,
  Edit,
  Mail,
  Globe,
  MapPin,
  Calendar,
  Camera,
  Languages,
  Star,
  Clock,
  Shield,
  Bell,
  Download,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Mock user data
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    country: "United States",
    preferredLanguage: "English",
    joinDate: "March 2024",
    avatar: "",
  };

  const userStats = {
    translationsUsed: 1247,
    photosAnalyzed: 89,
    countriesVisited: 12,
    offlineMapsDownloaded: 8,
  };

  const recentActivity = [
    {
      type: "translation",
      description: "Translated Spanish to English",
      time: "2 hours ago",
      location: "Madrid, Spain",
    },
    {
      type: "photo",
      description: "Analyzed Sagrada Família",
      time: "5 hours ago",
      location: "Barcelona, Spain",
    },
    {
      type: "map",
      description: "Downloaded offline map",
      time: "1 day ago",
      location: "Barcelona, Spain",
    },
    {
      type: "emergency",
      description: "Found nearest hospital",
      time: "3 days ago",
      location: "Paris, France",
    },
  ];

  const faqs = [
    {
      id: "offline-maps",
      question: "How do offline maps work?",
      answer:
        "Offline maps are downloaded to your device when you have internet connection. Once downloaded, you can access them without internet. The maps include street details, landmarks, and points of interest. To download, go to the Maps section and select 'Download Area' while viewing your desired location.",
    },
    {
      id: "translation-accuracy",
      question: "How accurate are the cultural translations?",
      answer:
        "Our AI translation system uses advanced language models trained on cultural context and local expressions. Accuracy is typically 95%+ for common phrases and cultural nuances. The system continuously learns from user feedback to improve accuracy over time.",
    },
    {
      id: "data-privacy",
      question: "What data do you collect and store?",
      answer:
        "We only collect data necessary to provide our services: location data (when you use maps), translation history (to improve accuracy), and photos you choose to analyze. All data is encrypted and never shared with third parties. You can delete your data anytime from the Privacy section.",
    },
    {
      id: "emergency-contacts",
      question: "How are emergency contacts determined?",
      answer:
        "Emergency contacts are automatically determined based on your current GPS location. We maintain a database of embassies, hospitals, police stations, and other emergency services worldwide. Contacts are updated in real-time and show the nearest available services.",
    },
    {
      id: "photo-analysis",
      question: "What can the photo analysis feature identify?",
      answer:
        "Our AI can identify landmarks, monuments, food dishes, street signs, plants, animals, and cultural artifacts. For each item, we provide historical context, cultural significance, best visiting times, and interesting facts. The accuracy depends on image quality and lighting conditions.",
    },
    {
      id: "subscription",
      question: "What features require a subscription?",
      answer:
        "Basic translation and photo analysis are free forever. Premium features include unlimited offline map downloads, priority customer support, advanced cultural insights, and real-time local event notifications. Free users get 3 offline map downloads per month.",
    },
  ];

  const handleSaveFeedback = () => {
    // Handle feedback submission
    console.log("Feedback submitted:", feedback);
    setFeedback("");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20 md:pb-0 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account, view your travel experience, and get help
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="experience">
              <MapPin className="w-4 h-4 mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <Heart className="w-4 h-4 mr-2" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="help">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & FAQ
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* User Info Card */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-6 h-6 text-primary" />
                        Personal Information
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar and Basic Info */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={userProfile.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white text-2xl">
                          {userProfile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold">
                          {userProfile.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {userProfile.email}
                        </p>
                        <Badge variant="secondary" className="mt-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          Member since {userProfile.joinDate}
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Profile Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userProfile.name}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            value={userProfile.email}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-muted" : ""}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="country"
                            value={userProfile.country}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-muted" : ""}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Preferred Language</Label>
                        <div className="relative">
                          <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="language"
                            value={userProfile.preferredLanguage}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-muted" : ""}`}
                          />
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-2">
                        <Button>Save Changes</Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Account Actions */}
              <div className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Notification Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Separator />
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Translations</span>
                      <span className="font-bold">
                        {userStats.translationsUsed.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Photos Analyzed</span>
                      <span className="font-bold">
                        {userStats.photosAnalyzed}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Countries Visited</span>
                      <span className="font-bold">
                        {userStats.countriesVisited}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Offline Maps</span>
                      <span className="font-bold">
                        {userStats.offlineMapsDownloaded}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Usage Statistics */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-primary" />
                    Your Travel Journey
                  </CardTitle>
                  <CardDescription>
                    See how Vistara has helped your adventures
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Translation Usage
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {userStats.translationsUsed}/2000
                        </span>
                      </div>
                      <Progress
                        value={(userStats.translationsUsed / 2000) * 100}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Photo Analysis
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {userStats.photosAnalyzed}/100
                        </span>
                      </div>
                      <Progress
                        value={(userStats.photosAnalyzed / 100) * 100}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Countries Explored
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {userStats.countriesVisited}/50
                        </span>
                      </div>
                      <Progress
                        value={(userStats.countriesVisited / 50) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <CardContent className="p-4 text-center">
                        <Languages className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                        <p className="font-bold text-2xl text-blue-700">
                          {userStats.translationsUsed}
                        </p>
                        <p className="text-sm text-blue-600">Translations</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <CardContent className="p-4 text-center">
                        <Camera className="w-8 h-8 mx-auto text-green-600 mb-2" />
                        <p className="font-bold text-2xl text-green-700">
                          {userStats.photosAnalyzed}
                        </p>
                        <p className="text-sm text-green-600">Photos</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your latest interactions with Vistara
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {activity.type === "translation" && (
                          <Languages className="w-4 h-4 text-primary" />
                        )}
                        {activity.type === "photo" && (
                          <Camera className="w-4 h-4 text-primary" />
                        )}
                        {activity.type === "map" && (
                          <MapPin className="w-4 h-4 text-primary" />
                        )}
                        {activity.type === "emergency" && (
                          <Shield className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-primary" />
                  Share Your Experience
                </CardTitle>
                <CardDescription>
                  Help us improve Vistara by sharing your feedback and
                  suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us about your experience with Vistara. What features do you love? What could be better? Any suggestions for new features?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <Button
                    onClick={handleSaveFeedback}
                    disabled={!feedback.trim()}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">Rate Our Features</h3>

                  {[
                    { feature: "Translation Accuracy", rating: 5 },
                    { feature: "Photo Analysis", rating: 4 },
                    { feature: "Offline Maps", rating: 5 },
                    { feature: "Emergency Contacts", rating: 4 },
                    { feature: "User Interface", rating: 5 },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">{item.feature}</span>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Help & FAQ Tab */}
          <TabsContent value="help" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Find answers to common questions about Vistara
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq) => (
                  <Collapsible
                    key={faq.id}
                    open={openFaq === faq.id}
                    onOpenChange={() =>
                      setOpenFaq(openFaq === faq.id ? null : faq.id)
                    }
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto text-left"
                      >
                        <span className="font-medium">{faq.question}</span>
                        {openFaq === faq.id ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CollapsibleContent>
                  </Collapsible>
                ))}

                <Separator />

                <div className="text-center pt-4">
                  <p className="text-muted-foreground mb-4">
                    Can't find what you're looking for?
                  </p>
                  <Button>
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
