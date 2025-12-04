export type Experience = {
  years: number
  months: number
}

export function getExperience(careerStartISO: string): Experience {
  const start = new Date(careerStartISO)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()

  const monthDiff = now.getMonth() - start.getMonth()
  const dayDiff = now.getDate() - start.getDate()
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years -= 1
  }

  const totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth())
  const months = Math.max(0, totalMonths % 12)

  return {
    years: Math.max(0, years),
    months,
  }
}
