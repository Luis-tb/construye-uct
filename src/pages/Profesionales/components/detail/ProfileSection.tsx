import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {ReactNode} from "react";

interface ProfileSectionProps {
    title: string;
    children: ReactNode;
}

export const ProfileSection = ({title, children}: ProfileSectionProps) => (
    <Card className="py-6">
        <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
        <CardContent>{children}</CardContent>
    </Card>
);