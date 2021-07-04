import React, { useEffect } from 'react';
import ImageCard from '../ImageCard';
import useAxios from 'axios-hooks'
import Loading from '../Loading';

interface Window {
  $: (params: any) => any
}

// jquery tooltips
const { $ } = window as unknown as Window;


function Album({ setTitle }: { setTitle: (title: string) => void}) {
  useEffect(() => {
    setTitle('Viewing album 1');
    $('[data-toggle="tooltip"]').tooltip();
  }, []);

  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.REACT_APP_API_ENDPOINT}/photoes/album/1`
  )

  if (loading) {
    return <Loading />;
  }

  if (error) return <p>{error.toString()}</p>;

  return (
    <div className="container-fluid">
      <div className="row">
        <ImageCard images={data} />
      </div>
    </div>
  );
}

export default Album;