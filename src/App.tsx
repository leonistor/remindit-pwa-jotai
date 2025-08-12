import appLogo from "/favicon.svg"
import PWABadge from "./PWABadge.tsx"
import "./App.css"

function App() {
  return (
    <>
      <div>
        <img src={appLogo} className="logo" alt="w-jotai logo" />
      </div>
      <h1 className="text-3xl font-semibold text-secondary-foreground">
        w-jotai
      </h1>
      <p className="font-extralight p-2 bg-accent">hello</p>
      <PWABadge />
    </>
  )
}

export default App
