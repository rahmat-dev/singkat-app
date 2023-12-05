import {
  ActionIcon,
  Anchor,
  Button,
  Card,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { IconLink, IconPencil, IconTrash } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import CopyButton from '~/components/button/copy-button'

export default function HomePage() {
  return (
    <Stack mt={80}>
      <TextInput
        placeholder="Type or paste your URL"
        size="md"
        rightSection={
          <ActionIcon size="lg">
            <IconLink size={20} />
          </ActionIcon>
        }
      />

      <Stack gap="xs" mt="xl">
        <Text size="xl" fw="bold">
          Your Links
        </Text>
        <Card withBorder>
          <Flex gap={4}>
            <Anchor
              component={Link}
              to="https://www.singkat.xyz/demo-kedaikito"
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
              singkat.xyz/demo-kedaikito
            </Anchor>
            <CopyButton value="singkat.xyz/demo-kedaikito" />
          </Flex>
          <Flex gap={4}>
            <Anchor
              component={Link}
              to="https://www.youtube.com/watch?v=so19RZs_DTY"
              target="_blank"
              c="gray"
              size="sm"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              https://www.youtube.com/watch?v=so19RZs_DTY
            </Anchor>
            <CopyButton value="https://www.youtube.com/watch?v=so19RZs_DTY" />
          </Flex>
          <Group gap="xs" mt="md">
            <Button
              size="xs"
              color="gray"
              leftSection={<IconPencil size={16} />}
            >
              Edit
            </Button>
            <Button size="xs" color="red" leftSection={<IconTrash size={16} />}>
              Delete
            </Button>
          </Group>
        </Card>
      </Stack>
    </Stack>
  )
}
