import { useState } from "react"
import Header from "./components/header/Header"
import Main from "./components/main/Main"
import UsageInfo from "./components/instruction/UsageInfo"
import Result from "./components/results/Result"
import Contacts from "./components/contacts/Contacts"


function App() {

  const [readyUrl, setReadyUrl] = useState("")

  return (
    <div>
      <Header />
      <Main setReadyUrl={url => setReadyUrl(url)} />
      <Result readyUrl={readyUrl} />
      <UsageInfo />
      <Contacts />
    </div>
  )
}

export default App
