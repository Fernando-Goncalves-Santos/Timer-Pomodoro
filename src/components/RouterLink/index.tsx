import { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'

type RouterLinkProps = {
    children: ReactNode
    href: string
} & ComponentProps<'a'>

export const RouterLink = ({href, children, ...props}: RouterLinkProps) => {
  return (
    <Link to={href} {...props}>{children}</Link>
  )
}
