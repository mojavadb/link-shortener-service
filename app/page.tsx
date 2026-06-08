import Main from "@/components/Main";

const DOMAIN = "http://localhost:3000";

interface LinkItem {
  id: string;
  mainUrl: string;
  finalCode: string;
  createdAt: number;
  expiresAt: number;
}

async function Home() {
  const response = await fetch(`${DOMAIN}/api/short-links`);
    const data : LinkItem[] = await response.json();
  return(
    <Main data={data} />
  );
}

export default Home;