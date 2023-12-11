interface blog extends blogData { id: string; }

interface blogData extends generatedPart {
  createdAt: Date;
  publishedAt: Date;
  publiclyAvailable: boolean;
}

interface generatedPart {
  title: string;
  body: string;
}
