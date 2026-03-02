import styles from './SectionLabel.module.css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: Props) {
  return (
    <span className={[styles.label, className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
