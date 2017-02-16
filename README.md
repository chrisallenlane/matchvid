mvid
====
`melt` wrapper that automates my routine video editing.

## Usage ##
```sh
# generate a config
mvid config > stages.yml

# preview output
mvid -c stages.yml -v ~/videos -a ~/music/soundtrack.mp3 | sh

# save file
mvid -c stages.yml -v ~/videos -a ~/music/soundtrack.mp3 -o ~/outfile.mp4 | sh
```
