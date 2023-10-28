export const goToSection = (sectionId: string) => {
  const examplesOffset = document?.getElementById(sectionId)?.offsetTop
  if (examplesOffset) {
    window.scrollTo({ top: examplesOffset - 30, behavior: 'smooth' })
  }
}