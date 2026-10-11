import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

const copy = {
  en: {
    preview: (app: string) =>
      `Your ${app} account is ready. Here is how to get PhotoCraft.`,
    heading: (app: string) => `Welcome to ${app}`,
    greeting: (name?: string) => (name ? `Hi ${name},` : 'Hi there,'),
    intro:
      'Thanks for joining. PhotoCraft is the free, open-source image editor from ArtCraft, and this site helps you download it, install it and see how it compares with Photoshop.',
    stepsTitle: 'Get started in three steps',
    steps: [
      'Download the build for your Mac, Windows or Linux machine.',
      'Follow the install guide, about two minutes on any system.',
      'Open a PSD and start editing with the tools you already know.',
    ],
    cta: 'Download PhotoCraft',
    footer: (app: string) =>
      `You're receiving this email because you created an account on ${app}.`,
  },
  zh: {
    preview: (app: string) => `你的 ${app} 账号已就绪，来获取 PhotoCraft 吧`,
    heading: (app: string) => `欢迎来到 ${app}`,
    greeting: (name?: string) => (name ? `${name}，你好：` : '你好：'),
    intro:
      '感谢注册。PhotoCraft 是 ArtCraft 推出的免费开源图像编辑器，本站帮你下载、安装它，并了解它与 Photoshop 的区别。',
    stepsTitle: '三步开始',
    steps: [
      '下载适合你 Mac、Windows 或 Linux 电脑的版本。',
      '按照安装指南操作，任何系统都只需两分钟左右。',
      '打开一个 PSD，用你熟悉的工具开始编辑。',
    ],
    cta: '下载 PhotoCraft',
    footer: (app: string) => `你收到这封邮件，是因为你在 ${app} 注册了账号。`,
  },
};

export function WelcomeEmail({
  appName = 'our app',
  logoUrl,
  url,
  name,
  locale = 'en',
}: {
  appName?: string;
  logoUrl?: string;
  /** Where the main button goes (the download page). */
  url: string;
  name?: string;
  /** Kept for API compatibility with the auth hook; not shown. */
  credits?: number;
  locale?: string;
}) {
  const t = locale.startsWith('zh') ? copy.zh : copy.en;
  return (
    <Html>
      <Head />
      <Preview>{t.preview(appName)}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.card}>
            <Section style={styles.accentBar} />
            <Section style={styles.brandRow}>
              {logoUrl ? (
                <Img
                  src={logoUrl}
                  width="40"
                  height="40"
                  alt={appName}
                  style={styles.cardLogo}
                />
              ) : null}
              <Text style={styles.cardBrand}>{appName}</Text>
            </Section>
            <Heading style={styles.h1}>{t.heading(appName)}</Heading>
            <Text style={styles.p}>{t.greeting(name)}</Text>
            <Text style={styles.p}>{t.intro}</Text>

            <Text style={styles.stepsTitle}>{t.stepsTitle}</Text>
            {t.steps.map((step, i) => (
              <Text key={i} style={styles.step}>
                <span style={styles.stepNum}>{i + 1}</span>
                {step}
              </Text>
            ))}

            <Section style={styles.buttonWrap}>
              <Button href={url} style={styles.button}>
                {t.cta}
              </Button>
            </Section>

            <Hr style={styles.hr} />

            <Text style={styles.footer}>{t.footer(appName)}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '#f6f9fc',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Helvetica,Arial,sans-serif',
    color: '#0f172a',
  },
  container: {
    maxWidth: 560,
    margin: '0 auto',
    padding: '32px 16px 40px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: '28px 24px',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    boxShadow:
      '0 20px 50px rgba(2, 6, 23, 0.10), 0 2px 8px rgba(2, 6, 23, 0.05)',
  },
  accentBar: {
    height: 6,
    borderRadius: 999,
    marginBottom: 18,
    background:
      'linear-gradient(90deg, #00a3e0 0 12.5%, #d6007e 12.5% 25%, #ffd400 25% 37.5%, #26272b 37.5% 50%, #e0412f 50% 62.5%, #2fa84f 62.5% 75%, #2459d6 75% 87.5%, #777779 87.5% 100%)',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  cardLogo: {
    borderRadius: 10,
    border: '1px solid rgba(15, 23, 42, 0.10)',
    backgroundColor: 'rgba(15, 23, 42, 0.03)',
  },
  cardBrand: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: '18px',
    fontWeight: 600,
    color: '#0f172a',
    letterSpacing: '-0.01em',
  },
  h1: {
    margin: '0 0 14px',
    fontSize: 24,
    lineHeight: '30px',
    fontWeight: 700,
    letterSpacing: '-0.01em',
  },
  p: {
    margin: '0 0 12px',
    fontSize: 14,
    lineHeight: '22px',
    color: '#334155',
  },
  buttonWrap: {
    textAlign: 'center',
    margin: '20px 0 14px',
  },
  button: {
    backgroundColor: '#d63a28',
    borderRadius: 12,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    padding: '12px 18px',
    display: 'inline-block',
  },
  stepsTitle: {
    margin: '20px 0 8px',
    fontSize: 13,
    lineHeight: '18px',
    fontWeight: 700,
    color: '#0f172a',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  step: {
    margin: '0 0 8px',
    fontSize: 14,
    lineHeight: '22px',
    color: '#334155',
  },
  stepNum: {
    display: 'inline-block',
    width: 22,
    height: 22,
    marginRight: 10,
    borderRadius: 999,
    backgroundColor: '#d63a28',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 700,
    lineHeight: '22px',
    textAlign: 'center',
  },
  hr: {
    borderColor: 'rgba(15, 23, 42, 0.08)',
    margin: '18px 0',
  },
  footer: {
    margin: 0,
    fontSize: 12,
    lineHeight: '18px',
    color: '#94a3b8',
  },
};
