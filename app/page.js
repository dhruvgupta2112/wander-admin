import RedirectIfAuthenticated from './components/RedirectIfAuthenticated'; // Adjust path as needed

export default function Home() {
  return (
    <RedirectIfAuthenticated />
  );
}
