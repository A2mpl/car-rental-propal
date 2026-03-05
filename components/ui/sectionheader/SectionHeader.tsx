import type { SectionHeaderProps } from '@/components/ui/sectionheader/types';
import SectionLabel from '@/components/ui/sectionlabel/SectionLabel';
import styles from './SectionHeader.module.css';

export default function SectionHeader({
  label,
  heading,
  subtitle,
  level: Tag = 'h2',
  labelClassName,
}: SectionHeaderProps) {
  return (
    <>
      <SectionLabel className={labelClassName}>{label}</SectionLabel>
      <Tag className={styles.heading}>{heading}</Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </>
  );
}
