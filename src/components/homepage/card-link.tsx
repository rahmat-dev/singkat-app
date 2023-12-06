import { Anchor, Button, Card, Flex, Group, Skeleton } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import CopyButton from '~/components/button/copy-button'
import type { Link as ILink } from '~/types'

export const CardLinkSkeleton = () => (
  <Card withBorder>
    <Skeleton h={24} w={180} maw="100%" />
    <Skeleton h={24} w={240} maw="100%" mt="xs" />
    <Group gap="xs" mt="md">
      <Skeleton h={20} w={64} />
      <Skeleton h={20} w={64} />
    </Group>
  </Card>
)

interface CardLinkProps {
  link: ILink
  onEdit: (link: ILink) => void
  onDelete: (link: ILink) => void
}

export const CardLink = ({ link, onEdit, onDelete }: CardLinkProps) => {
  return (
    <Card withBorder>
      <Flex gap={4}>
        <Anchor
          component={Link}
          to={`${window.location.origin}/${link.shortUrl}`}
          target="_blank"
          c="black"
          fw={500}
          size="lg"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {`${window.location.host}/${link.shortUrl}`}
        </Anchor>
        <CopyButton value={`${window.location.host}/${link.shortUrl}`} />
      </Flex>
      <Flex gap={4}>
        <Anchor
          component={Link}
          to={link.originalUrl}
          target="_blank"
          c="gray"
          size="sm"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {link.originalUrl}
        </Anchor>
        <CopyButton value={link.originalUrl} />
      </Flex>
      <Group gap="xs" mt="md">
        <Button
          size="xs"
          color="gray"
          leftSection={<IconPencil size={16} />}
          onClick={() => onEdit(link)}
        >
          Edit
        </Button>
        <Button
          size="xs"
          color="red"
          leftSection={<IconTrash size={16} />}
          onClick={() => onDelete(link)}
        >
          Delete
        </Button>
      </Group>
    </Card>
  )
}
