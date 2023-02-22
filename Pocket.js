// Check for Spicetify Moduals

(async function pocket() {
    if (
        !(
            Spicetify.Player?.data &&
            Spicetify.Menu &&
            Spicetify.LocalStorage &&
            Spicetify.Platform
        )
    ) {
        setTimeout(pocket, 300);
        return;
    }
    const { Player, Menu, LocalStorage, Platform, React } = Spicetify;
    console.log(Spicetify);
    await initPocket();
})();

// Load JQuery if not loaded

window.onload = function () {
    if (!window.jQuery) {
        JQuery = document.createElement("script");
        JQuery.setAttribute(
            "src",
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"
        );
        document.body.appendChild(JQuery);
    }
};

// Hide other Player buttons when volume is hovered

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

// Apply Menu and Window controls if required

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

// Start Pocket Configuration

console.log(
    "%c❀ Pocket",
    "font-size:5em; color:#faa;",
    "Made with <3 by LucyUwi"
);
console.log("%c[❀ Pocket]", "color:#faa;", "Loading Configuration");

async function initPocket() {
    // Check if config exists

    if (localStorage.getItem("PocketConfig") == undefined) {
        Styles = getComputedStyle(document.documentElement);
        config = {
            Accent: Styles.getPropertyValue("--spice-button").replace(
                /\s/g,
                ""
            ),
            Segment: Styles.getPropertyValue("--spice-secondary").replace(
                /\s/g,
                ""
            ),
            Main: Styles.getPropertyValue("--spice-main").replace(/\s/g, ""),
            Text: Styles.getPropertyValue("--spice-text").replace(/\s/g, ""),
            Subtext: Styles.getPropertyValue("--spice-subtext").replace(
                /\s/g,
                ""
            ),
            Card: Styles.getPropertyValue("--spice-card").replace(/\s/g, ""),
            BorderRadius: Styles.getPropertyValue("--border-radius")
                .replace(/\s/g, "")
                .replace(/\D/g, ""),
            BorderRadiusUnit: Styles.getPropertyValue("--border-radius")
                .replace(/\s/g, "")
                .replace(/[0-9]/g, ""),
            Controls: "Side",
            Presets: "Dark",
            Margins: Styles.getPropertyValue("--margin")
                .replace(/\s/g, "")
                .replace(/\D/g, ""),
            MarginsUnit: Styles.getPropertyValue("--margin")
                .replace(/\s/g, "")
                .replace(/[0-9]/g, ""),
        };
        localStorage.setItem("PocketConfig", JSON.stringify(config));
        localStorage.setItem("DefualtPocketConfig", JSON.stringify(config));
    } else {
        config = JSON.parse(localStorage.getItem("PocketConfig"));
    }

    // Start Config menu styling

    let content = document.createElement("div");
    let style = document.createElement("style");
    style.innerHTML = `.ConfigOption {
        display: flex;
        justify-content: space-between;
        padding-block: calc(var(--margin) * 0.4) }
    
    input, select {
        height: 2em;
        background: var(--spice-main);
        border: 0;
        border-radius: var(--border-radius);
        color: var(--spice-text);
        width: fit-content;
        padding-block: 0; margin: 0;
    }
    
    input[type="number"] {
        padding-inline: 0.5em; width: 3em;
    }
    
    input[type="color"] {
        -webkit-appearance: none;
        background: transparent;
        border: 0;
        width: 4em !important;
    }
    
    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
    }
    
    input[type="color"]::-webkit-color-swatch {
        border-radius: var(--border-radius)
    }
    
    .Multi {
        background: var(--spice-main);
        color: var(--spice-text);
        border-radius: var(--border-radius);
        padding: 0;
        margin: 0;
        height: fit-content;
    }
    
    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    
    .main-trackCreditsModal-header {
        border: 0;
        padding-bottom: 0;
    }
    
    .GenericModal, .main-trackCreditsModal-container {
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    
    button.main-trackCreditsModal-closeBtn svg {
        display: none;
    }
    
    button.main-trackCreditsModal-closeBtn {
        border-radius: 1em;
        position: relative;
        bottom: -28.4em;
    }
    
    button.main-trackCreditsModal-closeBtn::before {
        content: "Close";
        color: var(--spice-text);
        background: var(--spice-button);
        padding-inline: 1em; border-radius: 1em;
        padding-block: 0.5em; }
    
    button.resetbut {
        color: var(--spice-text);
        background: var(--spice-button);
        border: 0;
        padding: 0.5em;
        padding-inline: 1em; border-radius: 1em;
        position: sticky;
        bottom: 2.5em;
    }
    
    button.resetbut:hover {
        transform: scale(1.1);
    }
    
    #ClearButton {
        padding: 0.5em;
        padding-inline: 1em; 
        border-radius: 1em;
        background: var(--spice-button);
        color: var(--spice-text);
        border: none;
    }
    
    #ClearButton:hover {
        transform: scale(1.1);
    }
    
    
    .main-trackCreditsModal-mainSection {
        padding-top: 0;
    }
    
    main.main-trackCreditsModal-originalCredits > div > div {
        background: var(--spice-secondary);
        margin-block: 1em;
        padding: 1em;
        border-radius: var(--border-radius);
    }
    
    .GenericModal__overlay {
        backdrop-filter: blur(5px);
        background: transparent;
        filter: drop-shadow(0px 0px 10px var(--spice-main));
    }
    
    textarea {
        background: var(--spice-main);
        color: var(--spice-text);
        border-radius: var(--border-radius);
        border: 0px;
        padding: 1em;
        font-family: monospace;
    }
        
    main.main-trackCreditsModal-originalCredits > div > div > p {
        color: var(--spice-subtext);
    }`;
    options = document.createElement("div");

    try {
        PresetsPromise = await fetch(
            "https://raw.githubusercontent.com/LucyUwI/Pocket/main/Presets.json"
        );
        Presets = await PresetsPromise.json();
        localStorage.setItem("PresetsCache", JSON.stringify(Presets));
    } catch {
        console.log("Error");
        if (localStorage.getItem("PresetsCache") !== undefined) {
            Presets = JSON.parse(localStorage.getItem("PresetsCache"));
        } else {
            Presets = {
                Light: {
                    Accent: "#ffa6a6",
                    Segment: "#f2f2f2",
                    Main: "#e6e6e6",
                    Text: "#000000",
                    Subtext: "#383838",
                    Card: "#ffffff",
                    BorderRadius: "1",
                    BorderRadiusUnit: "em",
                    Controls: "Side",
                    Presets: "Light",
                },
                Dark: {
                    Name: "Dark",
                    Accent: "#ffa6a6",
                    Segment: "#202020",
                    Main: "#141414",
                    Text: "#ffffff",
                    Subtext: "#b3b3b3",
                    Card: "#242424",
                    BorderRadius: "1",
                    BorderRadiusUnit: "em",
                    Controls: "Side",
                    Presets: "Dark",
                },
            };
        }
    }
    // Availible Options

    OptionsArray = [
        {
            Title: "Presets",
            Type: ["select"],
            Options: Object.keys(Presets),
            ID: "Presets",
            Value: config.Presets,
            Variable: [""],
        },
        {
            Title: "Accent Color",
            Type: ["color"],
            ID: "Accent",
            Value: config.Accent,
            Variable: ["--spice-button", "--spice-rgb-button"],
        },
        {
            Title: "Primary Color",
            Type: ["color"],
            ID: "Main",
            Value: config.Main,
            Variable: ["--spice-main"],
        },
        {
            Title: "Secondary Color",
            Type: ["color"],
            ID: "Segment",
            Value: config.Segment,
            Variable: ["--spice-secondary", "--spice-rgb-secondary"],
        },
        {
            Title: "Tertiary Color",
            Type: ["color"],
            ID: "Card",
            Value: config.Card,
            Variable: ["--spice-card", "--spice-rgb-card"],
        },
        {
            Title: "Text Color",
            Type: ["color"],
            ID: "Text",
            Value: config.Text,
            Variable: ["--spice-text", "--spice-rgb-text"],
        },
        {
            Title: "Secondary Text Color",
            Type: ["color"],
            ID: "Subtext",
            Value: config.Subtext,
            Variable: ["--spice-subtext", "--spice-rgb-subtext"],
        },
        {
            Title: "Border Radius",
            Type: ["number", "select"],
            Options: [[], ["px", "em"]],
            IDs: ["BorderRadius", "BorderRadiusUnit"],
            Values: [config.BorderRadius, config.BorderRadiusUnit],
            Variable: ["--border-radius"],
        },
        {
            Title: "Margins",
            Type: ["number", "select"],
            Options: [[], ["px", "em"]],
            IDs: ["Margins", "MarginsUnit"],
            Values: [config.Margins, config.MarginsUnit],
            Variable: ["--margin"],
        },
        {
            Title: "Controls Position",
            Type: ["select"],
            Options: ["Side", "Bottom"],
            ID: "Controls",
            Value: config.Controls,
            Variable: [""],
        },
    ];

    function CreateOptions(Options, Value) {
        Option = "";
        Options.innerHTML += "<option value='' hidden></option>";
        for (let i = 0; i < Options.length; i++) {
            Option += "<option value'" + Options[i] + "'";
            if (Options[i] == Value) {
                Option += " selected>" + Options[i] + "</option>";
            } else {
                Option += ">" + Options[i] + "</option>";
            }
        }
        return Option;
    }

    ConfigOptions = Array;
    for (let i = 0; i < OptionsArray.length; i++) {
        ConfigOptions[i] = document.createElement("div");
        ConfigOptions[i].setAttribute("class", "ConfigOption");
        if (
            OptionsArray[i].Type.length == 1 &&
            OptionsArray[i].Type[0] != "select"
        ) {
            ConfigOptions[i].innerHTML =
                "<h3>" +
                OptionsArray[i].Title +
                "</h3>" +
                "<input type='" +
                OptionsArray[i].Type[0] +
                "' id='" +
                OptionsArray[i].ID +
                "' value='" +
                OptionsArray[i].Value +
                "'></div>";
        } else if (OptionsArray[i].Type[0] == "select") {
            Options = CreateOptions(
                OptionsArray[i].Options,
                OptionsArray[i].Value
            );
            ConfigOptions[i].innerHTML =
                "<h3>" +
                OptionsArray[i].Title +
                "</h3>" +
                "<select id='" +
                OptionsArray[i].ID +
                "'>" +
                Options +
                "</select>";
        } else {
            Fields = "";
            for (let j = 0; j < OptionsArray[i].Type.length; j++) {
                if (OptionsArray[i].Type[j] != "select") {
                    Fields +=
                        "<input type='" +
                        OptionsArray[i].Type[j] +
                        "' id='" +
                        OptionsArray[i].IDs[j] +
                        "' value='" +
                        OptionsArray[i].Values[j] +
                        "'>";
                } else if (OptionsArray[i].Type[j] == "select") {
                    Options = CreateOptions(
                        OptionsArray[i].Options[j],
                        OptionsArray[i].Values[j]
                    );
                    Fields +=
                        "<select id='" +
                        OptionsArray[i].IDs[j] +
                        "'>" +
                        Options +
                        "</select>";
                }
            }
            ConfigOptions[i].innerHTML =
                "<h3>" +
                OptionsArray[i].Title +
                "</h3><div class='Multi'>" +
                Fields +
                "</div>";
        }
        options.appendChild(ConfigOptions[i]);
        if (OptionsArray[i].Type.length == 1 && i != 0) {
            ConfigOptions[i].addEventListener(
                "change",
                function () {
                    Save();
                },
                false
            );
        } else if (OptionsArray[i].Type.length != 1) {
            for (let j = 0; j < OptionsArray[i].Type.length; j++) {
                ConfigOptions[i].childNodes[j].addEventListener(
                    "change",
                    function () {
                        Save();
                    },
                    false
                );
            }
        } else if (i == 0) {
            ConfigOptions[i].addEventListener(
                "change",
                function () {
                    Preset();
                },
                false
            );
        }
    }

    ManualEditTitle = document.createElement("h3");
    ManualEditTitle.innerHTML = "[Advance] Manual Editing";
    ManualEditSubtext = document.createElement("p");
    ManualEditSubtext.innerHTML = "If something goes wrong press [Reset]";
    ManualEdit = document.createElement("textarea");
    ManualEdit.value = JSON.stringify(config);
    ManualEdit.cols = 40;
    ManualEdit.rows = 6;
    ManualEdit.addEventListener(
        "input",
        function () {
            ManualSave();
        },
        false
    );

    CompleteClear = document.createElement("button");
    CompleteClear.innerHTML = "Remove all Settings";
    CompleteClear.setAttribute("id", "ClearButton");
    CompleteClear.addEventListener(
        "click",
        function () {
            Clear();
        },
        false
    );
    function Clear() {
        localStorage.removeItem("PocketConfig");
        localStorage.removeItem("DefaultPocketConfig");
        localStorage.removeItem("PresetCache");
        location.reload();
    }

    options.appendChild(ManualEditTitle);
    options.appendChild(ManualEditSubtext);
    options.appendChild(ManualEdit);
    options.appendChild(CompleteClear);
    Accent = document.getElementById("Accent");
    Segment = document.getElementById("Segment");
    Main = document.getElementById("Main");
    Text = document.getElementById("Text");
    Subtext = document.getElementById("Secondary");
    Card = document.getElementById("Card");
    Radius = document.getElementById("BorderRadius");
    RadiusUnit = document.getElementById("BorderRadiusUnit");
    Controls = document.getElementById("Controls");

    function Preset() {
        config.Presets = document.getElementById("Presets").value;
        NewConfig = Presets[config.Presets];
        console.log;
        objectKeys = Object.keys(NewConfig);
        for (let i = 0; i < objectKeys.length; i++) {
            config[objectKeys[i]] = NewConfig[objectKeys[i]];
        }
        localStorage.setItem("PocketConfig", JSON.stringify(config));
        for (let i = 0; i < OptionsArray.length; i++) {
            if (OptionsArray[i].ID !== undefined) {
                document.getElementById(OptionsArray[i].ID).value =
                    config[OptionsArray[i].ID];
            } else {
                for (let j = 0; j < OptionsArray[i].IDs.length; j++) {
                    document.getElementById(OptionsArray[i].IDs[j]).value =
                        config[OptionsArray[i].IDs[j]];
                }
            }
        }
        Apply();
    }
    function Save() {
        for (let i = 0; i < OptionsArray.length; i++) {
            if (OptionsArray[i].Type.length == 1) {
                config[OptionsArray[i].ID] = document.getElementById(
                    OptionsArray[i].ID
                ).value;
            } else {
                for (let j = 0; j < OptionsArray[i].IDs.length; j++) {
                    config[OptionsArray[i].IDs[j]] = document.getElementById(
                        OptionsArray[i].IDs[j]
                    ).value;
                }
            }
        }
        config.Presets = "";
        document.getElementById(OptionsArray[0].ID).value = "";
        localStorage.setItem("PocketConfig", JSON.stringify(config));
        Apply();
        console.log(
            "%c[❀ Pocket]",
            "color:#faa;",
            "Configuration Saved, Now:",
            config
        );
    }
    function ManualSave() {
        config = JSON.parse(ManualEdit.value);
        localStorage.setItem("PocketConfig", JSON.stringify(config));
        for (let i = 0; i < OptionsArray.length; i++) {
            if (OptionsArray[i].ID !== undefined) {
                document.getElementById(OptionsArray[i].ID).value =
                    config[OptionsArray[i].ID];
            } else {
                for (let j = 0; j < OptionsArray[i].IDs.length; j++) {
                    document.getElementById(OptionsArray[i].IDs[j]).value =
                        config[OptionsArray[i].IDs[j]];
                }
            }
        }
        Apply();
        console.log(
            "%c[❀ Pocket]",
            "color:#faa;",
            "Configuration Saved, Now:",
            config
        );
    }

    function Reset() {
        config = JSON.parse(localStorage.getItem("DefualtPocketConfig"));
        localStorage.setItem("PocketConfig", JSON.stringify(config));
        for (let i = 0; i < OptionsArray.length; i++) {
            if (OptionsArray[i].ID !== undefined) {
                document.getElementById(OptionsArray[i].ID).value =
                    config[OptionsArray[i].ID];
            } else {
                for (let j = 0; j < OptionsArray[i].IDs.length; j++) {
                    document.getElementById(OptionsArray[i].IDs[j]).value =
                        config[OptionsArray[i].IDs[j]];
                }
            }
        }
        Apply();
        console.log(
            "%c[❀ Pocket]",
            "color:#faa;",
            "Configuration Reset, Now:",
            config
        );
    }

    function Apply() {
        SetStyles = document.documentElement.style;
        for (let i = 0; i < OptionsArray.length; i++) {
            if (OptionsArray[i].Variable[0] != "--border-radius" && OptionsArray[i].Variable[0] != "--margin" ) {
                SetStyles.setProperty(
                    OptionsArray[i].Variable[0],
                    config[OptionsArray[i].ID]
                );
                if (OptionsArray[i].Variable.length == 2) {
                    RGBArr = hexToRgb(config[OptionsArray[i].ID]);
                    RGB = RGBArr.r + "," + RGBArr.g + "," + RGBArr.b;
                    SetStyles.setProperty(OptionsArray[i].Variable[1], RGB);
                }
            } else {
                Radius = config[OptionsArray[i].IDs[0]] + config[OptionsArray[i].IDs[1]]
                SetStyles.setProperty(OptionsArray[i].Variable[0], Radius);
                console.log(Radius, SetStyles.getPropertyValue("--border-radius"))
            }
        }
        PlayerHandler();
        ManualEdit.value = JSON.stringify(config);
        console.log("%c[❀ Pocket]", "color:#faa;", "Configuration Applied");
    }

    function PlayerHandler() {
        if (config.Controls == "Bottom") {
            BottomPlayer();
        } else {
            SidePlayer();
        }
    }
    function SmallHandler(Reload) {
        if (config.Small == "True") {
            removeMediaQueries();
        } else {
        }
        if (Reload == true) {
            location.reload();
        }
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    }

    resetbut = document.createElement("button");
    resetbut.setAttribute("class", "resetbut");
    resetbut.innerHTML = "Reset";
    resetbut.addEventListener(
        "click",
        function () {
            Reset();
        },
        false
    );

    content.appendChild(style);
    content.appendChild(options);
    content.appendChild(resetbut);

    // Create Config Button

    let svg = `<svg viewBox="0 0 262.394 262.394" style="scale: 0.5; fill: currentcolor"><path d="M245.63,103.39h-9.91c-2.486-9.371-6.197-18.242-10.955-26.432l7.015-7.015c6.546-6.546,6.546-17.159,0-23.705 l-15.621-15.621c-6.546-6.546-17.159-6.546-23.705,0l-7.015,7.015c-8.19-4.758-17.061-8.468-26.432-10.955v-9.914 C159.007,7.505,151.502,0,142.244,0h-22.091c-9.258,0-16.763,7.505-16.763,16.763v9.914c-9.37,2.486-18.242,6.197-26.431,10.954 l-7.016-7.015c-6.546-6.546-17.159-6.546-23.705,0.001L30.618,46.238c-6.546,6.546-6.546,17.159,0,23.705l7.014,7.014 c-4.758,8.19-8.469,17.062-10.955,26.433h-9.914c-9.257,0-16.762,7.505-16.762,16.763v22.09c0,9.258,7.505,16.763,16.762,16.763 h9.914c2.487,9.371,6.198,18.243,10.956,26.433l-7.015,7.015c-6.546,6.546-6.546,17.159,0,23.705l15.621,15.621 c6.546,6.546,17.159,6.546,23.705,0l7.016-7.016c8.189,4.758,17.061,8.469,26.431,10.955v9.913c0,9.258,7.505,16.763,16.763,16.763 h22.091c9.258,0,16.763-7.505,16.763-16.763v-9.913c9.371-2.487,18.242-6.198,26.432-10.956l7.016,7.017 c6.546,6.546,17.159,6.546,23.705,0l15.621-15.621c3.145-3.144,4.91-7.407,4.91-11.853s-1.766-8.709-4.91-11.853l-7.016-7.016 c4.758-8.189,8.468-17.062,10.955-26.432h9.91c9.258,0,16.763-7.505,16.763-16.763v-22.09 C262.393,110.895,254.888,103.39,245.63,103.39z M131.198,191.194c-33.083,0-59.998-26.915-59.998-59.997 c0-33.083,26.915-59.998,59.998-59.998s59.998,26.915,59.998,59.998C191.196,164.279,164.281,191.194,131.198,191.194z"/><path d="M131.198,101.199c-16.541,0-29.998,13.457-29.998,29.998c0,16.54,13.457,29.997,29.998,29.997s29.998-13.457,29.998-29.997 C161.196,114.656,147.739,101.199,131.198,101.199z"/></svg>`;
    new Spicetify.Topbar.Button("Pocket", svg, () => {
        Spicetify.PopupModal.display({
            title: "Pocket Settings",
            content,
        });
    });

    console.log("%c[❀ Pocket]", "color:#faa;", "Configuration Loaded");
    console.log(
        "%c[❀ Pocket]",
        "color:#faa;",
        "Current configuration:\n",
        config
    );
    Apply();
}

function BottomPlayer() {
    document.querySelectorAll(
        ".Root__top-container"
    )[0].style.gridTemplateAreas = `"top-bar top-bar" "nav-bar main-view" "nav-bar main-view" "now-playing-bar now-playing-bar"`;
    try {
        document.querySelectorAll(
            ".Root__top-container--right-sidebar-visible"
        )[0].style.gridTemplateAreas = `"top-bar top-bar top-bar" "nav-bar main-view right-sidebar" "now-playing-bar now-playing-bar now-playing-bar"`;
    } catch {}
    document.querySelectorAll(".Root__now-playing-bar")[0].style.width =
        "calc(100vw - 2em)";
    document.querySelectorAll(
        ".main-nowPlayingBar-nowPlayingBar"
    )[0].style.flexDirection = "row";
    document.querySelectorAll(
        "footer.main-nowPlayingBar-container"
    )[0].style.minWidth = "100%";
    document.querySelectorAll(
        ".main-nowPlayingWidget-nowPlaying"
    )[0].style.gridTemplate = `"Art Info Like"`;
    Art = document.querySelectorAll(
        ".main-coverSlotCollapsed-container.main-coverSlotCollapsed-navAltContainer *"
    );
    for (let i = 0; i < Art.length; i++) {
        Art[i].setAttribute(
            "style",
            "width: 60px !important; height: 60px !important"
        );
    }
    Controls = document.querySelectorAll(
        ".main-nowPlayingBar-nowPlayingBar > *"
    );
    for (let i = 0; i < Controls.length; i++) {
        Controls[i].style.marginBlock = "8px";
        Controls[i].style.marginInline = "0";
        Controls[i].style.padding = "0";
    }
    document
        .querySelectorAll(
            ".main-coverSlotCollapsed-container.main-coverSlotCollapsed-navAltContainer"
        )[0]
        .setAttribute(
            "style",
            "width: 60px !important; height: 60px !important"
        );
    document.querySelectorAll(
        ".main-trackInfo-container"
    )[0].style.paddingLeft = "1em";
    document.querySelectorAll(".main-trackInfo-container")[0].style.width =
        "10em";
    document.querySelectorAll(".main-nowPlayingBar-center")[0].style.width =
        "40%";
    try {
        document.querySelectorAll(
            ".main-connectPicker-button > div"
        )[0].style.bottom = "-3.1em";
    } catch {}
}
function SidePlayer() {
    document.querySelectorAll(
        ".Root__top-container"
    )[0].style.gridTemplateAreas = ``;
    try {
        document.querySelectorAll(
            ".Root__top-container--right-sidebar-visible"
        )[0].style.gridTemplateAreas = ``;
    } catch {}
    document.querySelectorAll(".Root__now-playing-bar")[0].style.width = "";
    document.querySelectorAll(
        ".main-nowPlayingBar-nowPlayingBar"
    )[0].style.flexDirection = "";
    document.querySelectorAll(
        "footer.main-nowPlayingBar-container"
    )[0].style.minWidth = "";
    document.querySelectorAll(
        ".main-nowPlayingWidget-nowPlaying"
    )[0].style.gridTemplate = ``;
    Art = document.querySelectorAll(
        ".main-coverSlotCollapsed-container.main-coverSlotCollapsed-navAltContainer *"
    );
    for (let i = 0; i < Art.length; i++) {
        Art[i].setAttribute("style", "");
    }
    Controls = document.querySelectorAll(
        ".main-nowPlayingBar-nowPlayingBar > *"
    );
    for (let i = 0; i < Controls.length; i++) {
        Controls[i].style.marginBlock = "";
        Controls[i].style.marginInline = "";
        Controls[i].style.padding = "";
    }
    document
        .querySelectorAll(
            ".main-coverSlotCollapsed-container.main-coverSlotCollapsed-navAltContainer"
        )[0]
        .setAttribute("style", "");
    document.querySelectorAll(
        ".main-trackInfo-container"
    )[0].style.paddingLeft = "";
    document.querySelectorAll(".main-trackInfo-container")[0].style.width = "";
    document.querySelectorAll(".main-nowPlayingBar-center")[0].style.width = "";
    document.querySelectorAll(
        ".main-connectPicker-button > div"
    )[0].style.bottom = "";
}

function removeMediaQueries() {
    const styleElements = document.querySelectorAll(
        "style, link[rel='stylesheet']"
    );
    styleElements.forEach((element) => {
        const css = element.innerHTML;
        if (css.includes("@media")) {
            element.parentNode.removeChild(element);
        }
    });
}
