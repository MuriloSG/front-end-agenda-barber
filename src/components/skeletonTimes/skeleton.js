"use client";
export function Skeleton() {
  return (
    <div className="space-y-6 mt-10">
      <div className="p-4">
        <div className="h-8 w-48 bg-muted rounded-md animate-pulse mb-4" />

        <div className="overflow-x-auto bg-white rounded-md shadow-md">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="h-8 w-32 bg-muted rounded-md animate-pulse" />
                <th className="h-8 w-32 bg-muted rounded-md animate-pulse" />
                <th className="h-8 w-32 bg-muted rounded-md animate-pulse" />
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="h-8 w-32 bg-muted rounded-md animate-pulse" />
                  <td className="h-8 w-32 bg-muted rounded-md animate-pulse" />
                  <td className="h-8 w-32 bg-muted rounded-md animate-pulse" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
