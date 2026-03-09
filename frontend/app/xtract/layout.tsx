import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'xtract - AI Automation for Business',
  description: 'Transform your business operations with AI-powered automation. Automate repetitive tasks, boost productivity, and scale faster.',
  keywords: ['AI automation', 'business automation', 'workflow automation', 'AI assistant', 'digital transformation'],
};

export default function XtractLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
