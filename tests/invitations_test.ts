import {
  assertEquals,
  assertThrows,
  assertRejects,
} from "https://deno.land/std@0.136.0/testing/asserts.ts";
import { Invitation } from "../deps.ts";
import { denock } from "https://deno.land/x/denock/mod.ts";
import {
  assertSpyCall,
  assertSpyCalls,
  resolvesNext,
  stub,
} from "https://deno.land/std@0.136.0/testing/mock.ts";
import defaults from "./defaultOptions.ts";

const { host, credential, apiPath, projectId, memberId } = defaults;
const invitationTest = new Invitation(credential, host);

Deno.test("Invitation list", async () => {
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
    path: `${apiPath}/${projectId}/invites`,
    replyStatus: 201,
    responseBody: {
      invites: [{ email: "boatyMcBoatFace@deepgram.com", scope: "member" }],
    },
  });
  const invitationList = await invitationTest.list(projectId);

  assertEquals(invitationList, {
    invites: [{ email: "boatyMcBoatFace@deepgram.com", scope: "member" }],
  });
});

Deno.test("Invitation list Fail", () => {
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
    path: `${apiPath}/${projectId}/invites`,
    replyStatus: 404,
    responseBody: "Failed",
  });
  assertRejects(async () => {
    await invitationTest.list(projectId);
  }, Error);
});

Deno.test("Invitation send", async () => {
  denock({
    method: "POST",
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
    path: `${apiPath}/${projectId}/invites`,
    replyStatus: 201,
    responseBody: {
      message: "Invitation sent",
    },
  });
  const invitationSent = await invitationTest.send(projectId, {
    email: "boatyMcBoatFace@deepgram.com",
    scope: "member",
  });

  assertEquals(invitationSent, { message: "Invitation sent" });
});

Deno.test("Invitation send Fail path", async () => {
  denock({
    method: "POST",
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
    path: `${apiPath}/${projectId}/invites`,
    replyStatus: 404,
    responseBody: "Failed",
  });
  assertRejects(async () => {
    await invitationTest.send(projectId, {
      email: "boatyMcBoatFace@deepgram.com",
      scope: "member",
    });
  }, Error);
});

Deno.test("Invitation leave", async () => {
  denock({
    method: "DELETE",
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
    path: `${apiPath}/${projectId}/leave`,
    replyStatus: 201,
    responseBody: {
      message: "Invitation sent",
    },
  });
  const invitationLeave = await invitationTest.leave(projectId);

  assertEquals(invitationLeave, { message: "Invitation sent" });
});

Deno.test("Invitation leave Fail path", async () => {
  denock({
    method: "DELETE",
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
    path: `${apiPath}/${projectId}/leave`,
    replyStatus: 404,
    responseBody: "Failed",
  });
  assertRejects(async () => {
    await invitationTest.leave(projectId);
  }, Error);
});

Deno.test("Invitation delete", async () => {
  denock({
    method: "DELETE",
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
    path: `${apiPath}/${projectId}/invites/boaty@mcboatface.com`,
    replyStatus: 201,
    responseBody: {
      message: "Invitation sent",
    },
  });
  const invitationDelete = await invitationTest.delete(
    projectId,
    "boaty@mcboatface.com"
  );

  assertEquals(invitationDelete, { message: "Invitation sent" });
});

Deno.test("Invitation leave Fail path", async () => {
  denock({
    method: "DELETE",
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
    path: `${apiPath}/${projectId}/invites/boaty@mcboatface.com`,
    replyStatus: 404,
    responseBody: "Failed",
  });
  assertRejects(async () => {
    await invitationTest.delete(projectId, "boaty@mcboatface.com");
  }, Error);
});
