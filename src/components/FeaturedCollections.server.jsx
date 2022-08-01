import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";

export default function FeaturedCollections() {
  const {
    data: { collections },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
  });

  return (
    <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12 bg-section-main">
      <h2 className="whitespace-pre-wrap max-w-full text-text-color-secondary text-4xl text-center font-bold text-lead drop-shadow-2xl shadow-black">
        Collections
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false">
        {collections.nodes.map((collection) => {
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="grid gap-4">
                {collection?.image && (
                  <Image
                    className="rounded-2xl overflow-clip shadow-lg shadow-black  inline-block border-solid border-2 border-background-main aspect-[5/4] md:aspect-[3/2] object-cover"
                    width={"100%"}
                    height={336}
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                  />
                )}
                <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy text-text-color-secondary pl-4">
                  {collection.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const QUERY = gql`
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart", sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
