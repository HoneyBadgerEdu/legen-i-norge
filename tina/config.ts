import { defineConfig, TinaField } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const generalFilling: TinaField<false>[] = [
  {
    type: "string",
    name: "title",
    label: "Title",
  },
  {
    type: "string",
    name: "date",
    label: "Date of creation",
    description: "Example: 05 Jan 2024",
  },
  {
    type: "string",
    name: "lastmod",
    label: "Date of last review of article",
    description: "Example: 05 Jan 2024",
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
