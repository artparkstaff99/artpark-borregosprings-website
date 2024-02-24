import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <a href="/posts"><h1>Click for Posts</h1></a>
    </main>
  );
}
