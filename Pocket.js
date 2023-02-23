(async function pocket() {
    if (!(Spicetify.Player?.data && Spicetify.Menu && Spicetify.LocalStorage && Spicetify.Platform)) {
        setTimeout(pocket, 300);
        return;
    }
    const { Player, Menu, LocalStorage, Platform, React } = Spicetify;
    await InitPocket();
})();

async function InitPocket() {
    console.log("%c❀ Pocket", "font-size:5em; color:#faa;", "Made with <3 by LucyUwi");
    console.log("%c[❀ Pocket]", "color:#faa;", "Loading Configuration");

    //////// Load / Create Config If It Doesn't Exists ////////

    if (localStorage.getItem("PocketConfig") === undefined) {
        Styles = getComputedStyle(document.documentElement);
        Config = {
            Accent: Styles.getPropertyValue("--spice-button").replace(/\s/g,""),
            Segment: Styles.getPropertyValue("--spice-secondary").replace(/\s/g,""),
            Main: Styles.getPropertyValue("--spice-main").replace(/\s/g, ""),
            Text: Styles.getPropertyValue("--spice-text").replace(/\s/g, ""),
            Subtext: Styles.getPropertyValue("--spice-subtext").replace(/\s/g,""),
            Card: Styles.getPropertyValue("--spice-card").replace(/\s/g, ""),
            BorderRadius: Styles.getPropertyValue("--border-radius").replace(/\s/g,"").replace(/\D/g, ""),
            BorderRadiusUnit: Styles.getPropertyValue("--border-radius").replace(/\s/g,"").replace(/[0-9]/g, ""),
            Controls: "Side",
            Presets: "Dark",
            Margins: Styles.getPropertyValue("--margin").replace(/\s/g,"").replace(/\D/g, ""),
            MarginsUnit: Styles.getPropertyValue("--margin").replace(/\s/g,"").replace(/[0-9]/g, ""),
        };
        localStorage.setItem("PocketConfig", JSON.stringify(Config));
    } else {
        Config = JSON.parse(localStorage.getItem("PocketConfig"));
    }

    //////// Pocket Class / Main Functions ////////////////

    class Pocket {

        //////// Apply Current Config ////////

        static Apply() {
            let SetStyles = document.documentElement.style;
            for (let i = 0; i < ConfigArray.length; i++) {
                if (ConfigArray[i].Variable[0] != "--border-radius" && ConfigArray[i].Variable[0] != "--margin" ) {
                    SetStyles.setProperty(
                        ConfigArray[i].Variable[0],
                        Config[ConfigArray[i].ID]
                    );
                    if (ConfigArray[i].Variable.length == 2) {
                        let RGBArr = Pocket.HexToRGB(Config[ConfigArray[i].ID]);
                        let RGB = RGBArr.r + "," + RGBArr.g + "," + RGBArr.b;
                        SetStyles.setProperty(ConfigArray[i].Variable[1], RGB);
                    }
                } else {
                    let Radius = Config[ConfigArray[i].IDs[0]] + Config[ConfigArray[i].IDs[1]]
                    SetStyles.setProperty(ConfigArray[i].Variable[0], Radius);
                }
            }
            Pocket.PlayerHandler();
            try {document.getElementById("ManualEdit").value = JSON.stringify(Config);} catch {}
            console.log("%c[❀ Pocket]", "color:#faa;", "Configuration Applied");
        }

        //////// Save Current Config ////////

        static Save() {
            for (let i = 0; i < ConfigArray.length; i++) {
                if (ConfigArray[i].Type.length == 1) {
                    Config[ConfigArray[i].ID] = document.getElementById(ConfigArray[i].ID).value;
                } else {
                    for (let j = 0; j < ConfigArray[i].IDs.length; j++) {
                        Config[ConfigArray[i].IDs[j]] = document.getElementById(ConfigArray[i].IDs[j]).value;
                    }
                }
            }
            Config.Presets = "";
            document.getElementById(ConfigArray[0].ID).value = "";
            localStorage.setItem("PocketConfig", JSON.stringify(Config));
            Pocket.Apply();
            console.log("%c[❀ Pocket]", "color:#faa;", "Configuration Saved, Now:", Config);
        }

        //////// Save for Manual JSON Entry ////////

        static ManualSave() {
            Config = JSON.parse(ManualEdit.value);
            localStorage.setItem("PocketConfig", JSON.stringify(Config));
            for (let i = 0; i < ConfigArray.length; i++) {
                if (ConfigArray[i].ID !== undefined) {
                    document.getElementById(ConfigArray[i].ID).value = Config[ConfigArray[i].ID];
                } else {
                    for (let j = 0; j < ConfigArray[i].IDs.length; j++) {
                        document.getElementById(ConfigArray[i].IDs[j]).value = Config[ConfigArray[i].IDs[j]];
                    }
                }
            }
            Pocket.Apply();
            console.log("%c[❀ Pocket]", "color:#faa;", "Configuration Saved, Now:", Config);
        }

        //////// Change Position of Player if Required ////////

        static PlayerHandler() {
            if (Config.Controls == "Bottom") {
                Pocket.BottomPlayer();
            } else {
                Pocket.SidePlayer();
            }
        }

        //////// Set Preset if one is selected ////////

        static Preset() {
            Config.Presets = document.getElementById("Presets").value;
            let NewConfig = Presets[Config.Presets];
            console.log;
            let ObjectKeys = Object.keys(NewConfig);
            for (let i = 0; i < ObjectKeys.length; i++) {
                Config[ObjectKeys[i]] = NewConfig[ObjectKeys[i]];
            }
            localStorage.setItem("PocketConfig", JSON.stringify(Config));
            for (let i = 0; i < ConfigArray.length; i++) {
                if (ConfigArray[i].ID !== undefined) {
                    document.getElementById(ConfigArray[i].ID).value = Config[ConfigArray[i].ID];
                } else {
                    for (let j = 0; j < ConfigArray[i].IDs.length; j++) {
                        document.getElementById(ConfigArray[i].IDs[j]).value = Config[ConfigArray[i].IDs[j]];
                    }
                }
            }
            Pocket.Apply();
        }

        //////// Reset All Settings ////////

        static Reset() {
            Config = JSON.parse(localStorage.getItem("DefualtPocketConfig"));
            localStorage.setItem("PocketConfig", JSON.stringify(Config));
            for (let i = 0; i < ConfigArray.length; i++) {
                if (ConfigArray[i].ID !== undefined) {
                    document.getElementById(ConfigArray[i].ID).value = Config[ConfigArray[i].ID];
                } else {
                    for (let j = 0; j < ConfigArray[i].IDs.length; j++) {
                        document.getElementById(ConfigArray[i].IDs[j]).value = Config[ConfigArray[i].IDs[j]];
                    }
                }
            }
            Pocket.Apply();
            console.log("%c[❀ Pocket]", "color:#faa;", "Configuration Reset, Now:", Config);
        }

        //////// Clear All Settings ////////

        static Clear() {
            localStorage.removeItem("PocketConfig");
            localStorage.removeItem("PresetCache");
            location.reload();
        }

        //////// Apply Stylesheet to Move Player to Bottom ////////

        static BottomPlayer() {
            const Style = document.createElement("style");
            Style.id = "BottomPlayer";
            Style.innerHTML = `
                .Root__top-container {
                    display: grid;
                    grid-template-areas: "top-bar top-bar" "nav-bar main-view" "nav-bar main-view" "now-playing-bar now-playing-bar";
                }
                .Root__top-container--right-sidebar-visible {
                    display: grid;
                    grid-template-areas: 
                    "top-bar top-bar top-bar"
                    "nav-bar main-view right-sidebar"
                    "now-playing-bar now-playing-bar now-playing-bar";
                }
                .Root__now-playing-bar {
                    width: calc(100vw - 2em);
                }
                .main-nowPlayingBar-nowPlayingBar {
                    display: flex;
                    flex-direction: row;
                }
                footer.main-nowPlayingBar-container {
                    min-width: 100%;
                }
                .main-nowPlayingWidget-nowPlaying {
                    display: grid;
                    grid-template: "Art Info Like";
                }
                .main-coverSlotCollapsed-container.main-coverSlotCollapsed-navAltContainer * {
                    width: 60px !important;
                    height: 60px !important;
                }
                .main-nowPlayingBar-nowPlayingBar > * {
                    margin-block: 8px;
                    margin-inline: 0;
                    padding: 0;
                }
                .main-coverSlotCollapsed-container.main-coverSlotCollapsed-navAltContainer {
                    width: 60px !important;
                    height: 60px !important;
                }
                .main-trackInfo-container {
                    padding-left: 1em;
                    width: 10em;
                }
                .main-nowPlayingBar-center {
                    width: 40%;
                }
                .main-connectPicker-button > div {
                    bottom: -3.1em;
                }
            `;
            document.body.appendChild(Style);
        }

        //////// Delete Stylesheet to Move Player to Side ////////

        static SidePlayer() {
            const BottomPlayerStyle = document.getElementById("BottomPlayer");
            if (BottomPlayerStyle) {
                BottomPlayerStyle.remove();
            }
        }

        //////// Convert HEX Color Code to RBG array ////////

        static HexToRGB(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16),
                  }
                : null;
        }

        //////// Create Options for <select> ////////

        static CreateOptions(Options, Value) {
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

        //////// Create Config Menu HTML ////////

        static GenConfig( Parent, ConfigArray ) {
            let ConfigOptions = Array;
            for (let i = 0; i < ConfigArray.length; i++) {
                ConfigOptions[i] = document.createElement("div");
                ConfigOptions[i].setAttribute("class", "ConfigOption");
                if (ConfigArray[i].Type.length == 1 && ConfigArray[i].Type[0] != "select") {
                    ConfigOptions[i].innerHTML = "<h3>" + ConfigArray[i].Title + "</h3>" + "<input type='" + ConfigArray[i].Type[0] + "' id='" + ConfigArray[i].ID + "' value='" + ConfigArray[i].Value + "'></div>";
                } else if (ConfigArray[i].Type[0] == "select") {
                    let Options = Pocket.CreateOptions(ConfigArray[i].Options, ConfigArray[i].Value);
                    ConfigOptions[i].innerHTML = "<h3>" + ConfigArray[i].Title + "</h3>" + "<select id='" + ConfigArray[i].ID + "'>" + Options + "</select>";
                } else {
                    let Fields = "";
                    for (let j = 0; j < ConfigArray[i].Type.length; j++) {
                        if (ConfigArray[i].Type[j] != "select") {
                            Fields += "<input type='" + ConfigArray[i].Type[j] + "' id='" + ConfigArray[i].IDs[j] + "' value='" + ConfigArray[i].Values[j] + "'>";
                        } else if (ConfigArray[i].Type[j] == "select") {
                            let Options = Pocket.CreateOptions(ConfigArray[i].Options[j], ConfigArray[i].Values[j]);
                            Fields += "<select id='" + ConfigArray[i].IDs[j] + "'>" + Options + "</select>";
                        }
                    } 
                    ConfigOptions[i].innerHTML = "<h3>" + ConfigArray[i].Title + "</h3><div class='Multi'>" + Fields + "</div>";
                }
                Parent.appendChild(ConfigOptions[i]);
                if (ConfigArray[i].Type.length == 1 && i != 0) {
                    ConfigOptions[i].addEventListener("change", function () { Pocket.Save(); }, false);
                } else if (ConfigArray[i].Type.length != 1) {
                    for (let j = 0; j < ConfigArray[i].Type.length; j++) {
                        ConfigOptions[i].childNodes[j].addEventListener("change", function () { Pocket.Save(); }, false);
                    }
                } else if (i == 0) {
                    ConfigOptions[i].addEventListener("change", function () { Pocket.Preset(); }, false);
                }
            }
            return Parent
        }

        //////// Create Manual Edit HTML ////////

        static GenManualEdit( Parent ) {
            let ManualEditTitle = document.createElement("h3");
            ManualEditTitle.innerHTML = "[Advance] Manual Editing";
            let ManualEditSubtext = document.createElement("p");
            ManualEditSubtext.innerHTML = "If something goes wrong press [Reset]";
            let ManualEdit = document.createElement("textarea");
            ManualEdit.setAttribute("id","ManualEdit")
            ManualEdit.value = JSON.stringify(Config);
            ManualEdit.cols = 40;
            ManualEdit.rows = 6;
            ManualEdit.addEventListener("input", function () { Pocket.ManualSave(); }, false );

            Parent.appendChild(ManualEditTitle);
            Parent.appendChild(ManualEditSubtext);
            Parent.appendChild(ManualEdit);

            return Parent
        }

        //////// Create Complete Reset HTML ////////

        static GenClear( Parent ) {
            let CompleteClear = document.createElement("button");
            CompleteClear.innerHTML = "Remove all Settings";
            CompleteClear.setAttribute("id", "ClearButton");
            CompleteClear.addEventListener( "click", function () { Pocket.Clear(); }, false);

            Parent.appendChild(CompleteClear);
            return Parent
        }

        //////// Create Reset Button HTML ////////

        static GenReset( Parent ) {
            let ResetButton = document.createElement("button");
            ResetButton.setAttribute("class", "ResetButton");
            ResetButton.innerHTML = "Reset";
            Parent.appendChild(ResetButton)
            ResetButton.addEventListener("click", function () { Reset(); }, false);
            
            return Parent
        }

        //////// Create Config Page ////////

        static GenConfigPage( ConfigArray ) {
            let Config = document.createElement("div");
            let ConfigMenu = document.createElement("div");
            let Style = document.createElement("style");

            Style.innerHTML = `.ConfigOption {
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
            
            button.ResetButton {
                color: var(--spice-text);
                background: var(--spice-button);
                border: 0;
                padding: 0.5em;
                padding-inline: 1em; border-radius: 1em;
                position: sticky;
                bottom: 2.5em;
            }
            
            button.ResetButton:hover {
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

            Config = Pocket.GenConfig( Config, ConfigArray );
            Config = Pocket.GenManualEdit( Config );
            Config = Pocket.GenClear( Config );
            ConfigMenu.appendChild( Style );
            ConfigMenu.appendChild( Config )
            ConfigMenu = Pocket.GenReset( ConfigMenu );

            return ConfigMenu
        }

        //////// Get Presets ////////

        static async GetPresets() {
            try {
                let PresetsPromise = await fetch(
                    "https://raw.githubusercontent.com/LucyUwI/Pocket/main/Presets.json"
                );
                let Presets = await PresetsPromise.json();
                localStorage.setItem("PresetsCache", JSON.stringify(Presets));
                return Presets
            } catch {
                console.log("Error");
                if (localStorage.getItem("PresetsCache") !== undefined) {
                    let Presets = JSON.parse(localStorage.getItem("PresetsCache"));
                } else {
                    let Presets = {
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
                return Presets
            }
        }
    };

    //////// Get Presets ////////

    Presets = await Pocket.GetPresets()

    //////// Array Of Config Options ////////

    ConfigArray = [
        {
            Title: "Presets",
            Type: ["select"],
            Options: Object.keys(Presets),
            ID: "Presets",
            Value: Config.Presets,
            Variable: [""],
        },
        {
            Title: "Accent Color",
            Type: ["color"],
            ID: "Accent",
            Value: Config.Accent,
            Variable: ["--spice-button", "--spice-rgb-button"],
        },
        {
            Title: "Primary Color",
            Type: ["color"],
            ID: "Main",
            Value: Config.Main,
            Variable: ["--spice-main"],
        },
        {
            Title: "Secondary Color",
            Type: ["color"],
            ID: "Segment",
            Value: Config.Segment,
            Variable: ["--spice-secondary", "--spice-rgb-secondary"],
        },
        {
            Title: "Tertiary Color",
            Type: ["color"],
            ID: "Card",
            Value: Config.Card,
            Variable: ["--spice-card", "--spice-rgb-card"],
        },
        {
            Title: "Text Color",
            Type: ["color"],
            ID: "Text",
            Value: Config.Text,
            Variable: ["--spice-text", "--spice-rgb-text"],
        },
        {
            Title: "Secondary Text Color",
            Type: ["color"],
            ID: "Subtext",
            Value: Config.Subtext,
            Variable: ["--spice-subtext", "--spice-rgb-subtext"],
        },
        {
            Title: "Border Radius",
            Type: ["number", "select"],
            Options: [[], ["px", "em"]],
            IDs: ["BorderRadius", "BorderRadiusUnit"],
            Values: [Config.BorderRadius, Config.BorderRadiusUnit],
            Variable: ["--border-radius"],
        },
        {
            Title: "Margins",
            Type: ["number", "select"],
            Options: [[], ["px", "em"]],
            IDs: ["Margins", "MarginsUnit"],
            Values: [Config.Margins, Config.MarginsUnit],
            Variable: ["--margin"],
        },
        {
            Title: "Controls Position",
            Type: ["select"],
            Options: ["Side", "Bottom"],
            ID: "Controls",
            Value: Config.Controls,
            Variable: [""],
        },
    ];
    console.log(ConfigArray)

    //////// Generate Menu ////////

    content = Pocket.GenConfigPage( ConfigArray )
    
    
    //////// Create Button For Menu ////////

    let SVG = `<svg viewBox="0 0 262.394 262.394" style="scale: 0.5; fill: currentcolor"><path d="M245.63,103.39h-9.91c-2.486-9.371-6.197-18.242-10.955-26.432l7.015-7.015c6.546-6.546,6.546-17.159,0-23.705 l-15.621-15.621c-6.546-6.546-17.159-6.546-23.705,0l-7.015,7.015c-8.19-4.758-17.061-8.468-26.432-10.955v-9.914 C159.007,7.505,151.502,0,142.244,0h-22.091c-9.258,0-16.763,7.505-16.763,16.763v9.914c-9.37,2.486-18.242,6.197-26.431,10.954 l-7.016-7.015c-6.546-6.546-17.159-6.546-23.705,0.001L30.618,46.238c-6.546,6.546-6.546,17.159,0,23.705l7.014,7.014 c-4.758,8.19-8.469,17.062-10.955,26.433h-9.914c-9.257,0-16.762,7.505-16.762,16.763v22.09c0,9.258,7.505,16.763,16.762,16.763 h9.914c2.487,9.371,6.198,18.243,10.956,26.433l-7.015,7.015c-6.546,6.546-6.546,17.159,0,23.705l15.621,15.621 c6.546,6.546,17.159,6.546,23.705,0l7.016-7.016c8.189,4.758,17.061,8.469,26.431,10.955v9.913c0,9.258,7.505,16.763,16.763,16.763 h22.091c9.258,0,16.763-7.505,16.763-16.763v-9.913c9.371-2.487,18.242-6.198,26.432-10.956l7.016,7.017 c6.546,6.546,17.159,6.546,23.705,0l15.621-15.621c3.145-3.144,4.91-7.407,4.91-11.853s-1.766-8.709-4.91-11.853l-7.016-7.016 c4.758-8.189,8.468-17.062,10.955-26.432h9.91c9.258,0,16.763-7.505,16.763-16.763v-22.09 C262.393,110.895,254.888,103.39,245.63,103.39z M131.198,191.194c-33.083,0-59.998-26.915-59.998-59.997 c0-33.083,26.915-59.998,59.998-59.998s59.998,26.915,59.998,59.998C191.196,164.279,164.281,191.194,131.198,191.194z"/><path d="M131.198,101.199c-16.541,0-29.998,13.457-29.998,29.998c0,16.54,13.457,29.997,29.998,29.997s29.998-13.457,29.998-29.997 C161.196,114.656,147.739,101.199,131.198,101.199z"/></svg>`;
    new Spicetify.Topbar.Button("Pocket", SVG, () => {
        Spicetify.PopupModal.display({
            title: "Pocket Settings",
            content,
        });
    });

    console.log("%c[❀ Pocket]", "color:#faa;", "Configuration Loaded");

    //////// Apply Config ////////

    Pocket.Apply()

    //////// Load JQuery if not loaded ////////

    if (!window.jQuery) {
        JQuery = document.createElement("script");
        JQuery.setAttribute(
            "src",
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"
        );
        document.body.appendChild(JQuery);
    };

    //////// Hide Buttons on Volume Hover ////////

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

    //////// Apply Menu and Window controls if required ////////

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
};
