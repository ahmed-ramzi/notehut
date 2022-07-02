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
