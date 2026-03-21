import React from 'react'

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <>
      <h2 className="h2-bold  text-[var(--dark-600)] text-center">{title}</h2>
      {subtitle && <p className="p-16-regular mt-4 text-center">{subtitle}</p>}
    </>
  )
}

export default Header