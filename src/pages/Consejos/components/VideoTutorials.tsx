import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ImageWithFallback.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ChevronRight, Play, Video } from "lucide-react";
import type { VideoTutorial } from "@/pages/Consejos/consejos.data.ts";

interface VideoTutorialsProps {
    tutorials: VideoTutorial[];
}

export const VideoTutorials = ({ tutorials }: VideoTutorialsProps) => (
    <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-600" />
                <h2 className="text-gray-900">Video tutoriales</h2>
            </div>
            <Button variant="ghost" size="sm">
                Ver todos
                <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutorials.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                    <div className="relative h-40 bg-gray-200">
                        <ImageWithFallback src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-blue-600 ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2">
                            <Badge className="bg-black/70 text-white">{video.duration}</Badge>
                        </div>
                    </div>
                    <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2">{video.category}</Badge>
                        <h4 className="text-gray-900 line-clamp-2 font-medium">{video.title}</h4>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);