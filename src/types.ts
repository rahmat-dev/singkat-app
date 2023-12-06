export interface User {
  id: string
  name: string
  email: string
}

export interface Link {
  originalUrl: string
  shortUrl: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
