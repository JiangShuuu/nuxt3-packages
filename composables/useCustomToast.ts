type ToastProp = {
  title: string
  color?: string
}

export function useCustomToast({ title, color }: ToastProp) {
  const toast = useToast()

  let icon = ''

  switch (color) {
    case 'yellow':
      icon = 'i-heroicons-exclamation-circle'
      break
    case 'red':
      icon = 'i-heroicons-x-circle'
      break
    default:
      icon = 'i-heroicons-check-circle'
  }

  return toast.add({
    title,
    icon,
    color: color || 'green',
  })
}
