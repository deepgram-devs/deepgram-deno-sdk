import {
  assertEquals,
  assertThrows,
  assertRejects,
} from "https://deno.land/std@0.136.0/testing/asserts.ts";
import { Billing } from "../deps.ts";
import { denock } from "https://deno.land/x/denock/mod.ts";
import {
  assertSpyCall,
  assertSpyCalls,
  resolvesNext,
  stub,
} from "https://deno.land/std@0.136.0/testing/mock.ts";
import defaults from "./defaultOptions.ts";

const { host, credential, apiPath, projectId, memberId } = defaults;
const billingTest = new Billing(credential, host);

Deno.test("Billing list balances", async () => {
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
    path: `${apiPath}/${projectId}/balances`,
    replyStatus: 201,
    responseBody: [
      {
        balance_id: "123",
        amount: "3.23",
        units: "usd",
        purchase_order_id: "1234515",
      },
    ],
  });
  const balanceList = await billingTest.listBalances(projectId);

  assertEquals(balanceList, [
    {
      balance_id: "123",
      amount: "3.23",
      units: "usd",
      purchase_order_id: "1234515",
    },
  ]);
});

Deno.test("Billing list balances Fail", async () => {
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
    path: `${apiPath}/${projectId}/balances`,
    replyStatus: 404,
    responseBody: "Failed",
  });
  assertRejects(async () => {
    await billingTest.listBalances(projectId);
  }, Error);
});

Deno.test("Billing get balance", async () => {
  const balanceId = "123";
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
    path: `${apiPath}/${projectId}/balances/${balanceId}`,
    replyStatus: 201,
    responseBody: {
      balance_id: "123",
      amount: "3.23",
      units: "usd",
      purchase_order_id: "1234515",
    },
  });
  const balanceGet = await billingTest.getBalance(projectId, balanceId);

  assertEquals(balanceGet, {
    balance_id: "123",
    amount: "3.23",
    units: "usd",
    purchase_order_id: "1234515",
  });
});

Deno.test("Billing get balance Fail", async () => {
  const balanceId = "123";
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
    path: `${apiPath}/${projectId}/balances/${balanceId}`,
    replyStatus: 404,
    responseBody: "Failed",
  });
  assertRejects(async () => {
    await billingTest.getBalance(projectId, balanceId);
  }, Error);
});
