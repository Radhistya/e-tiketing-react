import { Skeleton } from "@/components/ui/skeleton";

export function Loading({ isMobile }) {
  if (isMobile) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="w-full h-64 rounded-lg" />
        <Skeleton className="w-full h-6 rounded-md" />
        <Skeleton className="w-full h-4 rounded-md" />
        <div className="flex gap-2 flex-wrap mt-2">
          <Skeleton className="w-16 h-8 rounded-full" />
          <Skeleton className="w-16 h-8 rounded-full" />
        </div>
        <Skeleton className="w-full h-20 rounded-md mt-2" />
        <Skeleton className="w-full h-12 rounded-full mt-4" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 px-5 py-8">
      <Skeleton className="w-full h-96 rounded-lg col-span-2" />
      <div className="space-y-4">
        <Skeleton className="w-full h-10 rounded-md" />
        <Skeleton className="w-3/4 h-6 rounded-md" />
        <Skeleton className="w-full h-40 rounded-lg" />
        <div className="flex gap-2 flex-wrap mt-2">
          <Skeleton className="w-16 h-8 rounded-full" />
          <Skeleton className="w-16 h-8 rounded-full" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="w-full h-6 rounded-md" />
        <Skeleton className="w-full h-20 rounded-md" />
        <Skeleton className="w-full h-12 rounded-full mt-4" />
      </div>
    </div>
  );
}
