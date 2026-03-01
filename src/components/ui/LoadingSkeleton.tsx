const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-slate-200 animate-pulse rounded ${className}`} />
);

export const PageSkeleton = () => (
  <div className="space-y-6 p-6">
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
    </div>
    <div className="grid grid-cols-4 gap-4">
      {[1,2,3,4].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="h-48 rounded-xl" />
      <Skeleton className="h-48 rounded-xl" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3 p-6">
    <div className="flex gap-4 mb-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-10 flex-1" />
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        <Skeleton className="h-12 w-8" />
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 w-24" />
        <Skeleton className="h-12 w-20" />
      </div>
    ))}
  </div>
);

export default Skeleton;
