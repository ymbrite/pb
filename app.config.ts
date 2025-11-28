export default defineAppConfig({
  ui: {
    container: {
      base: "w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8",
    },
    main: {
      base: "min-h-[calc(100vh-var(--ui-header-height))]",
    },
    colors: {
      primary: "blue",
      neutral: "zinc",
    },
    link: {
      base: "focus-visible:outline-primary hover:underline",
      variants: {
        active: {
          true: "text-primary underline",
          false: "text-muted",
        },
        disabled: {
          true: "cursor-not-allowed opacity-75",
        },
      },
      compoundVariants: [
        {
          active: false,
          disabled: false,
          class: ["hover:text-default", "transition-colors"],
        },
      ],
    },
  },
})
