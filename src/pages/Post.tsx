// A single blog post. Old links (/blog/:id/:slug) keep working; the id decides which post is shown.
import { ArrowLeft } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { Fragment } from "react";
import { Link, useParams } from "react-router";
import { EditReplay } from "../components/EditReplay";
import { Page } from "../components/Page";
import { StreetOrientations } from "../components/StreetOrientations";
import { postBodies } from "../content/posts";
import { posts } from "../data/posts";
import { useLanguage } from "../i18n/language";
import { formatDate } from "../lib/dates";
import { NotFound } from "./NotFound";
import styles from "./Post.module.css";

export function Post() {
  const { id } = useParams();
  const { lang, t, pick } = useLanguage();
  const post = posts.find((candidate) => String(candidate.id) === id);
  const text = post && postBodies[post.slug];

  if (!post || !text) return <NotFound />;

  // The page header already shows the title, so drop the markdown's own "# Title" line.
  const body = pick(text).replace(/^# .*\n+/, "");

  return (
    <Page
      title={pick(post.title)}
      section={t.blog.title}
      index={5}
      lead={<time dateTime={post.date}>{formatDate(post.date, lang)}</time>}
    >
      <Link to="/blog" className={styles.back}>
        <ArrowLeft size={16} aria-hidden="true" />
        {t.blog.allPosts}
      </Link>
      <article data-panel className={styles.article}>
        <div className={styles.prose}>
          <Markdown
            options={{
              wrapper: Fragment,
              // Code blocks can scroll sideways on phones, so they must be reachable by keyboard.
              overrides: { EditReplay, StreetOrientations, pre: { props: { tabIndex: 0 } } },
            }}
          >
            {body}
          </Markdown>
        </div>
      </article>
    </Page>
  );
}
