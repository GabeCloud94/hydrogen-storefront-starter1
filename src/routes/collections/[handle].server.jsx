import {
  gql,
  useRouteParams,
  useShopQuery,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from "@shopify/hydrogen";
import { Suspense } from "react";
import ProductCard from "../../components/ProductCard.server";
import { Layout } from "../../components/Layout.server";

export default function Collection() {
  const { handle } = useRouteParams();

  const {
    data: { collection },
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
    },
  });

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: collection.id,
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="collection" data={collection} />
      </Suspense>
      <header className="grid w-full gap-8 p-4 py-8 md:p-8 lg:p-12 justify-items-start bg-background-main">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block text-text-color-main">
          {collection.title}
        </h1>

        {collection.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inherit text-copy text-text-color-main inline-block">
                {collection.description}
              </p>
            </div>
          </div>
        )}
      </header>

      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12 bg-background-main">
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Suspense fallback="Loading...">
            {collection.products.nodes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Suspense>
        </div>
      </section>
    </Layout>
  );
}

const QUERY = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: 50) {
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
                width
                height
              }
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;
