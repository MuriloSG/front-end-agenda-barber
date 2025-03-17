export function ErrorMesage({title, description}) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center text-red-500">
        <div className="text-lg font-semibold">{title}</div>
        <div className="mt-2 text-sm text-muted-foreground">{description}</div>
      </div>
    );
}