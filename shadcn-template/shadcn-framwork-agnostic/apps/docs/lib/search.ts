import { create, insert, search, type AnyOrama } from "@orama/orama";

interface SearchDocument {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  headings: string[];
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  slug: string;
  score: number;
}

let db: AnyOrama | null = null;
let dbPromise: Promise<AnyOrama> | null = null;

async function getDatabase(): Promise<AnyOrama> {
  if (db) return db;

  if (dbPromise) return dbPromise;

  dbPromise = (async () => {
    const response = await fetch("/search-index.json");
    const documents: SearchDocument[] = await response.json();

    const database = await create({
      schema: {
        id: "string",
        title: "string",
        description: "string",
        content: "string",
        slug: "string",
        headings: "string[]",
      } as const,
    });

    for (const doc of documents) {
      await insert(database, doc);
    }

    db = database;
    return database;
  })();

  return dbPromise;
}

export async function searchDocs(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];

  const database = await getDatabase();

  const results = await search(database, {
    term: query,
    properties: ["title", "description", "headings"],
    boost: {
      title: 10,
      description: 5,
      headings: 3,
    },
    limit: 10,
    threshold: 0.5,
  });

  return results.hits.map((hit) => ({
    id: hit.document.id as string,
    title: hit.document.title as string,
    description: hit.document.description as string,
    slug: hit.document.slug as string,
    score: hit.score,
  }));
}
