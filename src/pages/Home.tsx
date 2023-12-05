import { Title } from '@mantine/core'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <Title>HomePage</Title>
      <Link to="/signin">Sign In</Link>
    </div>
  )
}
