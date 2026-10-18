// List of blog posts, newest first.
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { CardPreview } from "../components/CardPreview";
import { Page } from "../components/Page";
import { posts } from "../data/posts";
import { useLanguage } from "../i18n/language";
import { formatDate } from "../lib/dates";
import styles from "./Blog.module.css";

export function Blog() {
  const { lang, t, pick } = useLanguage();

  return (
    <Page title={t.blog.title} index={5} lead={t.blog.lead}>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.id} data-panel className={styles.item}>
            <div className={styles.image}>
              <CardPreview kind={post.preview} />
            </div>
            <div className={styles.body}>
              <time dateTime={post.date} className={styles.date}>
                {formatDate(post.date, lang)}
              </time>
              <h2 className={styles.title}>
                <Link to={`/blog/${post.id}/${post.slug}`} className={styles.link}>
                  {pick(post.title)}
                </Link>
              </h2>
              <span className={styles.read} aria-hidden="true">
                {t.blog.read}
                <ArrowRight size={16} />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Page>
  );
}
