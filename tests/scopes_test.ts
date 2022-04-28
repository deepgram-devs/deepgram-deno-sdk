import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";
import { Scopes, ScopeList } from "../deps.ts";
import { denock } from "https://deno.land/x/denock/mod.ts";
import defaults from "./defaultOptions.ts";
import {
  assertSpyCall,
  assertSpyCalls,
  resolvesNext,
  stub,
} from "https://deno.land/std@0.136.0/testing/mock.ts";

const { host, credential, apiPath, projectId, memberId } = defaults;

const scopeTest = new Scopes("6546546879865", host);
Deno.test("Scopes Get", async () => {
  denock({
    method: "GET",
    protocol: "https",
    host: host,
    headers: [
      {
        header: "content-type",
        value: "application/json",
      },
      {
        header: "Authorization",
        value: `token ${credential}`,
      },
      {
        header: "X-DG-Agent",
        value: "deno-sdk/1.0.0",
      },
    ],
    path: `${apiPath}/${projectId}/members/${memberId}/scopes`,
    replyStatus: 201,
    responseBody: ["member"],
  });
  const scopeGet = await scopeTest.get(projectId, memberId);
  assertEquals(
    scopeGet,
    ["member"],
    "Scope Get call did not return expected result"
  );
});
Deno.test("Scopes Get Fail", async () => {
  denock({
    method: "GET",
    protocol: "https",
    host: host,
    headers: [
      {
        header: "content-type",
        value: "application/json",
      },
      {
        header: "Authorization",
        value: `token ${credential}`,
      },
      {
        header: "X-DG-Agent",
        value: "deno-sdk/1.0.0",
      },
    ],
    path: `${apiPath}/${projectId}/members/${memberId}/scopes`,
    replyStatus: 404,
    responseBody: "Failed",
  });
  const scopeGet = await scopeTest.get(projectId, memberId);
  assertEquals(
    scopeGet,
    "Failed",
    "Scope Get call did not return expected ADMIN"
  );
});
