import 'tailwindcss/tailwind.css'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Extend the HTMLAttributes interface to include Tailwind CSS classes
    className?: string
  }
}
