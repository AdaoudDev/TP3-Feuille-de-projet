const variants = {
  primary: 'bg-primary text-cream hover:bg-primary-dark',
  outline: 'border-2 border-primary text-primary-dark hover:bg-primary/10',
}

export default function Button({ variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center min-h-11 px-5 rounded-full font-semibold cursor-pointer disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  )
}
