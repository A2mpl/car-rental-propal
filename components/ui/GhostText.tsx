import styles from './GhostText.module.css'

interface GhostTextProps {
  text: string
  className?: string
}

export default function GhostText({ text, className }: GhostTextProps) {
  return (
    <span
      data-todo="parallax-scroll"
      aria-hidden="true"
      className={[styles.ghost, className].filter(Boolean).join(' ')}
    >
      {text}
    </span>
  )
}
