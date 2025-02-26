import { useState } from 'react'
import './App.css'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [language, setLanguage] = useState<string>("Spanish");
  

  // based on languages state, alert (languages[0])
  const sayHello = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [language],
      func: (language) => {
        const subtitleSet = new Set<string>([]);
        let lastLoggedSubtitle = "";
        console.log(language)
        setInterval(() => {
          const subtitleElement = document.querySelectorAll('.player-timedtext .player-timedtext-text-container') as NodeListOf<HTMLElement>;
          if(subtitleElement.length > 0) {
          subtitleElement.forEach(function (currVal) {
              const subtitleText = currVal.innerText;

              // test to change subtitle text
              currVal.innerText = "hello";
              if (!subtitleSet.has(subtitleText)) {
                subtitleSet.add(subtitleText);
              }
            }
          )
          const fullSubtitle = (Array.from(subtitleSet).join(' ')); // Extracted subtitle

          // only log if subtitle has changed
          if (fullSubtitle !== lastLoggedSubtitle) {
            console.log(fullSubtitle);
            lastLoggedSubtitle = fullSubtitle;
          }
        } else {
          subtitleSet.clear();
        }}, 500);
      }
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    setLanguage(language);
  }


  return (
    <>
      <form>
          <label htmlFor="languageTo">Translate to:</label>
          <select id="languageTo" name="languageTo" defaultValue="Spanish" onChange={handleChange}>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Italian">Italian</option>
          </select>
      </form>
      <button onClick={sayHello}>translate</button>
    </>
  )
}

export default App
