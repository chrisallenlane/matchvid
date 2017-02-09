matchvid
========
`melt` wrapper that automates my routine video editing.

## Usage ##
```sh
# generate a config
matchvid config > stages.yml

# preview output
matchvid -c stages.yml -v ~/videos -a ~/music/soundtrack.mp3 | sh

# save file
matchvid -c stages.yml -v ~/videos -a ~/music/soundtrack.mp3 -o ~/outfile.mp4 | sh
```
