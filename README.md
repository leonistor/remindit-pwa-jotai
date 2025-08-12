# React + TypeScript + Vite

## init project

```
❯ bun create @vite-pwa/pwa w-jotai
✔ Select a framework: › React
✔ Select a variant: › TypeScript
✔ PWA Name: … w-jotai
✔ PWA Short Name: … w-jotai
✔ PWA Description: … remindit with jotai
✔ Theme color: … #ffffff
✔ Select a strategy: › generateSW
✔ Select a behavior: › Auto update
✔ Enable periodic SW updates? … yes
✔ Show offline ready prompt? … yes
✔ Generate PWA Assets Icons on the fly? … no
```

```
bun install
bun run generate-pwa-icons
```

## vite setup

- use [qrcode plugin](https://github.com/svitejs/vite-plugin-qrcode)
- add dev `@types/node`
- path `@` alias cf. [shadcn setup](https://ui.shadcn.com/docs/installation/vite)

## changelog

w/ [changie](https://changie.dev/guide/installation/#nodejs)

setup:

- `bun add --dev changie`
- edit config for package.json: https://changie.dev/integrations/nodejs/
- `bunx changie init`

workflow:

```
bunx changie new
# fixed ...
bunx changie new
# added ...

bunx changie batch [patch|minor|major]

bunx changie merge
```
