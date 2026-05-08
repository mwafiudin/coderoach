import { PostCard } from './archive/PostCard';
import { SectionHead } from './SectionHead';

type Post = any;

export function HomeNotes({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) return null;
  return (
    <section id="notes" className="py-[120px] relative">
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <SectionHead
            marker="[ 06 / 07 ]"
            category="Field Notes"
            heading="Latest from the studio."
            lede="Engineering, operating, and the bits in between."
          />
          <a
            href="/notes"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-electric hover:underline self-start lg:self-auto whitespace-nowrap"
          >
            View all notes →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {posts.slice(0, 3).map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
