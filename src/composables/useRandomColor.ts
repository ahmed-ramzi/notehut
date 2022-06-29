export const randomColor = (): string => {
  const options = ["amber", "emerald", "teal", "cyan", "pink", "sky", "slate"]
  return options[Math.floor(Math.random() * options.length)]
}

export const colorClass = (color: string): string => {
  switch (color) {
    case "amber":
      return "bg-amber-500"
    case "emerald":
      return "bg-emerald-500"
    case "teal":
      return "bg-teal-500"
    case "cyan":
      return "bg-cyan-500"
    case "pink":
      return "bg-pink-700"
    case "sky":
      return "bg-sky-500"
    default:
      return "bg-slate-500"
  }
}

export const textColorClass = (color: string): string => {
  switch (color) {
    case "amber":
      return "text-amber-500"
    case "emerald":
      return "text-emerald-500"
    case "teal":
      return "text-teal-500"
    case "cyan":
      return "text-cyan-500"
    case "pink":
      return "text-pink-700"
    case "sky":
      return "text-sky-500"
    default:
      return "text-slate-700"
  }
}

export const shadowColorClass = (color: string): string => {
  switch (color) {
    case "amber":
      return "shadow-amber-500"
    case "emerald":
      return "shadow-emerald-500"
    case "teal":
      return "shadow-teal-500"
    case "cyan":
      return "shadow-cyan-500"
    case "pink":
      return "shadow-pink-700"
    case "sky":
      return "shadow-sky-500"
    default:
      return "shadow-slate-500"
  }
}

export const focusColorClass = (color: string): string => {
  switch (color) {
    case "amber":
      return "focus:ring-amber-500"
    case "emerald":
      return "focus:ring-emerald-500"
    case "teal":
      return "focus:ring-teal-500"
    case "cyan":
      return "focus:ring-cyan-500"
    case "pink":
      return "focus:ring-pink-700"
    case "sky":
      return "focus:ring-sky-500"
    default:
      return "focus:ring-slate-500"
  }
}

export const gradientColorClass = (color: string): string => {
  switch (color) {
    case "amber":
      return "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
    case "emerald":
      return "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600"
    case "teal":
      return "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"
    case "cyan":
      return "bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600"
    case "pink":
      return "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600"
    case "sky":
      return "bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600"
    default:
      return "bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600"
  }
}
