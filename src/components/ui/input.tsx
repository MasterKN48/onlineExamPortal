import clsx from 'clsx'
import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  name: string
}

export const Input = ({
  className,
  id,
  label,
  name,
  type,
  ...rest
}: InputProps) => {
  if (type === 'radio') {
    return (
      <div className="space-x-2">
        <input
          {...rest}
          type={type}
          name={name}
          id={id}
          className={clsx(
            'rounded px-3 py-2 ring-blue-500 focus:outline-none focus:ring-2 focus-visible:ring-2',
            className,
          )}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }

  return (
    <>
      <label htmlFor={id} className="pb-2">
        {label}
      </label>
      <input
        {...rest}
        type={type}
        name={name}
        id={id}
        className={clsx(
          'rounded px-3 py-2 ring-blue-500 focus:outline-none focus:ring-2 focus-visible:ring-2',
          className,
        )}
      />
    </>
  )
}
