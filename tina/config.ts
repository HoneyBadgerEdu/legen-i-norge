import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const generalFilling = [
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
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
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
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post_en",
        label: "Posts_English",
        path: "content/en",
        fields: generalFilling,
      },
      {
        name: "post_uk",
        label: "Posts_Ukrainian",
        path: "content/ua",
        fields: generalFilling,
      },
    ],
  },
});
