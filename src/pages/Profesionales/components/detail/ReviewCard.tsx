import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Star, User} from "lucide-react";
import type {Review} from "@/pages/Profesionales/hooks/useProfessionalDetail.ts";

interface ReviewCardProps {
    review: Review;
}

export const ReviewCard = ({review}: ReviewCardProps) => (
    <div className="flex gap-4">
        <Avatar>
            <AvatarImage src={review.author?.raw_user_meta_data?.avatar_url}/>
            <AvatarFallback><User className="w-5 h-5"/></AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <p className="font-semibold">{review.author?.raw_user_meta_data?.name || 'Usuario Anónimo'}</p>
                <div className="flex items-center gap-1 text-sm text-yellow-500">
                    {Array.from({length: 5}).map((_, i) => (
                        <Star key={i}
                              className={`w-4 h-4 ${i < review.calificacion ? 'fill-current' : 'text-gray-300'}`}/>
                    ))}
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">{new Date(review.fecha_creacion).toLocaleDateString()}</p>
            <p className="text-gray-700">{review.comentario}</p>
        </div>
    </div>
);