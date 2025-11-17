import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { reportMeta, reportSections } from "@/lib/reportContent";

const stats = [
  { label: "متوسط التضخم العالمي 2024", value: "6.8%" },
  { label: "مستوى التأثير على الأسر", value: "مرتفع" },
  { label: "عدد السياسات المقترحة", value: "4 محاور" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.label}>بحث اقتصادي منظم</span>
          <h1>{reportMeta.title}</h1>
          <p>{reportMeta.subtitle}</p>
          <div className={styles.meta}>
            <span>{reportMeta.author}</span>
            <span>{reportMeta.published}</span>
          </div>
          <div className={styles.actions}>
            <Link href="/api/report" className={styles.primaryButton}>
              تنزيل نسخة PDF
            </Link>
            <a href="#sections" className={styles.secondaryButton}>
              استعراض محتوى البحث
            </a>
          </div>
        </div>
        <div className={styles.heroCard}>
          <div className={styles.heroCardHeader}>
            <span>مؤشرات مختصرة</span>
          </div>
          <div className={styles.heroCardBody}>
            {stats.map((item) => (
              <div key={item.label} className={styles.statItem}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main id="sections" className={styles.sections}>
        {reportSections.map((section) => (
          <article key={section.id} className={styles.sectionCard}>
            <div className={styles.sectionContent}>
              <h2>{section.title}</h2>
              <p className={styles.sectionSummary}>{section.summary}</p>
              <ul>
                {section.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
            <figure className={styles.sectionFigure}>
              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={480}
                height={360}
                className={styles.sectionImage}
              />
              <figcaption>{section.image.caption}</figcaption>
            </figure>
          </article>
        ))}
      </main>

      <section className={styles.conclusion}>
        <div className={styles.conclusionCard}>
          <h3>الخلاصة</h3>
          <p>
            يتطلب التعامل مع التضخم فهمًا دقيقًا لطبيعته ومصادره، وتنسيقًا فعالًا
            بين أدوات السياسة النقدية والمالية. إن تعزيز الإنتاجية، وتحسين
            مرونة الاقتصاد، والاستثمار في رأس المال البشري تمثل ركائز أساسية
            لتحقيق الاستقرار السعري المستدام.
          </p>
          <Link href="/api/report" className={styles.primaryButton}>
            تحميل البحث كاملاً PDF
          </Link>
        </div>
      </section>
    </div>
  );
}
