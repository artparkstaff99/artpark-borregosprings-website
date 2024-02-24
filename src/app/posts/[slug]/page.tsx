// src/app/posts/[slug]/page.tsx
import { DocumentRenderer } from "@keystatic/core/renderer";
import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "../../../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await reader.collections.posts.read(params.slug);
  return post ? (
    <>
      <h1>{post.title}</h1>
      <DocumentRenderer document={await post.content()} />
      <hr />
      <a href={`/posts`}>Back to Posts</a>
    </>
  ) : (
    <div>No Post Found</div>
  );
}
