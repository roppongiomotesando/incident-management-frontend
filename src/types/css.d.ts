declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// This allows Tailwind directives to be used in CSS files
declare module 'tailwindcss/tailwind.css';
