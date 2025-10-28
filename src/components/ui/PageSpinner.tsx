import { Loader2 } from "lucide-react";

export const PageSpinner = () => (
    <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
    </div>
);