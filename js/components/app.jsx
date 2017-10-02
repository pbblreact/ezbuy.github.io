import React from 'react';
import { Link } from 'react-router';
import SearchByUrl from './search_by_url';
import Results from './results';

const App = ({ children }) => (
  <div>
    <header>
    </header>
    <main>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <SearchByUrl />
          </div>
          <div className="col-md-6">
            <Results />
          </div>
          {children}
        </div>
      </div>
    </main>
  </div>
);

export default App;
