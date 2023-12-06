import { Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { CardLink, CardLinkSkeleton } from '~/components/homepage/card-link'
import ModalDeleteLink from '~/components/homepage/modal-delete-link'
import ModalEditLink from '~/components/homepage/modal-edit-link'
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

  const handleEdit = (link: Link) => {
    modals.open({
      title: 'Edit Link',
      children: <ModalEditLink link={link} />,
      closeOnClickOutside: false,
      closeOnEscape: false,
      withCloseButton: false,
    })
  }

  const handleDelete = (link: Link) => {
    modals.open({
      title: 'Delete Link',
      children: <ModalDeleteLink link={link} />,
      closeOnClickOutside: false,
      closeOnEscape: false,
      withCloseButton: false,
    })
  }

  return (
    <>
      <Stack gap="xs" my="xl">
        <Text size="xl" fw="bold">
          Your Links
        </Text>
        {links.map(link => (
          <CardLink
            key={link.id}
            link={link}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Stack>
    </>
  )
}
