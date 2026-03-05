import type {BezierDefinition, Variants} from "framer-motion";

const luxeEase: BezierDefinition = [0.16, 1, 0.3, 1];

export const contentVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: luxeEase } },
};

export const barVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: luxeEase, delay: 0.2 } },
};
