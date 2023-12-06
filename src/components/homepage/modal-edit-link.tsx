import { Button, Flex, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import {
  collection,
  doc,
  documentId,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { useState } from 'react'
import { toast } from 'sonner'
import { db } from '~/lib/firebase'
import { Link } from '~/types'

interface ModalEditLinkProps {
  link: Link
}

interface FormValues {
  shortUrl: string
}

export default function ModalEditLink({ link }: ModalEditLinkProps) {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormValues>({
    initialValues: { shortUrl: link.shortUrl || '' },
    validate: {
      shortUrl: val => (!val ? 'Short url is required' : null),
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)
    try {
      const q = query(
        collection(db, 'links'),
        where('shortUrl', '==', values.shortUrl),
        where(documentId(), '!=', link.id),
      )
      const querySnapshot = await getDocs(q)
      if (querySnapshot.size) {
        throw new Error('Short url is already used')
      }
      await updateDoc(doc(db, 'links', link.id), {
        shortUrl: values.shortUrl,
      } as Pick<Link, 'shortUrl'>)
      toast.success('Short url has been updated')
      modals.closeAll()
      setIsLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Short URL"
          {...form.getInputProps('shortUrl')}
        />
        <TextInput
          label="Original URL"
          disabled
          defaultValue={link.originalUrl}
        />
        <Flex gap="xs" direction="row-reverse">
          <Button type="submit" loading={isLoading}>
            Update
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
    </form>
  )
}
