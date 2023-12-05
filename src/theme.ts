import { createTheme } from '@mantine/core'

export const theme = createTheme({
  primaryColor: 'teal',
  components: {
    Button: {
      defaultProps: {
        radius: 'xl',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'xl',
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'xl',
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: 'xl',
      },
    },
  },
})
