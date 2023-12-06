import { Stack, Text } from '@mantine/core'
import { CardLink, CardLinkSkeleton } from '~/components/homepage/card-link'
import type { Link } from '~/types'

interface CardLinksProps {
  isLoading: boolean
  links: Link[]
}

export default function CardLinks({ isLoading, links }: CardLinksProps) {
  if (isLoading) {
    return (
      <Stack gap="xs" mt="xl">
        <CardLinkSkeleton />
        <CardLinkSkeleton />
      </Stack>
    )
  }

  if (!links.length) return null

  return (
    <Stack gap="xs" my="xl">
      <Text size="xl" fw="bold">
        Your Links
      </Text>
      {links.map(link => (
        <CardLink key={link.shortUrl} {...link} />
      ))}
    </Stack>
  )
}
