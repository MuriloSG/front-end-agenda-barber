import { Card, CardFooter } from "../ui/card";

export function Skeleton() {
  return (
    <div className="space-y-6 p-6 mt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-full md:w-96 animate-pulse rounded-md bg-muted" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="flex flex-col">
            <div className="flex items-center gap-4 p-6">
              <div className="h-20 w-20 animate-pulse rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div
                      key={j}
                      className="h-4 w-4 animate-pulse rounded-full bg-muted"
                    />
                  ))}
                </div>
              </div>
            </div>
            <CardFooter className="flex gap-2">
              <div className="h-10 flex-1 animate-pulse rounded-md bg-muted" />
              <div className="h-10 w-20 animate-pulse rounded-md bg-muted" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
