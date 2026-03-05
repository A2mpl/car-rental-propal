import type {AS24Listing} from "@/lib/autoscout24";

export interface CarCardProps {
    car: AS24Listing;
    priority?: boolean;
}