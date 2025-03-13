import { useEffect, useState } from 'react'
import './App.css'
// import { updateSubtitleList } from '../public/content.js'

function App() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [language, setLanguage] = useState<string>("es");
  const [enableLanguages, setEnableLanguages] = useState<boolean>(false);

  useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    args: [enableLanguages],
                    func: sendDataToBackground,
                    
                });
            }
        });
    }
  , [enableLanguages]);

  function sendDataToBackground(enableLanguages: boolean) {
    chrome.runtime.sendMessage(
      { type: 'SEND_DATA', data: enableLanguages },
      (response) => {
        console.log('Response from background.js:', response);
      }
    );
  }

  return (
    <>
      {/* <form>
          <label htmlFor="languageTo">Translate to:</label>
          <select id="languageTo" name="languageTo" defaultValue={language} onChange={handleChange}>
              <option value="en-US">English - US</option>
              <option value="en-GB">English - GB</option>
              <option value="es">Spanish</option>
              <option value="it">Italian</option>
              <option value="fr">French</option>
          </select>
      </form> */}
      <button onClick={() => setEnableLanguages(!enableLanguages)}> {enableLanguages ? "Disable" : "Enable"} Custom Subtitles </button>
    </>
  )
}

export default App
