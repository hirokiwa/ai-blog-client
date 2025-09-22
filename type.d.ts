interface Window {
  adsbygoogle?: unknown[];
}

interface blog extends blogData { id: string; }

interface blogData extends generatedPart {
  publishedAt: Date;
}

interface generatedPart {
  title: string;
  body: string;
}
