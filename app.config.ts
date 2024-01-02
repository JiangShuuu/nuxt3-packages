export default defineAppConfig({
  ui: {
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 right-1/2 translate-x-1/2',
    },
    formGroup: {
      error: 'absolute -bottom-4.5 text-red-500 dark:text-red-400',
    },
    table: {
      th: {
        base: 'text-center',
        padding: 'px-3 py-3.5',
        color: 'text-gray-900 dark:text-white',
        font: 'font-semibold',
        size: 'text-sm',
      },
      td: {
        base: 'whitespace-nowrap text-center',
        padding: 'px-3 py-4',
        color: 'text-gray-500 dark:text-gray-400',
        font: '',
        size: 'text-sm',
      },
    },
  },
})
