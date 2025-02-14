import React from 'react';
import './saved.css';

export function Saved() {
  return (
    <main className="container">
      {/* <iframe src="https://www.google.com/search?q=your+search+term" 
                  width="560px" height="400px" style="border:none;">
      </iframe> */}
      <div>
          <h4 className="fst-italic"></h4>
          <ul className="list-unstyled">
            <li className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 text-decoration-none border-top">
              <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
              <div className="col-lg-8">
                  <h1 className="mb-0">Movie Title</h1>
              </div>
              <button className="btn btn-primary rounded-pill px-3" type="button">watched</button>
            </li>
            <li className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 text-decoration-none border-top">
              <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
              <div className="col-lg-8">
                  <h1 className="mb-0">Movie Title</h1>
              </div>
              <button className="btn btn-primary rounded-pill px-3" type="button">watched</button>
            </li>
            <li className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 text-decoration-none border-top">
              <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
              <div className="col-lg-8">
                  <h1 className="mb-0">Movie Title</h1>
              </div>
              <button className="btn btn-primary rounded-pill px-3" type="button">watched</button>
            </li>
            <li className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 text-decoration-none border-top">
              <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
              <div className="col-lg-8">
                  <h1 className="mb-0">Movie Title</h1>
              </div>
              <button className="btn btn-primary rounded-pill px-3" type="button">watched</button>
            </li>
            <li className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 text-decoration-none border-top">
              <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
              <div className="col-lg-8">
                  <h1 className="mb-0">Movie Title</h1>
              </div>
              <button className="btn btn-primary rounded-pill px-3" type="button">watched</button>
            </li>
          </ul>
        </div>
    </main>
  );
}
