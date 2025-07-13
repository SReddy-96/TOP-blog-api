import styles from './index.module.css'
import button from '../../assets/styles/button.module.css'

export default function Index() {
  const features = [
    {
      icon: "{ }",
      title: "RESTful API",
      description:
        "Clean, well-documented REST endpoints for all blog operations",
    },
    {
      icon: "💾",
      title: "Database Integration",
      description: "Efficient data management with robust database operations",
    },
    {
      icon: "⚡",
      title: "Fast & Scalable",
      description: "Optimized performance for handling high traffic loads",
    },
    {
      icon: "🌐",
      title: "Cross-Platform",
      description:
        "Works seamlessly across web, mobile, and desktop applications",
    },
  ];

  return (
    <div className={styles.container}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Powerful Blog API</h2>
          <p className={styles.heroDescription}>
            A modern, scalable REST API for managing blog content. Built with
            performance and developer experience in mind.
          </p>
          <div className={styles.buttonGroup}>
            <button className={button.primaryButton}>
              <span>Get Started</span>
              <span>→</span>
            </button>
            <button className={button.secondaryButton}>
              <span>📁</span>
              <span>View on GitHub</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresContent}>
          <h3 className={styles.featuresTitle}>Why Choose Our Blog API?</h3>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <span style={{ fontSize: "1.5rem" }}>{feature.icon}</span>
                </div>
                <h4 className={styles.featureTitle}>{feature.title}</h4>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h3 className={styles.ctaTitle}>Ready to Build Amazing Blogs?</h3>
          <p className={styles.ctaDescription}>
            Start using our API today and focus on what matters most - creating
            great content.
          </p>
          <button className={styles.ctaButton}>Start Building Now</button>
        </div>
      </section>
    </div>
  );
}
