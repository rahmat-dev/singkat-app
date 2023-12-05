import {
  ActionIcon,
  CopyButton as MantineCopyButton,
  Tooltip,
  rem,
} from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'

export default function CopyButton({
  value,
  timeout = 2000,
}: {
  value: string
  timeout?: number
}) {
  return (
    <MantineCopyButton value={value} timeout={timeout}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon
            color={copied ? 'teal' : 'gray'}
            variant="subtle"
            onClick={copy}
            size="sm"
          >
            {copied ? (
              <IconCheck style={{ width: rem(14) }} />
            ) : (
              <IconCopy style={{ width: rem(14) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </MantineCopyButton>
  )
}
