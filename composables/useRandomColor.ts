export const randomColor = (): string => {
  const options = ["amber", "emerald", "teal", "cyan", "pink", "sky", "slate"]
  return options[Math.floor(Math.random() * options.length)]
}

export const colorClass = (color: string): string => {
  if (color === "amber") {
    return "bg-amber-500"
  } else if (color === "emerald") {
    return "bg-emerald-500"
  } else if (color === "teal") {
    return "bg-teal-500"
  } else if (color === "cyan") {
    return "bg-cyan-500"
  } else if (color === "pink") {
    return "bg-pink-700"
  } else if (color === "sky") {
    return "bg-sky-500"
  } else {
    return "bg-slate-500"
  }
}

export const textColorClass = (color: string): string => {
  if (color === "amber") {
    return "text-amber-500"
  } else if (color === "emerald") {
    return "text-emerald-500"
  } else if (color === "teal") {
    return "text-teal-500"
  } else if (color === "cyan") {
    return "text-cyan-500"
  } else if (color === "pink") {
    return "text-pink-700"
  } else if (color === "sky") {
    return "text-sky-500"
  } else {
    return "text-slate-700"
  }
}

export const shadowColorClass = (color: string): string => {
  if (color === "amber") {
    return "shadow-amber-500"
  } else if (color === "emerald") {
    return "shadow-emerald-500"
  } else if (color === "teal") {
    return "shadow-teal-500"
  } else if (color === "cyan") {
    return "shadow-cyan-500"
  } else if (color === "pink") {
    return "shadow-pink-700"
  } else if (color === "sky") {
    return "shadow-sky-500"
  } else {
    return "shadow-slate-500"
  }
}

export const focusColorClass = (color: string): string => {
  if (color === "amber") {
    return "focus:ring-amber-500"
  } else if (color === "emerald") {
    return "focus:ring-emerald-500"
  } else if (color === "teal") {
    return "focus:ring-teal-500"
  } else if (color === "cyan") {
    return "focus:ring-cyan-500"
  } else if (color === "pink") {
    return "focus:ring-pink-700"
  } else if (color === "sky") {
    return "focus:ring-sky-500"
  } else {
    return "focus:ring-slate-500"
  }
}

export const gradientColorClass = (color: string): string => {
  if (color === "amber") {
    return "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
  } else if (color === "emerald") {
    return "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600"
  } else if (color === "teal") {
    return "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"
  } else if (color === "cyan") {
    return "bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600"
  } else if (color === "pink") {
    return "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600"
  } else if (color === "sky") {
    return "bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600"
  } else {
    return "bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600"
  }
}
