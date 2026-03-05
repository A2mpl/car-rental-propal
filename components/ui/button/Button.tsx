import type {ButtonProps} from "@/components/ui/button/types"
import styles from './Button.module.css';

export default function Button({
  size = 'md',
  variant = 'solid',
  children,
  onClick,
  className,
  href,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const cls = [styles.btn, styles[size], styles[variant], className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
