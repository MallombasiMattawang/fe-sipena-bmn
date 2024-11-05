import React from "react";

export default function TableStanding() {
  return (
    <>
      <div className="container mt-4 mb-4">
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className="section-title">
              <h4>
                <i className="fa fa-book"></i>
                <strong style={{ color: "rgb(209 104 0)" }}> Klasemen </strong>
                Liga Ramadhan
              </h4>
            </div>
            <div className="card mb-3 w-100 rounded-3 border-0 shadow-sm">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Tim</th>
                        <th>T</th>
                        <th>M</th>
                        <th>S</th>
                        <th>K</th>
                        <th>Poin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
