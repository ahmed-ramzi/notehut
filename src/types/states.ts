type Layout = {
  layout: "grid" | "flex"
}
export type Colors = "amber" | "emerald" | "teal" | "cyan" | "pink" | "sky" | "slate"

export type Timestamp = string | number | null

export type MemberDetail = {
  id: string
  name: string
  role: "admin" | "member"
  joinDate: Timestamp
}

export type GroupDetail = {
  id: string
  name: string
  members: MemberDetail[]
}

export type NoteState = {
  id: number
  title: string
  contents: string
  color: string
  created_date: Timestamp
  last_modified: any
}

export interface SharedNoteState extends NoteState {
  created_by: string
  last_modified_by: string
}

export type User = {
  id: string
  name: string
  email: string
  isAdmin?: boolean
  registerDate: Timestamp
  groups?: GroupDetail[]
  settings: Settings
}

export type Settings = {
  theme: Colors | "multi-color"
  layout: Layout
  avatar: string
  darkMode: boolean
}
