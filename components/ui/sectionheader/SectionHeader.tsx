import SectionLabel from '../sectionlabel/SectionLabel';
import styles from './SectionHeader.module.css';
import type {SectionHeaderProps} from "@/components/ui/sectionheader/types";

export default function SectionHeader({ label, heading, subtitle, level: Tag = 'h2', labelClassName }: SectionHeaderProps) {
  return (
    <>
      <SectionLabel className={labelClassName}>{label}</SectionLabel>
      <Tag className={styles.heading}>{heading}</Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </>
  );
}
