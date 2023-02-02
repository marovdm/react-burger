import AppHeader from "../components/app-header/app-header";

export default function PageConstructor({children}) {
  return (
    <div className="App">
      <AppHeader />
      <main className="container">
        {children}
      </main>
    </div>
  )
}
