import { defineConfig } from "@shopify/hydrogen/config";

export default defineConfig({
  shopify: {
    storeDomain: "gcstarter.myshopify.com",
    storefrontToken: "e8f33a51422e0bb2292b159214e954ff",
    storefrontApiVersion: "2022-07",
  },
  logger: {
    showQueryTiming: true,
    /* Logs warnings in your app if you're over-fetching data from the Storefront API.
     * This is an experimental feature. As a result, functionality is subject to change.
     * You can provide feedback on this feature by submitting an issue in GitHub:
     * https://github.com/Shopify/hydrogen/issues. */
  },
});
