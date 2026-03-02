import SectionLabel from './SectionLabel';
import styles from './SectionHeader.module.css';

interface Props {
  label: string;
  heading: string;
  subtitle?: string;
  level?: 'h1' | 'h2';
  labelClassName?: string;
}

export default function SectionHeader({ label, heading, subtitle, level: Tag = 'h2', labelClassName }: Props) {
  return (
    <>
      <SectionLabel className={labelClassName}>{label}</SectionLabel>
      <Tag className={styles.heading}>{heading}</Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </>
  );
}
