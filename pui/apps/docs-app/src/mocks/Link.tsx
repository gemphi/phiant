import React from 'react';

const Link = ({
  href,
  children,
  ...props
}: {
  href: string;
  children?: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={href} {...props}>
    {children}
  </a>
);

export default Link;
