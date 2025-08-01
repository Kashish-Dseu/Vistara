import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Languages,
  Camera,
  MapPin,
  Calendar,
  Phone,
  Navigation,
  Zap,
  Globe,
  MessageCircle,
  Upload,
  Mic,
  MicOff,
  Volume2,
  Copy,
  Share2,
  Star,
  Clock,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [isListening, setIsListening] = useState(false);
  const [translationText, setTranslationText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("Spanish");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const handleTranslate = () => {
    // Simulated translation with cultural context
    setTranslatedText(
      `¡Hola! ¿Cómo estás? (Cultural note: In Spain, this casual greeting is perfect for most situations. Local slang: You might also hear "¿Qué tal?" which means the same thing)`,
    );
  };

  const handleVoiceTranslation = () => {
    setIsListening(!isListening);
    // Simulated voice input
    if (!isListening) {
      setTimeout(() => {
        setTranslationText("Hello, how are you?");
        setIsListening(false);
      }, 2000);
    }
  };

  const emergencyContacts = [
    {
      type: "Embassy",
      name: "US Embassy Madrid",
      phone: "+34 91 587 2200",
      distance: "2.3 km",
    },
    {
      type: "Hospital",
      name: "Hospital Universitario",
      phone: "+34 91 586 8000",
      distance: "1.1 km",
    },
    {
      type: "Police",
      name: "Policía Nacional",
      phone: "091",
      distance: "0.8 km",
    },
  ];

  const localEvents = [
    {
      name: "Flamenco Night at Casa Patas",
      time: "9:00 PM",
      price: "€25",
      category: "Culture",
    },
    {
      name: "Retiro Park Morning Walk",
      time: "8:00 AM",
      price: "Free",
      category: "Outdoor",
    },
    {
      name: "Tapas Tour in La Latina",
      time: "7:00 PM",
      price: "€35",
      category: "Food",
    },
  ];

  // Dummy image classifier/recognition data
  const dummyAnalysisResults = {
    eiffel_tower: {
      name: "Eiffel Tower",
      location: "Paris, France",
      facts: [
        "Built in 1889 for the World's Fair, it was initially criticized by Parisians but became the symbol of Paris",
        "The tower grows about 6 inches taller in summer due to thermal expansion of the iron",
        "It was the world's tallest structure until 1930 and weighs approximately 10,100 tons",
      ],
      bestTimeToVisit:
        "Early morning (8-10 AM) or evening (6-8 PM) for golden hour photos and fewer crowds",
      localTips: [
        "Go early to avoid crowds - arrive by 9 AM for shortest lines",
        "Book skip-the-line tickets online in advance",
        "Visit the nearby Trocadéro for the best photo spots",
        "Evening visits offer stunning city lights views",
      ],
    },
    colosseum: {
      name: "Colosseum",
      location: "Rome, Italy",
      facts: [
        "Completed in 80 AD, it could hold 50,000-80,000 spectators and hosted gladiator contests",
        "The arena floor was covered with sand to absorb blood, and had a complex underground system called the hypogeum",
        "It's the largest amphitheater ever built and is considered one of the greatest works of Roman engineering",
      ],
      bestTimeToVisit:
        "Early morning (8:30 AM) or late afternoon (4-6 PM) to avoid peak crowds and heat",
      localTips: [
        "Go early to avoid crowds - first entry at 8:30 AM is ideal",
        "Bring water and wear comfortable shoes",
        "Combine with Roman Forum and Palatine Hill tickets",
        "Underground and upper levels require special tickets",
      ],
    },
    sushi: {
      name: "Traditional Sushi",
      location: "Japanese Cuisine",
      facts: [
        "Originally a method of preserving fish in fermented rice, modern sushi was developed in Tokyo in the 1800s",
        "The rice should be body temperature when served, and traditionally eaten with hands, not chopsticks",
        "Master sushi chefs train for decades - it takes 3 years just to learn to properly cook the rice",
      ],
      bestTimeToVisit:
        "Lunch time (11 AM - 2 PM) for fresh morning fish, or dinner (6-8 PM) for full experience",
      localTips: [
        "Go early to avoid crowds at popular sushi restaurants",
        "Eat sushi immediately when served for best taste",
        "Don't mix wasabi with soy sauce - add it directly to the fish",
        "Sit at the sushi counter to watch the master at work",
      ],
    },
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
        analyzeImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // Simulate camera capture with a dummy image
    const dummyImages = [
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400", // Eiffel Tower
      "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=400", // Colosseum
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400", // Sushi
    ];
    const randomImage =
      dummyImages[Math.floor(Math.random() * dummyImages.length)];
    setUploadedImage(randomImage);
    analyzeImage(randomImage);
  };

  const analyzeImage = (imageUrl: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate image analysis processing time
    setTimeout(() => {
      // Dummy classifier - randomly pick a result based on image
      const results = Object.values(dummyAnalysisResults);
      const randomResult = results[Math.floor(Math.random() * results.length)];

      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20 md:pb-0">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
              AI Travel Companion
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Translate conversations with cultural context, discover local
              events, identify landmarks, and navigate the world with AI-powered
              insights and emergency assistance.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="secondary" className="px-4 py-2">
                <Languages className="w-4 h-4 mr-2" />
                50+ Languages
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Real-time AI
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Navigation className="w-4 h-4 mr-2" />
                Offline Maps
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="translate" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="translate">
              <Languages className="w-4 h-4 mr-2" />
              Translate
            </TabsTrigger>
            <TabsTrigger value="photo">
              <Camera className="w-4 h-4 mr-2" />
              Photo AI
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="emergency">
              <Phone className="w-4 h-4 mr-2" />
              Emergency
            </TabsTrigger>
          </TabsList>

          {/* Translation Tab */}
          <TabsContent value="translate" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="w-6 h-6 text-primary" />
                  Cultural Translation
                </CardTitle>
                <CardDescription>
                  Get translations with cultural context and local slang
                  explanations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4" />
                      <span className="font-medium">
                        English → {selectedLanguage}
                      </span>
                    </div>
                    <Textarea
                      placeholder="Type or speak your message..."
                      value={translationText}
                      onChange={(e) => setTranslationText(e.target.value)}
                      className="min-h-[120px] border-2 border-dashed border-primary/20 focus:border-primary/50"
                    />
                    <div className="flex gap-2">
                      <Button
                        variant={isListening ? "destructive" : "outline"}
                        size="sm"
                        onClick={handleVoiceTranslation}
                        className="flex-1"
                      >
                        {isListening ? (
                          <MicOff className="w-4 h-4 mr-2" />
                        ) : (
                          <Mic className="w-4 h-4 mr-2" />
                        )}
                        {isListening ? "Stop Listening" : "Voice Input"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Audio
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-medium">
                          Translation with Context
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="min-h-[120px] p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border">
                      {translatedText || (
                        <p className="text-muted-foreground italic">
                          Translation will appear here with cultural context and
                          local slang explanations...
                        </p>
                      )}
                    </div>
                    <Button onClick={handleTranslate} className="w-full">
                      <Zap className="w-4 h-4 mr-2" />
                      Translate with AI Context
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["Spanish", "French", "Japanese", "Arabic"].map((lang) => (
                    <Button
                      key={lang}
                      variant={
                        selectedLanguage === lang ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedLanguage(lang)}
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photo AI Tab */}
          <TabsContent value="photo" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-6 h-6 text-primary" />
                  AI Photo Recognition
                </CardTitle>
                <CardDescription>
                  Take a photo and get instant information, fun facts, and
                  visiting tips
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo Upload/Capture Section */}
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center">
                    <Camera className="w-16 h-16 mx-auto text-primary/40 mb-4" />
                    <p className="text-lg font-medium mb-2">Snap a Photo</p>
                    <p className="text-muted-foreground mb-4">
                      Point your camera at landmarks, food, signs, or anything
                      you're curious about
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onClick={handleCameraCapture}>
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                      <Button variant="outline" asChild>
                        <label
                          htmlFor="photo-upload"
                          className="cursor-pointer"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Image
                        </label>
                      </Button>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Uploaded Image Display */}
                    <div className="relative">
                      <img
                        src={uploadedImage}
                        alt="Uploaded photo"
                        className="w-full h-64 object-cover rounded-lg border"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
                        onClick={() => {
                          setUploadedImage(null);
                          setAnalysisResult(null);
                          setIsAnalyzing(false);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Analysis Loading */}
                    {isAnalyzing && (
                      <Card className="border-primary/20 bg-blue-50/50">
                        <CardContent className="p-6 text-center">
                          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                          <p className="font-medium mb-2">
                            Analyzing your photo...
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Using AI to identify landmarks, objects, and
                            cultural context
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {/* Analysis Results */}
                    {analysisResult && !isAnalyzing && (
                      <div className="space-y-4">
                        <Card className="border-primary/20 bg-gradient-to-br from-blue-50 to-green-50">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Star className="w-6 h-6 text-primary" />
                              {analysisResult.name}
                            </CardTitle>
                            <CardDescription>
                              {analysisResult.location}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Interesting Facts */}
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Users className="w-4 h-4 text-yellow-600" />
                                Interesting Facts
                              </h4>
                              <ul className="space-y-2">
                                {analysisResult.facts.map(
                                  (fact: string, index: number) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2 text-sm"
                                    >
                                      <Badge
                                        variant="outline"
                                        className="min-w-[20px] h-5 p-0 flex items-center justify-center text-xs"
                                      >
                                        {index + 1}
                                      </Badge>
                                      <span>{fact}</span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>

                            {/* Best Time to Visit */}
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-green-600" />
                                Best Time to Visit
                              </h4>
                              <p className="text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                                {analysisResult.bestTimeToVisit}
                              </p>
                            </div>

                            {/* Local Tips */}
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-blue-600" />
                                Local Tips
                              </h4>
                              <ul className="space-y-2">
                                {analysisResult.localTips.map(
                                  (tip: string, index: number) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2 text-sm"
                                    >
                                      <Badge
                                        variant="secondary"
                                        className="min-w-[20px] h-5 p-0 flex items-center justify-center text-xs"
                                      >
                                        💡
                                      </Badge>
                                      <span>{tip}</span>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                )}

                {/* Feature Overview Cards - Show when no image uploaded */}
                {!uploadedImage && (
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardContent className="p-4 text-center">
                        <Star className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                        <h3 className="font-semibold mb-1">What is it?</h3>
                        <p className="text-sm text-muted-foreground">
                          Instant identification and description
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-green-100">
                      <CardContent className="p-4 text-center">
                        <Clock className="w-8 h-8 mx-auto text-green-600 mb-2" />
                        <h3 className="font-semibold mb-1">
                          Best time to visit
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Optimal timing recommendations
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
                      <CardContent className="p-4 text-center">
                        <Users className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
                        <h3 className="font-semibold mb-1">Fun facts</h3>
                        <p className="text-sm text-muted-foreground">
                          Interesting historical details
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Local Events & Activities
                </CardTitle>
                <CardDescription>
                  AI-curated events and activities happening near you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {localEvents.map((event, index) => (
                  <Card key={index} className="border border-primary/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{event.name}</h3>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                        <span>{event.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Discover More Events Nearby
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-6 h-6 text-primary" />
                  Emergency Contacts & Services
                </CardTitle>
                <CardDescription>
                  Location-based emergency contacts and important services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <Card
                    key={index}
                    className="border border-red-100 bg-red-50/50"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {contact.type}
                          </p>
                        </div>
                        <Badge variant="outline">{contact.distance}</Badge>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call {contact.phone}
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button variant="outline">
                    <Navigation className="w-4 h-4 mr-2" />
                    Offline Maps
                  </Button>
                  <Button variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    Find Nearest ATM
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
