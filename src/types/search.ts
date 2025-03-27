export interface Search {
  id: string
  email: string
  password_hash: string
  location: string
  fields: {
    key: string,
    value: string
  }[]
}
