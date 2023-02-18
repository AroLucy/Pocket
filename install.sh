#!/bin/sh
if [[ -f "~/.config/spicetify/Themes/Pocket/*" ]]; then
    rm -rf ~/.config/spicetify/Themes/Pocket;
fi

if [[ -f "~/.config/spicetify/Extensions/Pocket.js" ]]; then
    rm -rf ~/.config/spicetify/Extensions/Pocket.js;
fi

mkdir ~/.config/spicetify/Themes/Pocket
curl -fsSL https://raw.githubusercontent.com/LucyUwI/Pocket/main/Pocket-Spotify/user.css -o ~/.config/spicetify/Themes/Pocket/user.css
curl -fsSL https://raw.githubusercontent.com/LucyUwI/Pocket/main/Pocket-Spotify/color.ini -o ~/.config/spicetify/Themes/Pocket/color.ini
curl -fsSL https://raw.githubusercontent.com/LucyUwI/Pocket/main/Pocket.js -o ~/.config/spicetify/Extensions/Pocket.js
spicetify config current_theme Pocket color_scheme Pink extensions Pocket.js
spicetify apply
