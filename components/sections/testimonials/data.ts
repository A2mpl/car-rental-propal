import type {BezierDefinition, Variants} from "framer-motion";

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1];

export const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: luxeEase },
    },
};

export const trackVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: luxeEase, delay: 0.2 },
    },
};