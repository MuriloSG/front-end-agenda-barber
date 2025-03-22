import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function Skeleton() {
  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center justify-between flex-wrap gap-4 pr-6 pl-6">
        <div className="h-9 w-32 bg-muted rounded-md animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded-lg animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card
            key={i}
            className="w-full transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="h-4 w-24 bg-muted rounded-md animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-muted rounded-md animate-pulse" />
                  <div className="h-8 w-8 bg-muted rounded-md animate-pulse" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-green-600">
                  <div className="h-4 w-4 bg-muted rounded-full animate-pulse" />
                  <div className="h-4 w-20 bg-muted rounded-md animate-pulse" />
                </div>
                <div className="flex items-center gap-2 text-orange-600">
                  <div className="h-4 w-4 bg-muted rounded-full animate-pulse" />
                  <div className="h-4 w-20 bg-muted rounded-md animate-pulse" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
