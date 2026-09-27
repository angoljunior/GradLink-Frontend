import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import axios from "axios";

const source = await readFile(new URL("../src/api/axios.js", import.meta.url), "utf8");
function client(adapter) {
  const values = new Map([["access", "expired"], ["refresh", "refresh-fixture"]]);
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) };
  // Inject transport/storage into the actual interceptor module without starting Vite.
  const code = source.replace(/^import .*;$/gm, "").replace("import.meta.env.VITE_API_URL", "undefined").replace("export default api;", "return api;");
  const transport = { create: (config) => axios.create({ ...config, adapter }) };
  return { api: new Function("axios", "clearSession", "localStorage", code)(transport, () => values.clear(), storage), values };
}
function fail(config, status) {
  throw new axios.AxiosError("fixture", "ERR_BAD_REQUEST", config, null, { status, data: {}, config });
}
const ok = (config, data) => ({ status: 200, data, headers: {}, config });

test("public login does not send stale access token", async () => {
  const { api } = client(async (config) => {
    assert.equal(config.headers.Authorization, undefined);
    return ok(config, {});
  });
  await api.post("login/", {});
});

test("concurrent 401s share one refresh and retry with new access", async () => {
  let refreshes = 0;
  const { api, values } = client(async (config) => {
    if (config.url === "token/refresh/") {
      refreshes += 1;
      await new Promise((resolve) => setTimeout(resolve, 10));
      return ok(config, { access: "fresh" });
    }
    if (config.headers.Authorization !== "Bearer fresh") fail(config, 401);
    return ok(config, { role: "student" });
  });
  const results = await Promise.all([api.get("me/"), api.get("student/applications/")]);
  assert.equal(refreshes, 1);
  assert.equal(values.get("access"), "fresh");
  assert.equal(results[0].data.role, "student");
});

test("rejected refresh clears session", async () => {
  const { api, values } = client(async (config) => fail(config, 401));
  await assert.rejects(api.get("me/"));
  assert.equal(values.size, 0);
});

test("network/server failure does not discard refresh token", async () => {
  const { api, values } = client(async (config) => fail(config, config.url === "token/refresh/" ? 503 : 401));
  await assert.rejects(api.get("me/"));
  assert.equal(values.get("refresh"), "refresh-fixture");
});
