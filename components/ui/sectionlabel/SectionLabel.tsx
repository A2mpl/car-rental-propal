import type {SectionLabelProps} from "@/components/ui/sectionlabel/types";
import styles from './SectionLabel.module.css';

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span className={[styles.label, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
