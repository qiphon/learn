# build width vite config

## usage 

install `pnpm add -D vitepress`

add  `docs/.vitepress/config.mts` &  `docs/index.md`

add scripts in package.json

```json 
// scripts
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
```

- [Route](https://vitepress.dev/guide/routing)