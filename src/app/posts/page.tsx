import { createReader } from "@keystatic/core/reader";
// import keystaticConfig from '../../keystatic.config';
import keystaticConfig from "../../../keystatic.config";

import Link from "next/link";
import styles from "@/app/page.module.css";

// 1. Create a reader
const reader = createReader(process.cwd(), keystaticConfig);

export default async function Page() {
  // 2. Read the "Posts" collection
  const posts = await reader.collections.posts.all();
  return (
    <main className={styles.main}>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.entry.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
