const env = import.meta.env

export default {
  isDev: env.VITE_ENV === "dev",
  isBeta: env.VITE_ENV === "beta",
  isProd: env.VITE_ENV === "prod",
}
