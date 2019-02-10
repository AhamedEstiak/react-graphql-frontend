import Link from "next/link";

const Home = props => (
  <div>
    <p>Home page</p>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
  </div>
);

export default Home;
