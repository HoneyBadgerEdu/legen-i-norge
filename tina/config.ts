import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";
const postFields = [
  {
    type: "string",
    name: "title",
    label: "Title",
  },
  {
    type: "datetime",
    name: "date",
    label: "Date of creation",
  },
  {
    type: "datetime",
    name: "lastmod",
    label: "Date of last review of article",
  },
  {
    type: "string",
    name: "Summary",
    label: "What is article about",
    ui: {
      component: "textarea",
    },
  },
  {
    name: "draft",
    label: "Draft",
    type: "boolean",
    required: true,
    description: "If this is checked the post will not be published",
  },
  {
    type: "rich-text",
    name: "body",
    label: "Body",
    isBody: true,
  },
];
export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post-uk",
        label: "Posts-Ukrainian",
        path: "content/uk",
        fields: [...postFields],
      },
      {
        name: "post-en",
        label: "Posts-English",
        path: "content/en",
        fields: [...postFields],
      },
    ],
  },
});
