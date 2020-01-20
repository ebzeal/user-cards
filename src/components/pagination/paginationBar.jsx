import React from 'react';
import {withRouter, Link} from 'react-router-dom';


const PaginationBar = ({filteredCountries, getPageNumbers, showPrevPage, showNextPage, location}) => {
  
  const searchUrl = location.search;
  const pageLoad = parseInt((searchUrl.split('='))[1]);
   return (
      <div>
         <p></p>
       { pageLoad === 1 ? '' : (<i
         className="fa fa-arrow-left"
         aria-hidden="true" >
         <Link to={`?page=${pageLoad - 1}`} >
         Prev
         </Link>
         </i>)
      }
         {getPageNumbers(filteredCountries.length)}

         <i
         className="fa fa-arrow-right"
         aria-hidden="true"
         >
            <Link to={`?page=${pageLoad + 1}`} >
               Next
            </Link></i>
      </div>
    )
}

export default withRouter(PaginationBar);