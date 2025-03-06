import { Skeleton } from './ui/skeleton';

export default function SkeletonInformation() {
  return (
    <section className="flex flex-col gap-8 px-8">
      <div className="flex flex-row gap-4 h-full">
        <div className="~w-[8.875rem]/[18.75rem] ~h-[13.25rem]/[28.125rem] flex-shrink-0 border-2 border-gray-400 rounded-lg overflow-hidden 1.5xl:sticky 1.5xl:top-32">
          <Skeleton className="w-full h-full rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col ~gap-2/4 pl-4 1.5xl:min-w-[900px]">
          <Skeleton className="w-full h-10 rounded-lg shadow-lg" />
          <Skeleton className="w-full h-10 rounded-lg shadow-lg" />
          <Skeleton className="w-full h-10 rounded-lg shadow-lg" />
          <Skeleton className="w-full h-10 rounded-lg shadow-lg" />
          <Skeleton className="w-full h-10 rounded-lg shadow-lg" />
        </div>
      </div>
      <Skeleton className="w-full ~h-[35rem]/[46rem] rounded-lg shadow-lg" />
    </section>
  );
}
