
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Zap, Target, Sparkles, Lock } from 'lucide-react';
import { getAvailableFeatures, canUseFeature, generateAdvancedCharacterProfile, analyzeMarketTrends, generateWorldBuildingGuide } from '@/lib/ai/premiumFeatures';
import { getUserPlan } from '@/lib/api/planService';
import { toast } from 'sonner';
import { Book } from '@/lib/api/types';

interface AIFeaturesSectionProps {
  book: Book;
}

const AIFeaturesSection: React.FC<AIFeaturesSectionProps> = ({ book }) => {
  const [loadingFeature, setLoadingFeature] = useState<string | null>(null);
  const [results, setResults] = useState<{[key: string]: string}>({});
  const userPlan = getUserPlan();
  const availableFeatures = getAvailableFeatures();

  const handleFeatureUse = async (featureId: string) => {
    if (!canUseFeature(featureId)) {
      toast.error('This feature requires a higher plan');
      return;
    }

    setLoadingFeature(featureId);
    try {
      let result = '';
      
      switch (featureId) {
        case 'ultimate-character-psychology':
          result = await generateAdvancedCharacterProfile('Main Character', book);
          break;
        case 'ultimate-market-analysis':
          result = await analyzeMarketTrends(book.genre || 'Fiction');
          break;
        case 'ultimate-world-building':
          result = await generateWorldBuildingGuide(book);
          break;
        default:
          result = `Feature "${featureId}" executed successfully! This would provide detailed analysis and suggestions for your book.`;
      }
      
      setResults(prev => ({ ...prev, [featureId]: result }));
      toast.success('AI analysis completed!');
    } catch (error) {
      toast.error('Failed to run AI feature');
    } finally {
      setLoadingFeature(null);
    }
  };

  const getFeatureIcon = (category: string) => {
    switch (category) {
      case 'analysis': return Brain;
      case 'generation': return Sparkles;
      case 'enhancement': return Zap;
      case 'planning': return Target;
      default: return Brain;
    }
  };

  const getCategoryFeatures = (category: string) => {
    return availableFeatures.filter(feature => feature.category === category);
  };

  if (userPlan === 'Free') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            AI Features - Upgrade Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Unlock powerful AI features to enhance your writing with our paid plans.
            </p>
            <Button variant="outline">Upgrade Plan</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Writing Assistant
          <Badge variant="secondary">{userPlan} Plan</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="generation">Generation</TabsTrigger>
            <TabsTrigger value="enhancement">Enhancement</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4 mt-4">
            <div className="grid gap-3">
              {getCategoryFeatures('analysis').map(feature => {
                const Icon = getFeatureIcon(feature.category);
                return (
                  <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <div>
                        <h4 className="font-medium">{feature.name}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleFeatureUse(feature.id)}
                      disabled={loadingFeature === feature.id || !canUseFeature(feature.id)}
                    >
                      {loadingFeature === feature.id ? 'Running...' : 'Analyze'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="generation" className="space-y-4 mt-4">
            <div className="grid gap-3">
              {getCategoryFeatures('generation').map(feature => {
                const Icon = getFeatureIcon(feature.category);
                return (
                  <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <div>
                        <h4 className="font-medium">{feature.name}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleFeatureUse(feature.id)}
                      disabled={loadingFeature === feature.id || !canUseFeature(feature.id)}
                    >
                      {loadingFeature === feature.id ? 'Generating...' : 'Generate'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="enhancement" className="space-y-4 mt-4">
            <div className="grid gap-3">
              {getCategoryFeatures('enhancement').map(feature => {
                const Icon = getFeatureIcon(feature.category);
                return (
                  <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <div>
                        <h4 className="font-medium">{feature.name}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleFeatureUse(feature.id)}
                      disabled={loadingFeature === feature.id || !canUseFeature(feature.id)}
                    >
                      {loadingFeature === feature.id ? 'Enhancing...' : 'Enhance'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="planning" className="space-y-4 mt-4">
            <div className="grid gap-3">
              {getCategoryFeatures('planning').map(feature => {
                const Icon = getFeatureIcon(feature.category);
                return (
                  <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <div>
                        <h4 className="font-medium">{feature.name}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleFeatureUse(feature.id)}
                      disabled={loadingFeature === feature.id || !canUseFeature(feature.id)}
                    >
                      {loadingFeature === feature.id ? 'Planning...' : 'Plan'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Results Display */}
        {Object.keys(results).length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold">AI Analysis Results</h3>
            {Object.entries(results).map(([featureId, result]) => (
              <div key={featureId} className="p-4 bg-muted rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIFeaturesSection;
