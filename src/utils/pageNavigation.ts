export const scrollToSection = (sectionId: string) => {
  const sectionOffset = document?.getElementById(sectionId)?.offsetTop
  if (sectionOffset) {
    window.scrollTo({ top: sectionOffset - 120, behavior: 'smooth' })
  }
}

export const checkIfElementIsInViewPort = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}