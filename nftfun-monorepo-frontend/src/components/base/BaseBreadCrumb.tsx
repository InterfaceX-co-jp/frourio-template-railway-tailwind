import clsx from 'clsx'
import React from 'react'

interface BreadCrumbItem {
  label: string
  href?: string
  isCurrentPage?: boolean
}

interface Props {
  items: BreadCrumbItem[]
}

export default function BaseBreadCrumb({ items }: Props) {
  return (
    <nav className="bg-grey-light w-full rounded-md">
      <ol className="list-reset flex">
        {items.map((el, key) => (
          <React.Fragment key={key}>
            <li>
              <a
                href={el.href}
                className={clsx(
                  'hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-accent-300 dark:text-primary-400 text-8 text-gray-600 transition duration-150 ease-in-out motion-reduce:transition-none',
                  !el.isCurrentPage && 'hover:underline',
                )}
              >
                {el.label}
              </a>
            </li>
            {!el.isCurrentPage && (
              <li>
                <span className="mx-2 text-neutral-400">{'>'}</span>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}
