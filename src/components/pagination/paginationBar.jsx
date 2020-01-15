import React from 'react';

const PaginationBar = ({filteredCountries, getPageNumbers, showPrevPage, showNextPage}) => {
   return (
      <div>
         <p></p>
         <i
         class="fa fa-arrow-left"
         aria-hidden="true"
         onClick={showPrevPage}
         ></i>
         {getPageNumbers(filteredCountries.length)}

         <i
         class="fa fa-arrow-right"
         aria-hidden="true"
         onClick={showNextPage}
         ></i>
      </div>
    )
}

export default PaginationBar;