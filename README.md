# ImportMap

Resolve specifiers with import maps.

## Usage
```ts
import { resolve } from "https://deno.land/x/importmap/mod.ts"

const specifier = "foo/mod.ts"
const importMap = { imports: { "foo/": "bar/" } }
const resolvedSpecifier = resolve(specifier, importMap) // returns "bar/mod.ts"
```