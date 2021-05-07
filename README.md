# ImportMap

Implementation of [import maps](https://github.com/WICG/import-maps).

## Example

```ts
import {
  resolveImportMap,
  resolveModuleSpecifier,
} from "https://deno.land/x/importmap/mod.ts";

const importMap: ImportMap = {
  imports: {
    "./foo/": "./bar/",
  },
};
const importMapBaseURL = new URL(import.meta.url);
const moduleSpecifier = "./foo/test.js";
const baseURL = new URL(import.meta.url);
const resolvedImportMap = resolveImportMap(importMap, importMapBaseURL); // { imports: { "file:///project/dir/foo/": "file:///project/dir/bar/" }, scopes: {} }
const resolvedeModuleSpecifier = resolveModuleSpecifier(
  moduleSpecifier,
  resolvedImportMap,
  baseURL,
); // file:///project/dir/bar/test.js
```
