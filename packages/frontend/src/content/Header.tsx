import React from 'react';
import PropTypes from 'prop-types';

function Header({ title }: { title: string}) {
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
