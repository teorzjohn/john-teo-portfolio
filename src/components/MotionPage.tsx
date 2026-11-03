type MotionPageProps = {
  children: React.ReactNode;
  className?: string;
};

export function MotionPage({ children, className }: MotionPageProps) {
  return <main className={className}>{children}</main>;
}
