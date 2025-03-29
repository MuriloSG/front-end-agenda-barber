import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function Skeleton() {
  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center justify-between">
        <div className="h-9 w-32 bg-muted rounded-md animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-muted rounded-md animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded-md animate-pulse" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-32 bg-muted rounded-md animate-pulse" />
              <div className="h-4 w-4 bg-muted rounded-md animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-20 bg-muted rounded-md animate-pulse mb-2" />
              <div className="h-4 w-36 bg-muted rounded-md animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 w-48 bg-muted rounded-md animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center space-x-4">
                    <div className="h-2 w-2 bg-muted rounded-full animate-pulse" />
                    <div className="flex-1 space-y-1">
                      <div className="h-4 w-32 bg-muted rounded-md animate-pulse" />
                      <div className="h-2 w-full bg-muted rounded-full animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-4 w-12 bg-muted rounded-md animate-pulse" />
                      <div className="h-3 w-16 bg-muted rounded-md animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
