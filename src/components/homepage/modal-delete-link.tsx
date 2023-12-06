import { Button, Flex, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { deleteDoc, doc } from 'firebase/firestore'
import { useState } from 'react'
import { toast } from 'sonner'
import { db } from '~/lib/firebase'
import { Link } from '~/types'

interface ModalDeleteLinkProps {
  link: Link
}

export default function ModalDeleteLink({ link }: ModalDeleteLinkProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteLink = async () => {
    setIsLoading(true)
    try {
      await deleteDoc(doc(db, 'links', link.id))
      toast.success('Short url has been deleted')
      modals.closeAll()
      setIsLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <Stack>
      <Text>Are you sure you want to delete this link?</Text>
      <Flex gap="xs" direction="row-reverse">
        <Button loading={isLoading} onClick={handleDeleteLink} color="red">
          Delete
        </Button>
        <Button
          color="gray"
          onClick={() => modals.closeAll()}
          disabled={isLoading}
        >
          Batal
        </Button>
      </Flex>
    </Stack>
  )
}
