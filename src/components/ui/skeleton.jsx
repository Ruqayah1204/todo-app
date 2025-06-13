import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }

export const SkeletonLoading = () =>{
  return (
    <div className="flex items-center space-x-8 px-3 mt-4">
      <Skeleton className="h-5 w-7" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
        <Skeleton className="h-4 w-[200px]" />
    </div>
  )
}
