import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  important: 'body',
  theme: {
    colors: {
      red: colors.rose,
      pink: colors.fuchsia,
      gray: colors.coolGray,
      blue: colors.lightBlue,
      white: '#FFF',
      black: '#000',
    },
  },
})
