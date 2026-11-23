const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 min-h-12 px-6 text-[0.98rem] whitespace-nowrap';

const variants = {
  primary: 'bg-leaf text-white hover:bg-leaf-deep shadow-[0_10px_30px_-12px_rgb(0_156_109/0.7)]',
  ink: 'bg-ink text-white hover:bg-ink-2',
  ghost: 'text-ink ring-1 ring-inset ring-ink/20 hover:ring-ink/45 bg-white/60',
  ghostDark: 'text-white ring-1 ring-inset ring-white/25 hover:ring-white/60',
};

export default function Button({ as: Tag = 'a', variant = 'primary', className = '', children, ...props }) {
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
