export default function Throttle(fn: () => void, delay: number): () => void {
  let wait = false
  return () => {
    if (!wait) {
      wait = true
      setTimeout(() => {
        fn()
        wait = false
      }, delay)
    }
  }
}
