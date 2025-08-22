export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`space-y-3 ${className}`}>{children}</div>;
}
