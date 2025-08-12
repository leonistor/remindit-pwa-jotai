import appLogo from "/favicon.svg"
import PWABadge from "./PWABadge.tsx"
import "./App.css"
import Todos from "./components/Todos.tsx"

function App() {
  return (
    <>
      <div>
        <img
          src={appLogo}
          width={100}
          height={100}
          className="logo"
          alt="w-jotai logo"
        />
      </div>
      <Todos />
      <PWABadge />
    </>
  )
}

export default App
