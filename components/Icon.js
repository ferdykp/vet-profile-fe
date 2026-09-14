const paths = {
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  search: 'M21 21l-4.5-4.5M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0',
  menu: 'M4 6h16M4 12h16M4 18h16', close: 'M6 6l12 12M6 18L18 6',
  arrow: 'M4 12h16m-6-6 6 6-6 6', external: 'M7 17 17 7M7 7h10v10',
  book: 'M12 6v15M3 3h5a4 4 0 0 1 4 3 4 4 0 0 1 4-3h5v16h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3z',
  check: 'm5 12 4 4L19 6', mail: 'M3 5h18v14H3zM3 5l9 7 9-7',
  leaf: 'M20 4C10 2 3 7 5 15s15 6 15-11ZM5 21 15 11',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12M8 14l-2 7 6-3 6 3-2-7',
  image: 'M3 3h18v18H3zM3 16l5-5 4 4 3-3 6 6M16 7h.01',
};
export default function Icon({ name = 'arrow', className = 'size-5', ...props }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={`inline-block shrink-0 align-middle ${className}`} {...props}><path d={paths[name] || paths.arrow} /></svg>;
}
