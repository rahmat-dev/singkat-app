import { ActionIcon, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconLink } from '@tabler/icons-react'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import CardLinks from '~/components/homepage/card-links'
import { useAuth } from '~/context/auth-context'
import { db } from '~/lib/firebase'
import type { Link } from '~/types'

interface FormValues {
  url: string
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [links, setLinks] = useState<{
    isLoading: boolean
    data: Link[]
  }>({ isLoading: true, data: [] })
  const { user } = useAuth()
  const form = useForm<FormValues>({
    initialValues: { url: '' },
    validate: {
      url: val => (!val ? 'URL is required' : null),
    },
  })

  const generateShortUrl = async (values: FormValues) => {
    setIsLoading(true)
    try {
      const shortUrl = nanoid(8)
      const now = new Date()
      await addDoc(collection(db, 'links'), {
        originalUrl: values.url,
        shortUrl,
        userId: user?.id,
        createdAt: now,
        updatedAt: now,
      } as Omit<Link, 'id'>)
      toast.success('Url generated successfully')
      form.reset()
      setIsLoading(false)
    } catch (error: any) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const q = query(
      collection(db, 'links'),
      where('userId', '==', user?.id),
      orderBy('createdAt', 'desc'),
    )
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const data: Link[] = []
      querySnapshot.forEach(doc => {
        data.push({ ...doc.data(), id: doc.id } as Link)
      })
      setLinks({ data, isLoading: false })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Stack mt={80}>
      <form onSubmit={form.onSubmit(generateShortUrl)}>
        <TextInput
          placeholder="Type or paste your URL"
          size="md"
          type="url"
          rightSection={
            <ActionIcon size="lg" type="submit" loading={isLoading}>
              <IconLink size={20} />
            </ActionIcon>
          }
          {...form.getInputProps('url')}
        />
      </form>

      <CardLinks isLoading={links.isLoading} links={links.data} />
    </Stack>
  )
}
