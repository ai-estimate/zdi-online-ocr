import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@views/Home').then(({Home}) => Home), {
  ssr: false,
});

const HomePage = () => {
  return <Home />;
};

export default HomePage;
