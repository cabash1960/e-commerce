import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <Card className="w-full h-screen flex flex-col">
      <CardHeader className="shrink-0">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </CardContent>
    </Card>
  );
}
