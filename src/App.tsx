import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [languages, setLanguages] = useState<string[]>(["English", "Spanish"]);
  const [selectedText, setSelectedText] = useState<string>("");
  const [tooltip, setTooltip] = useState({text:"", x: 0, y: 0, visible: false});

  // based on languages state, alert (languages[0])
  const sayHello = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<[string[]], void>({
      target: { tabId: tab.id! },
      args: [languages],
      func: (langs) => {
        alert(langs[0] + langs[1]);
      }
    })
  }

  const extractText = async () => {
    const [tab] = await chrome.tabs.query({ active: true });

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        return window.getSelection()?.toString();
      }
    })

    if (results && results[0].result) {
      setSelectedText(results[0].result)
    }
  }

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLSelectElement>) => {
    const languageArr: string[] = [...languages];
    languageArr[index] = event.target.value;
    setLanguages(languageArr);
}

  const handleMouseUp = (event: MouseEvent) => {
    const textSelection = window.getSelection()?.toString().trim();
    if(textSelection) {
      alert(textSelection)
      setTooltip(
        {
        text: textSelection,
        x: event.clientX,
        y: event.clientY,
        visible: true,
        }
      )
    } else {
      setTooltip((prev) => ({...prev, visible: false}));
    }
  }

  useEffect(() => {
    // Add event listener to the window
    window.addEventListener("mouseup", handleMouseUp);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

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
      <button onClick={extractText}>show selected text</button>
      <p>{selectedText}</p>
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            top: tooltip.y + 10,
            left: tooltip.x + 10,
            background: "black",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "14px",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  )
}

export default App
