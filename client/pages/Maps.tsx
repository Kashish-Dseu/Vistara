import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Navigation,
  Download,
  Wifi,
  WifiOff,
  Compass,
  Locate,
  Plus,
  Minus,
  Layers,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface Location {
  lat: number;
  lng: number;
}

interface MapTile {
  x: number;
  y: number;
  z: number;
  downloaded: boolean;
}

export default function Maps() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string>("");
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [zoomLevel, setZoomLevel] = useState(15);
  const [downloadedTiles, setDownloadedTiles] = useState<MapTile[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError("");
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationError("Location access denied by user");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationError("Location information is unavailable");
              break;
            case error.TIMEOUT:
              setLocationError("Location request timed out");
              break;
            default:
              setLocationError("An unknown error occurred");
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    } else {
      setLocationError("Geolocation is not supported by this browser");
    }
  }, []);

  // Monitor online status
  useEffect(() => {
    const handleOnlineStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const handleDownloadOfflineMap = () => {
    setIsDownloading(true);
    // Simulate downloading map tiles
    setTimeout(() => {
      const newTiles: MapTile[] = [];
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          newTiles.push({ x, y, z: zoomLevel, downloaded: true });
        }
      }
      setDownloadedTiles((prev) => [...prev, ...newTiles]);
      setIsDownloading(false);
    }, 3000);
  };

  const getLocationName = () => {
    if (!currentLocation) return "Unknown Location";
    // This would normally use reverse geocoding
    return `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20 md:pb-0 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Offline Maps</h1>
            <Badge
              variant={isOffline ? "destructive" : "secondary"}
              className="flex items-center gap-2"
            >
              {isOffline ? (
                <WifiOff className="w-4 h-4" />
              ) : (
                <Wifi className="w-4 h-4" />
              )}
              {isOffline ? "Offline" : "Online"}
            </Badge>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Display */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Interactive Map
                </CardTitle>
                <CardDescription>
                  {currentLocation
                    ? `Current location: ${getLocationName()}`
                    : "Getting your location..."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Map Container */}
                <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-dashed border-primary/20 overflow-hidden">
                  {/* Simulated Map Grid */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-20">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-primary/30"></div>
                    ))}
                  </div>

                  {/* Current Location Marker */}
                  {currentLocation && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                        <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  )}

                  {/* Location Error */}
                  {locationError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Card className="bg-red-50 border-red-200">
                        <CardContent className="p-4 text-center">
                          <MapPin className="w-8 h-8 text-red-500 mx-auto mb-2" />
                          <p className="text-red-700 text-sm">
                            {locationError}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => window.location.reload()}
                          >
                            Retry Location
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Zoom Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        setZoomLevel((prev) => Math.min(prev + 1, 20))
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        setZoomLevel((prev) => Math.max(prev - 1, 1))
                      }
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Compass */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 rounded-full border shadow-lg flex items-center justify-center">
                      <Compass className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Zoom Level Indicator */}
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary">Zoom: {zoomLevel}</Badge>
                  </div>
                </div>

                {/* Map Controls */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Locate className="w-4 h-4 mr-2" />
                    Re-center
                  </Button>
                  <Button variant="outline" size="sm">
                    <Layers className="w-4 h-4 mr-2" />
                    Layers
                  </Button>
                  <Button variant="outline" size="sm">
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Info */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Current Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentLocation ? (
                  <>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Coordinates:
                      </p>
                      <p className="font-mono text-sm">
                        {currentLocation.lat.toFixed(6)},{" "}
                        {currentLocation.lng.toFixed(6)}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Accuracy:</p>
                      <p className="text-sm">±10 meters</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">
                      Getting location...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Offline Download */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  Offline Maps
                </CardTitle>
                <CardDescription>Download maps for offline use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Downloaded tiles:
                  </p>
                  <p className="text-sm font-medium">
                    {downloadedTiles.length} tiles
                  </p>
                </div>

                <Button
                  onClick={handleDownloadOfflineMap}
                  disabled={isDownloading || !currentLocation}
                  className="w-full"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Area
                    </>
                  )}
                </Button>

                {downloadedTiles.length > 0 && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✓ This area is available offline
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Nearby Points */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Nearby Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Hospital", distance: "0.8 km", type: "emergency" },
                  { name: "ATM", distance: "0.3 km", type: "service" },
                  { name: "Restaurant", distance: "0.2 km", type: "food" },
                ].map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{point.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {point.distance}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
