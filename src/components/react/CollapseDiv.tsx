import type React from "preact/compat";

export const CollapseDiv: React.FC<{
  open: boolean,
  children?: React.ReactNode
}> = ({
  open,
  children
}) => {

  if (!children) {
    return null
  }

  return (
    <div class={`
      grid 
      overflow-hidden
      items-start 
      ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} 
      transition-[grid-template-rows] ease-[var(--spring-easing)] duration-[var(--spring-duration)]`
    }>
      <div class={`overflow-hidden`}>
        {children}
      </div>
    </div>

  )
}