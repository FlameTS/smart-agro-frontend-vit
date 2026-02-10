import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AnalysisResult } from "@/lib/mock-data";

const ResultCard = ({ result }: { result: AnalysisResult }) => {
  const isHealthy = result.disease === "Healthy Leaf";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-primary/20 bg-card shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            {isHealthy ? (
              <CheckCircle className="h-5 w-5 text-primary" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-accent" />
            )}
            Detection Result
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <img src={result.imageUrl} alt="Analyzed" className="h-20 w-20 rounded-lg object-cover" />
            <div className="flex-1 space-y-2">
              <p className="text-sm text-muted-foreground">Disease Detected</p>
              <p className="text-xl font-bold">{result.disease}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-semibold">{result.confidence.toFixed(1)}%</span>
                </div>
                <Progress value={result.confidence} className="h-2" />
              </div>
              <p className="text-xs text-muted-foreground">Model: {result.model}</p>
            </div>
          </div>

          <div className="rounded-lg bg-muted/60 p-4">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Lightbulb className="h-4 w-4 text-accent" />
              Recommendations
            </h4>
            <ul className="space-y-1.5">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultCard;
