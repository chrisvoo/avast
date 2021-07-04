import React from 'react';
import PropTypes from 'prop-types'; 

interface Image {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

function ImageRow({ images }: { images: Image[] }) {
  const rows: any = [];
  let row: any = [];

  for (let i = 0; i < images.length; i++) {
    const { title, url, id, albumId } = images[i];

    row.push(
      <div id={`${id}_${albumId}`} className="col-md-12 col-lg-6 col-xl-3">
        <div className="card mb-2 bg-gradient-dark">
          <img className="card-img-top" src={url} alt="Placeholder"  />
          <div className="card-img-overlay d-flex flex-column justify-content-end">
            <h5 className="card-title text-white">{`ID: ${id}_${albumId}`}</h5>
            <p className="card-text text-white pb-2 pt-1">{title}</p>
          </div>
        </div>
      </div>
    )

    if (row.length === 3 || i === images.length - 1) {
      rows.push(
        <div className="row" id={i + ''}>{row}</div>
      )
      row = [];
    }
  }

  return (
    <div className="card card-success">
      <div className="card-body">
        {rows}
      </div>
    </div>
  );
}

ImageRow.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      albumId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
}

export default ImageRow;
