import { string } from "yup"

export type NoteState = {
  id: number
  title: string
  contents: string
  color: string
  //   created_date: Date,
  // last_modified: Date,
}

export type Timestamp = string | number | null

export type User = {
  id: string | null
  name: string | null
  email: string | null
  isAdmin?: boolean | null
  registerDate: Timestamp | null
  dob?: Timestamp | null
  jobtitle?: string | null
  address?: string | null
  zipcode?: string | null
  city?: string | null
  country?: string | null
}
