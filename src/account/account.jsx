import React from 'react';
import './account.css';

export function Account() {
  return (
    <main className="container">
      <div className="col-lg-4">
          <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
          <h2 className="fw-normal">@Username</h2>
      </div>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h4 className="border-bottom pb-2 mb-0">Your Current Rankings:</h4>
          <div className="d-flex text-body-secondary pt-3">
              <img src="RankOne1.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                  <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">Movie Title</strong>                      
                  </div>
                  <span className="d-block">Rating:</span>
              </div>
          </div>               
          <div className="d-flex text-body-secondary pt-3">
              <img src="RankTwo.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                  <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">Movie Title</strong>                        
                  </div>
                  <span className="d-block">Rating:</span>
              </div>
          </div>
          <div className="d-flex text-body-secondary pt-3">
              <img src="RankThree.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                  <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">Movie Title</strong>
                  </div>
                  <span className="d-block">Rating:</span>
              </div>
          </div>
      </div>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
          <h4 className="border-bottom pb-2 mb-0">Update Rankings:</h4>
          <div className="d-flex text-body-secondary pt-3">
              <img src="RankOne1.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="20" height="20"/>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                  <div className="d-flex justify-content-between">
                      <div className="input-group input-group-sm mb-3">
                          <span className="input-group-text" id="inputGroup-sizing-sm">Movie</span>
                          <input type="text" className="form-control" aria-label="Movie Title Input" aria-describedby="inputGroup-sizing-sm"/>
                      </div>
                  </div>
                  {/* <div>
                      <label for="range">Rating: </label>
                      <input type="range" name="varRange" id="range" min="0" max="10" step="1" value="0" />
                      <output id="rangeOutput" for="range">0</output>
                  </div> */}
              </div>
              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk" max-width= "40px" margin= '0 auto' max-height='40px' >Update</button>
          </div>               
          <div className="d-flex text-body-secondary pt-3">
              <img src="RankTwo.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="20" height="20"/>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                  <div className="d-flex justify-content-between">
                      <div className="input-group input-group-sm mb-3">
                          <span className="input-group-text" id="inputGroup-sizing-sm">Movie</span>
                          <input type="text" className="form-control" aria-label="Movie Title Input" aria-describedby="inputGroup-sizing-sm"/>
                      </div>
                  </div>
                  {/* <div>
                      <label for="range">Rating: </label>
                      <input type="range" name="varRange" id="range" min="0" max="10" step="1" value="0" />
                      <output id="rangeOutput" for="range">0</output>
                  </div> */}
              </div>
              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk" max-width= "100px" margin= '0 auto' max-height='40px'>Update</button>
          </div>
          <div className="d-flex text-body-secondary pt-3">
              <img src="RankThree.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="20" height="20"/>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                  <div className="d-flex justify-content-between">
                      <div className="input-group input-group-sm mb-3">
                          <span className="input-group-text" id="inputGroup-sizing-sm">Movie</span>
                          <input type="text" className="form-control" aria-label="Movie Title Input" aria-describedby="inputGroup-sizing-sm"/>
                      </div>
                  </div>
                  {/* <div>
                      <label for="range">Rating: </label>
                      <input type="range" name="varRange" id="range" min="0" max="10" step="1" value="0" />
                      <output id="rangeOutput" for="range">0</output>
                  </div> */}
              </div>
              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk" max-width= "100px" margin= '0 auto' max-height='40px'>Update</button>
          </div>
      </div>
    </main>
  );
}