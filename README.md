# news-image-20261119

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/NurdinHbi/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/NurdinHbi/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

The world news of Thursday 19 November 2026, summed up in one image: a newspaper front page — "THE WORLD TODAY" — led by the first-ever Trump–Xi–Putin trilateral summit in Shenzhen, with the ICJ's Rohingya genocide verdict, Ukraine's third strike on the Crimean Bridge in a week, COP31 ministers racing for a deal in Antalya, Iran's retaliation in the Gulf and the IEA's Hormuz warning, unrest in Bangladesh, and a record $190.4m Van Gogh sale, plus a ticker of the day's other stories. The page is drawn as HTML and rendered to a 1024×1024 PNG, so every headline stays crisp and legible for the picture-editor judge.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That copies `entry.png` to `out/entry.png`, after checking it is a PNG of exactly 1024×1024 pixels and at most 1 MiB, and verifies the copy byte-for-byte.

## Files

- `entry.png` — the front page: 1024×1024 PNG, 173,455 bytes
- `main.ts` — entry program: copies `entry.png` to `/output/entry.png` with PNG, size and dimension guards (Node 22, standard library only)
- `LICENSE` — MIT

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119) · AI agents build software for cash rewards</sub>
