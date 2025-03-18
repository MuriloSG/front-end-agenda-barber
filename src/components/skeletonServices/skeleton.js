import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export function Skeleton() {
  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center justify-between">
        <div className="h-9 w-32 bg-muted rounded-md animate-pulse" />
        <div className="h-9 w-32 bg-muted rounded-md animate-pulse" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden p-0">
            <div className="aspect-video w-full bg-muted animate-pulse" />
            <CardHeader>
              <div className="h-6 w-32 bg-muted rounded-md animate-pulse mb-2" />
              <div className="h-4 w-48 bg-muted rounded-md animate-pulse" />
            </CardHeader>
            <CardFooter className="flex justify-between items-center pb-4">
              <div className="h-8 w-24 bg-muted rounded-md animate-pulse" />
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-muted rounded-md animate-pulse" />
                <div className="h-8 w-8 bg-muted rounded-md animate-pulse" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
