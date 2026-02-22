export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      secondary: 'blue',
      success: 'green',
      info: 'blue',
      warning: 'yellow',
      error: 'red',
      neutral: 'neutral',
      green: 'green',
      blue: 'blue',
      yellow: 'yellow',
      brown: 'brown',
      sand: 'sand',
      red: 'red',
      gray: 'gray',
    },

    rounded: {
      'DEFAULT': '9px',
      'sm': '6px',
      'md': '9px',
      'lg': '12px',
      'xl': '15px',
      '2xl': '18px',
      'full': '9999px',
    },

    button: {
      variants: {
        size: {
          lg: {
            base: 'px-3 py-2 font-bold gap-2 rounded-(--ui-border-radius)',
            leading: 'ps-3',
            trailing: 'pe-3',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5'
          },
        },
      },
      defaultVariants: {
        variant: 'solid',
        size: 'md',
        color: 'green',
        rounded: 'xl',
      }
    },

    input: {
      variants: {
        variant: {
          own: 'text-(--ui-text-highlighted) bg-(--ui-bg) rounded-(--ui-border-radius) border-2 border-(--ui-border)',
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: [
            'own',
          ],
          class: 'focus-visible:border-(--ui-primary)'
        },
      ],
      defaultVariants: {
        size: 'lg',
        color: 'primary',
        variant: 'own'
      }
    },

    card: {
      background: 'bg-neutral-950',
      rounded: 'md',
      ring: 'ring-1 ring-neutral-700',
    }
  }
})

