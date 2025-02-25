import { useState } from 'react'
import './App.css'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [languages, setLanguages] = useState<string[]>(["English", "Spanish"]);
  console.log(languages);
  // based on languages state, alert (languages[0])
  const sayHello = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<[string[]], void>({
      target: { tabId: tab.id! },
      args: [languages],
      func: (langs) => {
        alert(`Translating from ${langs[0]} to ${langs[1]}`)
      }
    })
  }

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const languageArr: string[] = [...languages];
    languageArr[index] = event.target.value;
    setLanguages(languageArr);
}

  return (
    <>
      <form>
          <label htmlFor="languageFrom">From:</label>
          <select id="languageFrom" name="languageFrom" defaultValue="English" onChange={handleChange(0)}>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Italian">Italian</option>
          </select>
          <label htmlFor="languageTo">To:</label>
          <select id="languageTo" name="languageTo" defaultValue="Spanish" onChange={handleChange(1)}>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Italian">Italian</option>
          </select>
      </form>
      <button onClick={sayHello}>show current language</button>
    </>
  )
}

export default App
