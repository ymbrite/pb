export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'zinc',
    },
    link: {
      base: 'focus-visible:outline-primary hover:underline',
      variants: {
        active: {
          true: 'text-primary underline',
          false: 'text-muted',
        },
        disabled: {
          true: 'cursor-not-allowed opacity-75',
        },
      },
      compoundVariants: [
        {
          active: false,
          disabled: false,
          class: ['hover:text-default', 'transition-colors'],
        },
      ],
    },
  },
})
