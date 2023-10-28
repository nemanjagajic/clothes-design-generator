export const scrollToSection = (sectionId: string) => {
  const sectionOffset = document?.getElementById(sectionId)?.offsetTop
  if (sectionOffset) {
    window.scrollTo({ top: sectionOffset - 30, behavior: 'smooth' })
  }
}