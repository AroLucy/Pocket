JQuery = document.createElement("script");
JQuery.setAttribute(
  "src",
  "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"
);
document.body.appendChild(JQuery);

setInterval(() => {
  $(function () {
    $(".volume-bar").hover(
      function () {
        $(".main-genericButton-button").hide();
        $(".main-connectPicker-button").hide();
        $("#volume-percentage").show();
        $(".volume-percent").show();
      },
      function () {
        $(".main-genericButton-button").show();
        $(".main-connectPicker-button").show();
        $("#volume-percentage").hide();
        $(".volume-percent").hide();
      }
    );
  });
}, 2000);
if (navigator.userAgent.indexOf("Win") != -1) {
  document.documentElement.style.setProperty("--display", "block");
  document.documentElement.style.setProperty("--controls-display", "block");
  document.documentElement.style.setProperty("--pfppadding", "120px");
}
if (navigator.userAgent.indexOf("Mac") != -1) {
  document.documentElement.style.setProperty("--display", "block");
  document.documentElement.style.setProperty("--left-back", "68px");
  document.documentElement.style.setProperty("--top", "14px");
  document.documentElement.style.setProperty("--left", "11px");
}

console.log(
  "%c❀ Pocket",
  "font-size:5em; color:#faa;",
  "Made with <3 by LucyUwi"
);
console.log(
  "%c[❀ Pocket] ",
  "color:#faa;",
  "\nLoading Configuration"
);

if (localStorage.getItem("PocketConfig") == undefined) {
  Styles = getComputedStyle(document.documentElement);
  config = {
    Accent: Styles.getPropertyValue("--spice-button").replace(/\s/g, ""),
    Segment: Styles.getPropertyValue("--spice-secondary").replace(/\s/g, ""),
    Main: Styles.getPropertyValue("--spice-main").replace(/\s/g, ""),
    Text: Styles.getPropertyValue("--spice-text").replace(/\s/g, ""),
    Subtext: Styles.getPropertyValue("--spice-subtext").replace(/\s/g, ""),
    Card: Styles.getPropertyValue("--spice-card").replace(/\s/g, ""),
    BorderRadius: Styles.getPropertyValue("--border-radius").replace(/\s/g, "").replace(/\D/g, ''),
    BorderRadiusUnit: Styles.getPropertyValue("--border-radius").replace(/\s/g, "").replace(/[0-9]/g, ''),
  };
  localStorage.setItem("PocketConfig", JSON.stringify(config));
  localStorage.setItem("DefualtPocketConfig", JSON.stringify(config));
} else {
  config = JSON.parse(localStorage.getItem("PocketConfig"));
}
setTimeout(() => {
  topBar = document.querySelector(".main-topBar-historyButtons");
  PocketConf = document.createElement("button");
  PocketConf.classList.add(
    "button",
    "Pocket-Config",
    "main-topBar-button",
    "InvalidDropTarget"
  );
  PocketConf.innerHTML = `<svg viewBox="0 0 262.394 262.394" style="scale: 0.5; fill: currentcolor"><path d="M245.63,103.39h-9.91c-2.486-9.371-6.197-18.242-10.955-26.432l7.015-7.015c6.546-6.546,6.546-17.159,0-23.705 l-15.621-15.621c-6.546-6.546-17.159-6.546-23.705,0l-7.015,7.015c-8.19-4.758-17.061-8.468-26.432-10.955v-9.914 C159.007,7.505,151.502,0,142.244,0h-22.091c-9.258,0-16.763,7.505-16.763,16.763v9.914c-9.37,2.486-18.242,6.197-26.431,10.954 l-7.016-7.015c-6.546-6.546-17.159-6.546-23.705,0.001L30.618,46.238c-6.546,6.546-6.546,17.159,0,23.705l7.014,7.014 c-4.758,8.19-8.469,17.062-10.955,26.433h-9.914c-9.257,0-16.762,7.505-16.762,16.763v22.09c0,9.258,7.505,16.763,16.762,16.763 h9.914c2.487,9.371,6.198,18.243,10.956,26.433l-7.015,7.015c-6.546,6.546-6.546,17.159,0,23.705l15.621,15.621 c6.546,6.546,17.159,6.546,23.705,0l7.016-7.016c8.189,4.758,17.061,8.469,26.431,10.955v9.913c0,9.258,7.505,16.763,16.763,16.763 h22.091c9.258,0,16.763-7.505,16.763-16.763v-9.913c9.371-2.487,18.242-6.198,26.432-10.956l7.016,7.017 c6.546,6.546,17.159,6.546,23.705,0l15.621-15.621c3.145-3.144,4.91-7.407,4.91-11.853s-1.766-8.709-4.91-11.853l-7.016-7.016 c4.758-8.189,8.468-17.062,10.955-26.432h9.91c9.258,0,16.763-7.505,16.763-16.763v-22.09 C262.393,110.895,254.888,103.39,245.63,103.39z M131.198,191.194c-33.083,0-59.998-26.915-59.998-59.997 c0-33.083,26.915-59.998,59.998-59.998s59.998,26.915,59.998,59.998C191.196,164.279,164.281,191.194,131.198,191.194z"/><path d="M131.198,101.199c-16.541,0-29.998,13.457-29.998,29.998c0,16.54,13.457,29.997,29.998,29.997s29.998-13.457,29.998-29.997 C161.196,114.656,147.739,101.199,131.198,101.199z"/></svg>`;
  PocketConf.id = "Pocket Config";
  PocketConf.setAttribute("title", "Pocket Config");
  PocketConf.onclick = PocketConfig;
  topBar?.append(PocketConf);
  console.log(
    "%c❀ Pocket",
    "color:#faa;",
    "\nConfiguration Loaded"
  );
  console.log(
    "%c[❀ Pocket] ",
    "color:#faa;",
    "\nCurrent configuration:\n",
    config
  );
}, 3000);
function AddListeners() {
  Accent.addEventListener('change', function() {Save()}, false)
  Segment.addEventListener('change', function() {Save()}, false)
  Main.addEventListener('change', function() {Save()}, false)
  Text.addEventListener('change', function() {Save()}, false)
  Subtext.addEventListener('change', function() {Save()}, false)
  Card.addEventListener('change', function() {Save()}, false)
  Radius.addEventListener('change', function() {Save()}, false)
  Unit.addEventListener('change', function() {Save()}, false)
  console.log("%c[❀ Pocket] ",
  "color:#faa;",
  "\nListeners Added")
}

function PocketConfig() {
  MenuWrapper = document.createElement("div");
  MenuWrapper.style.height = "100vh";
  MenuWrapper.style.width = "100vw";
  MenuWrapper.style.position = "absolute";
  MenuWrapper.style.backdropFilter = "blur(5px)";
  MenuWrapper.style.display = "Flex";
  MenuWrapper.style.alignItems = "center";
  MenuWrapper.style.justifyContent = "center";
  MenuWrapper.setAttribute("id", "MenuWrapper");
  MenuWrapper.setAttribute("onClick", "MenuWrapper.remove()");
  MenuWrapper.innerHTML = `<style>#MenuWrapper *{color:var(--spice-text);}.ConfigOption{width: 100%; display: flex; justify-content: space-between; padding-block: 0.5em;}.ConfigOption > *:not(h3){border-radius: 1em; background: var(--spice-main); color: var(--spice-text); border: 0;}input[type="color"]{-webkit-appearance: none; border: none;}input[type="color"]::-webkit-color-swatch-wrapper{padding: 0; margin: 0;}input[type="color"]::-webkit-color-swatch{border: none; border-radius: 1em;}input[type=checkbox]{height: 0; width: 0; visibility: hidden; padding-block: 1em;}label{cursor: pointer; text-indent: -9999px; width: 3em; height: 1.5em; background: grey; display: block; border-radius: 100px; position: relative;}label:after{content: ''; position: absolute; width: 1.5em; height: 1.5em; background: #fff; border-radius: 90px; transition: 0.3s; left: 1px;}input:checked + label{background: var(--spice-button);}input:checked + label:after{left: calc(100% - 25px);}label:active:after{width: 130px;}.PCDisabled{background:var(--spice-main)}input#Border-radius{background: var(--spice-main); border: 0; border-radius: 1em; height: 2em; width: 4em;}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance: none; margin: 0;}select#Radius-Unit{background: var(--spice-main); border: 0; border-radius: 1em; height: 2em;}</style><div onclick="event.cancelBubble=true" style="z-index: 1000; display: block; height: fit-content; width: 450px; background: var(--spice-card); padding: 1em; border-radius: 1em; text-align: center;"> <h1>Pocket Config</h1> <div style="height: 353px;overflow-y: scroll;background: var(--spice-secondary);border-radius: 1em;margin-block: 1em;padding: 1em;"><div class="ConfigOption"><h3>Accent Color</h3><input type="color" id="Accent"></div><div class="ConfigOption"><h3>Primary Color</h3><input type="color" id="Main"></div><div class="ConfigOption"><h3>Secondary Color</h3><input type="color" id="Segment"></div><div class="ConfigOption"><h3>Tertiary Text Color</h3><input type="color" id="Card"></div><div class="ConfigOption"><h3>Text Color</h3><input type="color" id="Text"></div><div class="ConfigOption"><h3>Secondary Text Color</h3><input type="color" id="Secondary"></div><div class="ConfigOption"><h3>Border Radius</h3><div><input type="number" id="Border-radius" placeholder="0"><select id="Radius-Unit"> <option hidden="" selected="">Unit</option> <option value="px">px</option> <option value="em">em</option></select></div></div></div><div id="Buttons" style=" display: flex; justify-content: space-between;"><div><button onclick="Reset()" style="position: relative; bottom: 0px; background: var(--spice-button); color: var(--spice-text); border-radius: 1em; padding-inline: 1em; padding-block: 0.5em; border: none;">Reset</button></div><button onclick="MenuWrapper.remove()" style="position: relative; bottom: 0px; background: var(--spice-button); color: var(--spice-text); border-radius: 1em; padding-inline: 1em; padding-block: 0.5em; border: none;">Close</button></div></div>`;
  document.body.appendChild(MenuWrapper);
  Accent = document.getElementById("Accent");
  Segment = document.getElementById("Segment");
  Main = document.getElementById("Main");
  Text = document.getElementById("Text");
  Subtext = document.getElementById("Secondary");
  Card = document.getElementById("Card");
  Radius = document.getElementById("Border-radius");
  Unit = document.getElementById("Radius-Unit");

  Accent.value = config.Accent
  Segment.value = config.Segment
  Main.value = config.Main
  Text.value = config.Text
  Subtext.value = config.Subtext
  Card.value = config.Card
  Radius.value = config.BorderRadius
  Unit.value = config.BorderRadiusUnit
  console.log(
    "%c[❀ Pocket] ",
    "color:#faa;",
    "\nOpened Config Page"
  );
  AddListeners()
}
function Save() {
  config.Accent = Accent.value;
  config.Segment = Segment.value;
  config.Main = Main.value;
  config.Text = Text.value;
  config.Subtext = Subtext.value;
  config.Card = Card.value;
  config.BorderRadius = Radius.value
  config.BorderRadiusUnit = Unit.value
  localStorage.setItem("PocketConfig", JSON.stringify(config));
  console.log(
    "%c[❀ Pocket] ",
    "color:#faa;",
    "\nConfiguration Saved, Now:\n",
    config
  );
  Apply();
}
function Reset() {
  config = JSON.parse(localStorage.getItem("DefualtPocketConfig"));
  localStorage.setItem("PocketConfig", JSON.stringify(config));
  Accent.value = config.Accent
  Segment.value = config.Segment
  Main.value = config.Main
  Text.value = config.Text
  Subtext.value = config.Subtext
  Card.value = config.Card
  Radius.value = config.BorderRadius
  Unit.value = config.BorderRadiusUnit
  console.log(
    "%c[❀ Pocket] ",
    "color:#faa;",
    "\nConfiguration Reset, Now:\n",
    config
  );
  Apply();
}
function Apply() {
  SetStyles = document.documentElement.style;
  SetStyles.setProperty("--spice-button", config.Accent);
  SetStyles.setProperty("--spice-secondary", config.Segment);
  SetStyles.setProperty("--spice-main", config.Main);
  SetStyles.setProperty("--spice-text", config.Text);
  SetStyles.setProperty("--spice-subtext", config.Subtext);
  SetStyles.setProperty("--spice-card", config.Card);
  SetStyles.setProperty("--border-radius", config.BorderRadius + config.BorderRadiusUnit);
  console.log(
    "%c[❀ Pocket] ",
    "color:#faa;",
    "\nConfiguration Applied"
  );
}
Apply();