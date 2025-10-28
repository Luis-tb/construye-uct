import { ImageWithFallback } from "@/components/ImageWithFallback.tsx";

interface ProblemHeaderProps {
    title: string;
    image: string;
}

export const ProblemHeader = ({ title, image }: ProblemHeaderProps) => (
    <div className="relative h-96 rounded-lg overflow-hidden mb-8 shadow-lg">
        <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
                <h1>{title}</h1>
            </div>
        </div>
    </div>
);