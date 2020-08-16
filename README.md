# ImportMap

Resolve specifiers with import maps.

## Examples

### Imports
```ts
import { resolve } from "https://deno.land/x/importmap/mod.ts"

const specifier = "foo/mod.ts"
const importMap = {
  imports: {
    "foo/": "bar/"
  }
}
resolve(specifier, importMap) // returns "bar/mod.ts"
```

### URLs
```ts
import { resolve } from "https://deno.land/x/importmap/mod.ts"

const specifier = "path/mod.ts"
const importMap = {
  imports: {
    "path/": "https://deno.land/std/path/"
  }
}
resolve(specifier, importMap) // returns "https://deno.land/std/path/mod.ts"
```

### Scopes

```ts
import { resolve } from "https://deno.land/x/importmap/mod.ts"

const specifier = "path/mod.ts"
 const importMap = {
  imports: {
    "a": "/a-1.ts",
    "b": "/b-1.ts"
  },
  scopes: {
    "/scope2/": {
      "a": "/a-2.ts"
    }
  }
}
resolve("a", importMap, "/scope1/foo.ts") // returns "/a-1.ts"
resolve("b", importMap, "/scope1/foo.ts") // returns "/b-1.ts"

resolve("a", importMap, "/scope2/foo.ts") // returns "/a-2.ts"
resolve("b", importMap, "/scope2/foo.ts") // returns "/b-1.ts"
```

