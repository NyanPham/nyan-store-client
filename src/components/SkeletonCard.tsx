import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonCard({ baseColor = '#e0e0e0', highlightColor = '#f5f5f5' }) {
    return (
        <div className="bg-white/50 pointer-events-none flex flex-col items-center justify-between aspect-29/37 relative group p-2 md:p-4 transition transform">
            <div className="w-full h-full">
                <Skeleton height={'50%'} className="rounded-md" baseColor={baseColor} highlightColor={highlightColor} />
                <div className="mt-4 space-y-4">
                    <Skeleton
                        height={16}
                        width="75%"
                        className="rounded"
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    <Skeleton height={16} className="rounded" baseColor={baseColor} highlightColor={highlightColor} />
                    <Skeleton
                        height={16}
                        width="83.33%"
                        className="rounded"
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                </div>
            </div>
        </div>
    )
}
