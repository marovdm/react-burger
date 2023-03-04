import React, { ReactNode } from 'react';
import AppHeader from "../components/app-header/app-header";

type PageConstructorProps = {
  children: ReactNode
}

export default function PageConstructor({children}: PageConstructorProps) {
  return (
    <div className="App">
      <AppHeader />
      <main className="container">
        {children}
      </main>
    </div>
  )
}


