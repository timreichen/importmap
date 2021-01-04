import { resolve } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";

Deno.test("specifier remapping", () => {
  const importMap = {
    imports: {
      "foo/": "bar/",
      "/app/helpers.mjs": "/app/helpers/index.mjs",
    },
  };
  assertEquals(resolve("foo/test", importMap), "bar/test");
  assertEquals(
    resolve("/app/helpers.mjs", importMap),
    "/app/helpers/index.mjs",
  );
});

Deno.test("scoping", () => {
  const importMap = {
    imports: {
      "a": "/a-1.mjs",
      "b": "/b-1.mjs",
      "c": "/c-1.mjs",
    },
    scopes: {
      "/scope2/": {
        "a": "/a-2.mjs",
      },
      "/scope2/scope3/": {
        "b": "/b-3.mjs",
      },
    },
  };
  assertEquals(resolve("a", importMap, "/scope1/foo.mjs"), "/a-1.mjs");
  assertEquals(resolve("b", importMap, "/scope1/foo.mjs"), "/b-1.mjs");
  assertEquals(resolve("c", importMap, "/scope1/foo.mjs"), "/c-1.mjs");

  assertEquals(resolve("a", importMap, "/scope2/foo.mjs"), "/a-2.mjs");
  assertEquals(resolve("b", importMap, "/scope2/foo.mjs"), "/b-1.mjs");
  assertEquals(resolve("c", importMap, "/scope2/foo.mjs"), "/c-1.mjs");

  assertEquals(resolve("a", importMap, "/scope2/scope3/foo.mjs"), "/a-2.mjs");
  assertEquals(resolve("b", importMap, "/scope2/scope3/foo.mjs"), "/b-3.mjs");
  assertEquals(resolve("c", importMap, "/scope2/scope3/foo.mjs"), "/c-1.mjs");
});

Deno.test("url remapping", () => {
  const importMap = {
    imports: {
      "path/": "https://deno.land/std@0.65.0/path/",
    },
  };
  assertEquals(
    resolve("path/mod.ts", importMap),
    "https://deno.land/std@0.65.0/path/mod.ts",
  );
});

Deno.test("general URL-like specifier remapping", () => {
  const importMap = {
    imports: {
      "https://www.unpkg.com/vue/dist/vue.runtime.esm.js":
        "/node_modules/vue/dist/vue.runtime.esm.js",
    },
  };
  assertEquals(
    resolve("https://www.unpkg.com/vue/dist/vue.runtime.esm.js", importMap),
    "/node_modules/vue/dist/vue.runtime.esm.js",
  );

  const importMap2 = {
    imports: {
      "https://www.unpkg.com/vue/": "/node_modules/vue/",
    },
  };
  assertEquals(
    resolve("https://www.unpkg.com/vue/dist/vue.runtime.esm.js", importMap2),
    "/node_modules/vue/dist/vue.runtime.esm.js",
  );
});
