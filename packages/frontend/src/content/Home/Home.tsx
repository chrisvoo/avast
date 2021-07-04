import React, { useEffect } from 'react';
import ImageCard from '../ImageCard';
import useAxios from 'axios-hooks'
import Loading from '../Loading';

interface Window {
  $: (params: any) => any
}

// jquery tooltips
const { $ } = window as unknown as Window;


function Home({ setTitle }: { setTitle: (title: string) => void}) {
  useEffect(() => {
    setTitle('Home');
    $('[data-toggle="tooltip"]').tooltip();
  }, []);

  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.REACT_APP_API_ENDPOINT}/photoes`
  )

  if (loading) {
    return <Loading />;
  }

  if (error) return <p>{error.toString()}</p>;

  const { data: images } = data;

  return (
    <div className="container-fluid">
      <div className="row">
        <ImageCard images={images} />
      </div>
    </div>
  );
}

export default Home;
