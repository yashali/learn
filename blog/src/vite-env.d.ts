/// <reference types="vite/client" />

declare module '*.md' {
  const content: string
  export default content
}

declare module 'react-syntax-highlighter' {
  import { ComponentType } from 'react'
  export const Prism: ComponentType<any>
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  export const tomorrow: any
}
