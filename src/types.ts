export interface User {
  id: string
  name: string
  email: string
}

export interface Link {
  id: string
  originalUrl: string
  shortUrl: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
