import { existsSync, mkdirSync, rmSync } from "node:fs"
import { resolve } from "node:path"
import { spawnSync } from "node:child_process"
import { createRequire } from "node:module"

const projectRoot = resolve(import.meta.dirname, "..")
const docsSource = resolve(projectRoot, "doc")
const docsOutput = resolve(projectRoot, "web/public/docs")

if (!existsSync(docsSource)) {
  console.error(`Docs source directory not found: ${docsSource}`)
  process.exit(1)
}

rmSync(docsOutput, { recursive: true, force: true })
mkdirSync(docsOutput, { recursive: true })

const honkit = createRequire(import.meta.url).resolve("honkit/bin/honkit.js")
const result = spawnSync(process.execPath, [honkit, "build", docsSource, docsOutput], {
  cwd: projectRoot,
  stdio: "inherit",
})

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}
