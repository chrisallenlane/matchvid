mvid
====
`melt` wrapper that automates my routine video editing.

## Usage ##
```sh
#To seed a sample config file:
mvid config > config.yml

#To preview a video:
mvid stages.yml /path/to/videos | sh

#To render a video:
mvid stages.yml /path/to/videos match.mp4 | sh
