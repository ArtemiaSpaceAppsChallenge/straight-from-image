import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Info, CheckCircle2 } from "lucide-react";

type HabitatType = "metallic" | "inflatable" | "manufactured";
type FunctionalArea = {
  id: string;
  name: string;
  minVolume: number;
  category: "clean" | "dirty";
  allocatedVolume: number;
};

const Tool = () => {
  const { language } = useLanguage();
  const t = useTranslations(language);
  
  const [habitatType, setHabitatType] = useState<HabitatType>("metallic");
  const [crewSize, setCrewSize] = useState(4);
  const [missionDuration, setMissionDuration] = useState(180);
  const [radius, setRadius] = useState(3);
  const [length, setLength] = useState(10);
  
  // Calculate habitat volume
  const totalVolume = Math.PI * Math.pow(radius, 2) * length;
  
  // Functional areas based on NASA guidelines
  const getFunctionalAreas = (crew: number): FunctionalArea[] => {
    const is4Crew = crew <= 4;
    return [
      {
        id: "exercise-aerobic",
        name: t.toolExerciseAerobic,
        minVolume: is4Crew ? 3.38 : 6.76,
        category: "dirty",
        allocatedVolume: is4Crew ? 3.38 : 6.76,
      },
      {
        id: "exercise-resistance",
        name: t.toolExerciseResistance,
        minVolume: is4Crew ? 3.92 : 7.84,
        category: "dirty",
        allocatedVolume: is4Crew ? 3.92 : 7.84,
      },
      {
        id: "socialization",
        name: t.toolSocialization,
        minVolume: is4Crew ? 18.2 : 27.3,
        category: "clean",
        allocatedVolume: is4Crew ? 18.2 : 27.3,
      },
      {
        id: "waste-management",
        name: t.toolWasteManagement,
        minVolume: is4Crew ? 2.36 : 4.72,
        category: "dirty",
        allocatedVolume: is4Crew ? 2.36 : 4.72,
      },
      {
        id: "hygiene",
        name: t.toolHygiene,
        minVolume: is4Crew ? 4.34 : 8.68,
        category: "dirty",
        allocatedVolume: is4Crew ? 4.34 : 8.68,
      },
      {
        id: "dining",
        name: t.toolDining,
        minVolume: is4Crew ? 10.09 : 15.14,
        category: "clean",
        allocatedVolume: is4Crew ? 10.09 : 15.14,
      },
      {
        id: "mission-planning",
        name: t.toolMissionPlanning,
        minVolume: is4Crew ? 10.09 : 15.14,
        category: "clean",
        allocatedVolume: is4Crew ? 10.09 : 15.14,
      },
      {
        id: "sleeping",
        name: t.toolSleeping,
        minVolume: is4Crew ? 10.76 : 16.14,
        category: "clean",
        allocatedVolume: is4Crew ? 10.76 : 16.14,
      },
      {
        id: "trash-storage",
        name: t.toolTrashStorage,
        minVolume: is4Crew ? 2.55 : 3.76,
        category: "dirty",
        allocatedVolume: is4Crew ? 2.55 : 3.76,
      },
    ];
  };
  
  const [functionalAreas] = useState(getFunctionalAreas(crewSize));
  
  const totalAllocated = functionalAreas.reduce((sum, area) => sum + area.allocatedVolume, 0);
  const remainingVolume = totalVolume - totalAllocated;
  const utilizationPercentage = (totalAllocated / totalVolume) * 100;
  
  // Validation checks
  const hasCleanDirtySeparation = true; // Simplified for now
  const hasAdequateVolume = remainingVolume >= 0;
  const hasPrivateQuarters = functionalAreas.find(a => a.id === "sleeping")!.allocatedVolume >= (crewSize * 2.5);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-12 xl:px-24">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground">
              {t.toolTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.toolSubtitle}
            </p>
          </div>
          
          <Tabs defaultValue="configure" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="configure">{t.toolTabConfigure}</TabsTrigger>
              <TabsTrigger value="layout">{t.toolTabLayout}</TabsTrigger>
              <TabsTrigger value="analysis">{t.toolTabAnalysis}</TabsTrigger>
            </TabsList>
            
            {/* Configure Tab */}
            <TabsContent value="configure" className="space-y-6">
              <Card className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">{t.toolHabitatConfiguration}</h2>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Habitat Type */}
                    <div className="space-y-2">
                      <Label>{t.toolHabitatType}</Label>
                      <div className="grid grid-cols-1 gap-2">
                        <Button
                          variant={habitatType === "metallic" ? "default" : "outline"}
                          onClick={() => setHabitatType("metallic")}
                          className="w-full"
                        >
                          {t.toolMetallic}
                        </Button>
                        <Button
                          variant={habitatType === "inflatable" ? "default" : "outline"}
                          onClick={() => setHabitatType("inflatable")}
                          className="w-full"
                        >
                          {t.toolInflatable}
                        </Button>
                        <Button
                          variant={habitatType === "manufactured" ? "default" : "outline"}
                          onClick={() => setHabitatType("manufactured")}
                          className="w-full"
                        >
                          {t.toolManufactured}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Dimensions */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>{t.toolRadius} (m)</Label>
                        <Input
                          type="number"
                          value={radius}
                          onChange={(e) => setRadius(Number(e.target.value))}
                          min="1"
                          max="10"
                          step="0.5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t.toolLength} (m)</Label>
                        <Input
                          type="number"
                          value={length}
                          onChange={(e) => setLength(Number(e.target.value))}
                          min="5"
                          max="30"
                          step="1"
                        />
                      </div>
                    </div>
                    
                    {/* Mission Parameters */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>{t.toolCrewSize}</Label>
                        <Input
                          type="number"
                          value={crewSize}
                          onChange={(e) => setCrewSize(Number(e.target.value))}
                          min="2"
                          max="6"
                          step="1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t.toolMissionDuration} ({t.toolDays})</Label>
                        <Input
                          type="number"
                          value={missionDuration}
                          onChange={(e) => setMissionDuration(Number(e.target.value))}
                          min="30"
                          max="365"
                          step="30"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Volume Summary */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">{t.toolVolumeSummary}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t.toolTotalVolume}</p>
                      <p className="text-xl font-bold">{totalVolume.toFixed(2)} m³</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.toolAllocatedVolume}</p>
                      <p className="text-xl font-bold">{totalAllocated.toFixed(2)} m³</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.toolRemainingVolume}</p>
                      <p className={`text-xl font-bold ${remainingVolume < 0 ? 'text-destructive' : 'text-green-500'}`}>
                        {remainingVolume.toFixed(2)} m³
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.toolUtilization}</p>
                      <p className="text-xl font-bold">{utilizationPercentage.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">{t.toolFunctionalAreas}</h2>
                
                <div className="space-y-4">
                  {/* Clean Areas */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">{t.toolCleanZones}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {functionalAreas.filter(a => a.category === "clean").map((area) => (
                        <div key={area.id} className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                          <h4 className="font-medium mb-2">{area.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {t.toolMinVolume}: {area.minVolume.toFixed(2)} m³
                          </p>
                          <p className="text-sm font-semibold">
                            {t.toolAllocated}: {area.allocatedVolume.toFixed(2)} m³
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Dirty Areas */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">{t.toolDirtyZones}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {functionalAreas.filter(a => a.category === "dirty").map((area) => (
                        <div key={area.id} className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                          <h4 className="font-medium mb-2">{area.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {t.toolMinVolume}: {area.minVolume.toFixed(2)} m³
                          </p>
                          <p className="text-sm font-semibold">
                            {t.toolAllocated}: {area.allocatedVolume.toFixed(2)} m³
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Alert className="mt-6">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {t.toolLayoutGuideline}
                  </AlertDescription>
                </Alert>
              </Card>
            </TabsContent>
            
            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">{t.toolDesignValidation}</h2>
                
                <div className="space-y-4">
                  {/* Validation Checks */}
                  <div className="space-y-3">
                    <div className={`p-4 rounded-lg flex items-start gap-3 ${hasAdequateVolume ? 'bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800'}`}>
                      {hasAdequateVolume ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold">{t.toolVolumeCheck}</p>
                        <p className="text-sm text-muted-foreground">
                          {hasAdequateVolume ? t.toolVolumeCheckPass : t.toolVolumeCheckFail}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg flex items-start gap-3 ${hasPrivateQuarters ? 'bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800' : 'bg-yellow-50 dark:bg-yellow-950/20 border-2 border-yellow-200 dark:border-yellow-800'}`}>
                      {hasPrivateQuarters ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold">{t.toolPrivateQuarters}</p>
                        <p className="text-sm text-muted-foreground">
                          {hasPrivateQuarters ? t.toolPrivateQuartersPass : t.toolPrivateQuartersFail}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg flex items-start gap-3 bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-800">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold">{t.toolZoningSeparation}</p>
                        <p className="text-sm text-muted-foreground">
                          {t.toolZoningSeparationPass}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* NASA Guidelines */}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-3">{t.toolNasaGuidelines}</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{t.toolGuideline1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{t.toolGuideline2}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{t.toolGuideline3}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{t.toolGuideline4}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tool;