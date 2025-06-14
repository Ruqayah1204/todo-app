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
    <div className="flex items-center space-x-8 px-3 my-4">
      <Skeleton className="h-5 w-7" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-[70%]" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
      <Skeleton className="h-5 w-7" />
    </div>
  )
}
