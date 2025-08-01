import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Users
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
    setTranslatedText(`¡Hola! ¿Cómo estás? (Cultural note: In Spain, this casual greeting is perfect for most situations. Local slang: You might also hear "¿Qué tal?" which means the same thing)`);
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
    { type: "Embassy", name: "US Embassy Madrid", phone: "+34 91 587 2200", distance: "2.3 km" },
    { type: "Hospital", name: "Hospital Universitario", phone: "+34 91 586 8000", distance: "1.1 km" },
    { type: "Police", name: "Policía Nacional", phone: "091", distance: "0.8 km" }
  ];

  const localEvents = [
    { name: "Flamenco Night at Casa Patas", time: "9:00 PM", price: "€25", category: "Culture" },
    { name: "Retiro Park Morning Walk", time: "8:00 AM", price: "Free", category: "Outdoor" },
    { name: "Tapas Tour in La Latina", time: "7:00 PM", price: "€35", category: "Food" }
  ];

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
              Translate conversations with cultural context, discover local events, identify landmarks, 
              and navigate the world with AI-powered insights and emergency assistance.
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
                  Get translations with cultural context and local slang explanations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4" />
                      <span className="font-medium">English → {selectedLanguage}</span>
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
                        {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
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
                        <span className="font-medium">Translation with Context</span>
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
                        <p className="text-muted-foreground italic">Translation will appear here with cultural context and local slang explanations...</p>
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
                      variant={selectedLanguage === lang ? "default" : "outline"}
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
                  Take a photo and get instant information, fun facts, and visiting tips
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center">
                  <Camera className="w-16 h-16 mx-auto text-primary/40 mb-4" />
                  <p className="text-lg font-medium mb-2">Snap a Photo</p>
                  <p className="text-muted-foreground mb-4">Point your camera at landmarks, food, signs, or anything you're curious about</p>
                  <div className="flex gap-2 justify-center">
                    <Button>
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="p-4 text-center">
                      <Star className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                      <h3 className="font-semibold mb-1">What is it?</h3>
                      <p className="text-sm text-muted-foreground">Instant identification and description</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-50 to-green-100">
                    <CardContent className="p-4 text-center">
                      <Clock className="w-8 h-8 mx-auto text-green-600 mb-2" />
                      <h3 className="font-semibold mb-1">Best time to visit</h3>
                      <p className="text-sm text-muted-foreground">Optimal timing recommendations</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
                      <h3 className="font-semibold mb-1">Fun facts</h3>
                      <p className="text-sm text-muted-foreground">Interesting historical details</p>
                    </CardContent>
                  </Card>
                </div>
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
                  <Card key={index} className="border border-red-100 bg-red-50/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">{contact.type}</p>
                        </div>
                        <Badge variant="outline">{contact.distance}</Badge>
                      </div>
                      <Button variant="destructive" size="sm" className="w-full">
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
