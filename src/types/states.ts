type Layout = {
  layout: "grid" | "flex"
}
export type Timestamp = string | number | null

export type NoteState = {
  id: number
  title: string
  contents: string
  color: string
  created_date: Timestamp
  last_modified: any
}

export type User = {
  id: string
  name: string
  email: string
  isAdmin?: boolean
  registerDate: Timestamp
  dob?: Timestamp
  jobtitle?: string
  address?: string
  zipcode?: string
  city?: string
  country?: string
}

export type Settings = {
  layout: Layout
  avatar: string
}
