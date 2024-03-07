export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/', // The destination URL
      permanent: false, // Temporary redirect (set to true for a permanent redirect). may want to change this later
    },
  };
}

export default function HomePage() {
  // This component will not be rendered due to the redirect
  return <div>Redirecting...</div>;
}
