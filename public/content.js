let languagesEnabled = true;
let isDisabled = false;


if (!window.hasRun && languagesEnabled) {
  window.hasRun = true;


  const languages = [
    { target_lang: "AR", subtitle_name: "العربية (Arabic)" },
    { target_lang: "BG", subtitle_name: "Български (Bulgarian)" },
    { target_lang: "CS", subtitle_name: "Čeština (Czech)" },
    { target_lang: "DA", subtitle_name: "Dansk (Danish)" },
    { target_lang: "DE", subtitle_name: "Deutsch (German)" },
    { target_lang: "EL", subtitle_name: "Ελληνικά (Greek)" },
    { target_lang: "EN-GB", subtitle_name: "English (British)" },
    { target_lang: "EN-US", subtitle_name: "English (American)" },
    { target_lang: "ES", subtitle_name: "Español (Spanish)" },
    { target_lang: "ET", subtitle_name: "Eesti (Estonian)" },
    { target_lang: "FI", subtitle_name: "Suomi (Finnish)" },
    { target_lang: "FR", subtitle_name: "Français (French)" },
    { target_lang: "HU", subtitle_name: "Magyar (Hungarian)" },
    { target_lang: "ID", subtitle_name: "Bahasa Indonesia (Indonesian)" },
    { target_lang: "IT", subtitle_name: "Italiano (Italian)" },
    { target_lang: "JA", subtitle_name: "日本語 (Japanese)" },
    { target_lang: "KO", subtitle_name: "한국어 (Korean)" },
    { target_lang: "LT", subtitle_name: "Lietuvių (Lithuanian)" },
    { target_lang: "LV", subtitle_name: "Latviešu (Latvian)" },
    { target_lang: "NB", subtitle_name: "Norsk (Norwegian) Bokmål" },
    { target_lang: "NL", subtitle_name: "Nederlands (Dutch)" },
    { target_lang: "PL", subtitle_name: "Polski (Polish)" },
    { target_lang: "PT-BR", subtitle_name: "Português (Brasil)" },
    { target_lang: "PT-PT", subtitle_name: "Português (Europeu)" },
    { target_lang: "RO", subtitle_name: "Română (Romanian)" },
    { target_lang: "RU", subtitle_name: "Русский (Russian)" },
    { target_lang: "SK", subtitle_name: "Slovenčina (Slovak)" },
    { target_lang: "SL", subtitle_name: "Slovenščina (Slovenian)" },
    { target_lang: "SV", subtitle_name: "Svenska (Swedish)" },
    { target_lang: "TR", subtitle_name: "Türkçe (Turkish)" },
    { target_lang: "UK", subtitle_name: "Українська (Ukrainian)" },
    { target_lang: "ZH-HANS", subtitle_name: "简体中文 (Chinese - Simplified)" },
    { target_lang: "ZH-HANT", subtitle_name: "繁體中文 (Chinese - Traditional)" }
  ];
  


// selected language


// custom vs default
// if custom - hide default overlay, produce custom overlay
// if default - hide custom overlay, produce default overlay




let languageArr = [];
let selectedLanguage = ""
let isCustom = false;
let subtitleStyle = null;
let customStyle = null;
let subtitleObserver = null;

const updateSubtitleList = () => {

    // getting subtitle div
    const subtitlesHeader = Array.from(document.querySelectorAll('h3'))
        .find(el => el.textContent?.trim() === "Subtitles");

    // update text to default subtitle
    subtitlesHeader.textContent = "Default Subtitles"

    //getting audio div
    const audioHeader = Array.from(document.querySelectorAll('h3'))
    .find(el => el.textContent?.trim() === "Audio");


    const audioList = audioHeader?.nextElementSibling;
    const subtitleList = subtitlesHeader?.nextElementSibling; // Adjust selector if needed

    audioList.style.overflowX = 'hidden';
    subtitleList.style.overflowX = 'hidden';

    // parent elements
    const audioParent = audioList?.parentElement;
    const subtitleParent = subtitleList?.parentElement;
    const customParent = document.createElement('div');

    audioParent.style.flex, subtitleParent.style.flex, customParent.style.flex = '1';

    const outerDiv = document.querySelector('.ltr-12lxt6i.show');
    if (outerDiv) {        
      // Make the outer container wider to accommodate all three columns
      outerDiv.style.minWidth = '750px'; // Adjust as needed
      outerDiv.style.width = 'auto';
      outerDiv.style.display = 'flex';
      outerDiv.style.flexDirection = 'column';
      outerDiv.style.position = 'absolute';
      outerDiv.style.left = ''
      outerDiv.style.right = '0px';
    }
    
    // Fix: Make the middle div (row container) wide enough
    const middleDiv = document.querySelector('.ltr-j5vjle');
    if (middleDiv) {
      middleDiv.style.position = 'relative';
      middleDiv.style.display = 'flex';
      middleDiv.style.flexDirection = 'row';
      middleDiv.style.justifyContent = 'space-between';
      middleDiv.style.width = '100%';
      middleDiv.style.minWidth = '750px'; // Match the outer div
    }

    // Set equal widths for the three columns
    if (audioParent && subtitleParent) {
      audioParent.style.flex = '1';
      audioParent.style.minWidth = '250px';
      audioParent.style.width = '33%';
      
      subtitleParent.style.flex = '1';
      subtitleParent.style.minWidth = '250px';
      subtitleParent.style.width = '33%';
      
      customParent.style.flex = '1';
      customParent.style.minWidth = '250px';
      customParent.style.width = '33%';
    }


    const extraSettingsDiv = document.createElement('div');
    extraSettingsDiv.style.width = `100%`;
    extraSettingsDiv.style.height = `65px`;
    extraSettingsDiv.style.backgroundColor = `${outerDiv.style.backgroundColor}`;
    extraSettingsDiv.style.display = 'flex';
    extraSettingsDiv.style.flexDirection = 'row';
    extraSettingsDiv.style.alignItems = 'center';
    extraSettingsDiv.style.justifyContent = 'flex-start';
    // inner div's
    const disableSubtitles = document.createElement('div');
    const adjustSubtitles = document.createElement('div');

    const disableText = document.createElement('h1');
    disableText.textContent = 'Disable Subtitles';
    disableText.style.fontSize = '20px';
    disableSubtitles.style.textAlign = 'center';
    disableText.style.marginRight = '10px';
    disableSubtitles.appendChild(disableText);
    disableSubtitles.appendChild(createSwitch());

    disableSubtitles.style.backgroundColor = `${outerDiv.style.backgroundColor}`;
    adjustSubtitles.style.backgroundColor = `${outerDiv.style.backgroundColor}`;

    disableSubtitles.style.width = '67%';
    adjustSubtitles.style.width = '33%';
    disableSubtitles.style.height = '100%';
    adjustSubtitles.style.height = '100%';
    disableSubtitles.style.display = 'flex';
    disableSubtitles.style.alignItems = 'center';
    disableSubtitles.style.justifyContent = 'center';

    extraSettingsDiv.appendChild(adjustSubtitles);
    extraSettingsDiv.appendChild(disableSubtitles);
    

    outerDiv.appendChild(extraSettingsDiv);
    

    //get the div with audio-subtitles
    const audioSubtitleDiv = document.querySelector('[data-uia="selector-audio-subtitle"]');
    if(audioSubtitleDiv) {
      //add custom div to selector tab
      customParent.className="ltr-zb0y0j";
      customParent.style.display = "flex";
      customParent.style.flexDirection = "column";

      const customHeader = document.createElement('h3');
      customHeader.textContent = 'Custom Subtitles'
      customHeader.className = 'ltr-r2srcr'

      const customUnorderedList = document.createElement('ul');
      customUnorderedList.className = 'ltr-19w99fl'
      customUnorderedList.style.overflowX = 'hidden';

      customParent.appendChild(customHeader);
      customParent.appendChild(customUnorderedList);

      // // set customList to height of audioSubtitleDiv height
      const audioHeight = audioParent.getBoundingClientRect().height;

      // // set customList width to subtitleList width
      const subtitleWidth = subtitleParent.getBoundingClientRect().width;
      const audioWidth = audioParent.getBoundingClientRect().width;

      (customParent).style.height = `${audioHeight}px`; // Set max height to prevent overflow
      (customParent).style.width = `${audioWidth}px`;
      (customParent).style.overflowY = "auto";

      for (let i = 0; i < languages.length; i++) {
          const newSubtitle = document.createElement("li");
          newSubtitle.style.listStyleType = 'none';
          newSubtitle.style.display = 'flex';
          newSubtitle.className = "ltr-1lif7jb";
          newSubtitle.setAttribute("data-uia", `subtitle-item-${languages[i].subtitle_name}`);
          newSubtitle.setAttribute("tabindex", "0");

          const outer = document.createElement("div");
          const innerDiv = document.createElement("div");
          innerDiv.className = "ltr-9eiaos";
          innerDiv.classList.add("subtitle-custom-option");
          innerDiv.textContent = `${languages[i].subtitle_name}`;
          

          newSubtitle.addEventListener("click", () => {

            document.querySelector(".subtitle-custom-option.selected")?.classList.remove("selected");

            //remove subtitle overlay
            languageArr = []
            languageArr.push(languages[i].target_lang);

            // selection
            selectedLanguage = languages[i].subtitle_name;
            innerDiv.classList.add('selected');
            isCustom = true;
            
            //start another subtitle overlay
            startSubtitles(languageArr[0]);
          })

          outer.appendChild(innerDiv);
          newSubtitle.appendChild(outer);
          customUnorderedList.appendChild(newSubtitle);
      }

      customUnorderedList.querySelectorAll('li').forEach((li) => {
        const innerDiv = li.firstChild.lastChild;
        if (isCustom && li.innerText === selectedLanguage) {
          innerDiv.classList.add('selected');
        }
      })
      audioSubtitleDiv.appendChild(customParent);
  }

  if (subtitleList) {
    subtitleList.querySelectorAll('li').forEach((li) => {
      if (li.innerText === "Off") {
        li.remove();
      }

      const img = li.querySelector('svg');

      const lastChild = li.lastChild.lastChild;
      // lastChild.style.color = "#aaa";
      li.addEventListener("click", function() {
        document.querySelector(".subtitle-custom-option.selected")?.classList.remove("selected");
        // li.lastChild.lastChild.classList.add('selected');
        lastChild.classList.add('selected');
      
        isCustom = false;
        selectedLanguage = li.innerText;
        startSubtitles(" ");
      })

     
    });
  }
}

// Observer to detect subtitle list changes
const startObserver = () => {
    console.log("Netflix Subtitle Observer Started");
    let hasUpdated = false;
    // if (subtitlesHeader) {
    //   const ul = subtitlesHeader.nextElementSibling; // Assuming the <ul> is the next sibling of <h3>
    //   const liElements = Array.from(ul.querySelectorAll("li"))[0];
    //   console.log(liElements);
    // }


    const observer = new MutationObserver((mutations) => {
      const subtitlesHeader = Array.from(document.querySelectorAll("h3")).find(
        (el) => el.textContent?.trim() === "Subtitles"
      );
      if (subtitlesHeader && !hasUpdated) {
        updateSubtitleList();
        hasUpdated = true;

        const customList = Array.from(document.querySelectorAll("h3")).find(
          (el) => el.textContent?.trim() === "Custom Subtitles"
        ).nextElementSibling;

        // Check if a subtitle is selected
        
      } else if (!subtitlesHeader) {
          hasUpdated = false;
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
};

const startSubtitles = (language) => {

  const subtitleContainer = document.querySelector(".player-timedtext");
  if (!subtitleContainer) {
      console.error("Netflix subtitle container not found.");
      return;
  }

  if (!isCustom) {
    // document.getElementById("custom-subtitles")?.remove();
    if (subtitleStyle) {
      subtitleStyle.remove();
      subtitleStyle = null;
    }
    return;
  }

    let lastSubtitle = ""

    // Disconnect any existing observer before creating a new one
    if (subtitleObserver) {
      subtitleObserver.disconnect();
    }

      // observer
      subtitleObserver = new MutationObserver(async (mutations) => {
      const subtitleSet = new Set();
      mutations.forEach(() => {
          // select all subtitle spans
        const subtitleElements = document.querySelectorAll('.player-timedtext-text-container span span');
        // console.log(subtitleElements);
        subtitleElements.forEach((currVal) => {
          subtitleSet.add(currVal.innerText + "\n");
          // console.log(subtitleSet);
        });
      })

      const fullSubtitle = Array.from(subtitleSet).join(' ');

      if (isCustom) {
        if (subtitleContainer && subtitleContainer.hasChildNodes()) {
          if (fullSubtitle && fullSubtitle !== lastSubtitle) {
            if (customStyle) {
              customStyle.remove();
            }
            // console.log(fullSubtitle);
            // document.getElementById("custom-subtitles")?.remove();
            // create the overlay and don't remove
            createSubtitleOverlay(fullSubtitle, language);
            // update last subtitle
            lastSubtitle = fullSubtitle;
          }
        }

        if (subtitleContainer && !subtitleContainer.hasChildNodes()) {
          // document.getElementById("custom-subtitles")?.remove();
        }
      } else if (!isCustom) {
        createSubtitleOverlay("", "");
      }})

    subtitleObserver.observe(subtitleContainer, { childList: true, subtree: true })
}

const translateText = async (subtitle, language) => {
  if(subtitle === '') {
    return;
  }
  const response = await fetch("http://localhost:4032/translate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        text: subtitle,
        target_lang: language, // Change target language
    }),
  });

  const data = await response.json();
  console.log('translating...');
  return data.translatedText;
}

// create custom subtitle overlay
const createSubtitleOverlay = async (subtitle, language) => {
  // loop through to find 
  
  let subtitleOverlay = document.getElementById("custom-subtitles");
  if (!subtitleOverlay) {
    console.log('creating new overlay...');
    subtitleOverlay = document.createElement("div");
    subtitleOverlay.id = "custom-subtitles";
    subtitleOverlay.style.position = "absolute";
    subtitleOverlay.style.bottom = "20%"; // Adjust for positioning
    subtitleOverlay.style.left = "50%";
    subtitleOverlay.style.transform = "translateX(-50%)";
    subtitleOverlay.style.color = "white";
    subtitleOverlay.style.fontSize = "min(3vw, 32px)";
    subtitleOverlay.style.padding = "10px";
    subtitleOverlay.style.borderRadius = "5px";
    subtitleOverlay.style.zIndex = "50";
    subtitleOverlay.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.75)';
    subtitleOverlay.style.fontFamily = 'Netflix Sans, Helvetica, Arial, sans-serif';
    subtitleOverlay.style.fontWeight = 'Bold'
    const watchVideoBody = document.querySelector('[data-uia="video-canvas"]');
    watchVideoBody.appendChild(subtitleOverlay);
  }

  let translatedText = subtitle;
  if (isCustom) {
    translatedText = await translateText(subtitle, language);

    if (!subtitleStyle) {
      subtitleStyle = document.createElement('style');
      subtitleStyle.innerHTML = '.player-timedtext .player-timedtext-text-container { display: none !important; }';
      document.head.appendChild(subtitleStyle);
    }
  } else if (!isCustom) {
    if (!customStyle) {
      customStyle = document.createElement('style');
      customStyle.innerHTML = '#custom-subtitles { display: none !important; }';
      document.head.appendChild(customStyle);
    }
  }
  subtitleOverlay.innerText = translatedText;
  
}

  // Start observer immediately
  startObserver();

  function createSwitch() {
    let switchContainer = document.createElement("div");
    switchContainer.style.position = "relative";
    switchContainer.style.width = "6em";
    switchContainer.style.height = "3.15em";
    switchContainer.style.display = "inline-block";
    
    let switchInput = document.createElement("input");
    switchInput.type = "checkbox";
    switchInput.style.opacity = "0";
    switchInput.style.width = "0";
    switchInput.style.height = "0";
    
    let slider = document.createElement("div");
    slider.style.position = "absolute";
    slider.style.cursor = "pointer";
    slider.style.top = "0";
    slider.style.left = "0";
    slider.style.right = "0";
    slider.style.bottom = "0";
    slider.style.backgroundColor = "#ccc";
    slider.style.transition = "0.4s";
    slider.style.borderRadius = "34px";
    
    let knob = document.createElement("div");
    knob.style.position = "absolute";
    knob.style.height = "2.8em";
    knob.style.width = "2.8em";
    knob.style.left = "0.3em";
    knob.style.bottom = "0.2em";
    knob.style.backgroundColor = "white";
    knob.style.transition = "0.4s";
    knob.style.borderRadius = "50%";
    
    slider.appendChild(knob);
    switchContainer.appendChild(switchInput);
    switchContainer.appendChild(slider);
    
    // ✅ Load saved state from localStorage
    switchInput.checked = isDisabled;
    updateSliderUI(slider, knob, isDisabled);

    // ✅ Toggle subtitles and save state
    slider.addEventListener("click", function() {
        switchInput.checked = !switchInput.checked;
        isDisabled = !isDisabled;
        let subtitlesDisabled = switchInput.checked;

        updateSliderUI(slider, knob, subtitlesDisabled);
        toggleSubtitles(!subtitlesDisabled); // Hide if enabled, Show if disabled

    });
    
    return switchContainer;
  }

  function updateSliderUI(slider, knob, isDisabled) {
    if (isDisabled) {
        slider.style.backgroundColor = "#2196F3";
        knob.style.transform = "translateX(2.85em)";
    } else {
        slider.style.backgroundColor = "#ccc";
        knob.style.transform = "translateX(0px)";
    }
  }
  
  
  function toggleSubtitles(enable) {
    const subtitleContainer = document.querySelector(".player-timedtext");
    const customSubtitles = document.getElementById("custom-subtitles");

    
    if (!subtitleContainer && !customSubtitles) return;

    if (!enable) {
      console.log('here');
      subtitleContainer?.classList.add('hide'); // Show subtitles
      customSubtitles?.classList.add('hide');
    } else {
      subtitleContainer?.classList.remove('hide'); // Show subtitles
      customSubtitles?.classList.remove('hide');
    }
  }
  
}