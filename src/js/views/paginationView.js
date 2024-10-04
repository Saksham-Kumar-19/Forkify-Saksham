import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if(!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //   Page 1, there are some other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupBtn('next', currPage);
    }

    //  Last Page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupBtn('prev', currPage);
    }

    // Other Page
    if (currPage < numPages) {
      return `${this._generateMarkupBtn(
        'prev',
        currPage
      )}, ${this._generateMarkupBtn('next', currPage)}`;
    }

    // Page 1, and there is No other pages
    return '';
  }

  _generateMarkupBtn(btn, currentPage) {
    return `
        <button data-goto="${
          btn === 'next' ? currentPage + 1 : currentPage - 1
        }" class="btn--inline pagination__btn--${btn}">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${
      btn === 'next' ? 'right' : 'left'
    }"></use>
          </svg>
          <span>Page ${
            btn === 'next' ? currentPage + 1 : currentPage - 1
          }</span>
        </button>  
    `;
  }
}

export default new PaginationView();
