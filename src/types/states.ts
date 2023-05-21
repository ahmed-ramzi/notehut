type Layout = {
  layout: "grid" | "flex"
}
export type Colors = "amber" | "emerald" | "teal" | "cyan" | "pink" | "sky" | "slate"

export type Timestamp = string | number | null

export type MemberDetail = {
  id: string
  name: string
  email: string
  role: "admin" | "member"
  joinDate: Timestamp | null
  status: "active" | "pending"
}

export type GroupDetail = {
  id: string
  name: string
  created_at: Timestamp
  members: MemberDetail[]
}

export type PrivateNote = {
  id: number
  title: string
  contents: string
  color: string
  created_date: Timestamp
  last_modified: any
}

export interface SharedNote extends PrivateNote {
  created_by: string
  last_modified_by: string
}

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  isAdmin?: boolean
  registerDate: Timestamp
  groups?: string[]
  settings: Settings
}

export type Settings = {
  theme: Colors | "multi-color"
  layout: Layout
  avatar: string
  darkMode: boolean
}
