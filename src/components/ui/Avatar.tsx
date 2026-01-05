import * as React from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string
  alt?: string
  fallback: string
  className?: string
}

export const Avatar = ({ src, alt, fallback, className }: AvatarProps) => {
  const [imageError, setImageError] = React.useState(false)

  return (
    <div className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100', className)}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium">
          {fallback.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  )
}
