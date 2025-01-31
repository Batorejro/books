/* eslint-disable indent */

{


    const templates = {
        bookProduct: Handlebars.compile(document.querySelector('#template-book').innerHTML),

    };
    const favoriteBooks = [];
    const filters = [];


    class BooksList {
        constructor() {
            this.initData();
            this.getElements();


            this.render();
            this.initActions();

            /*normalnie powino być: 
            this.getElements();
            this.initActions();
            this.initData();
            this.render();
            */


        }

        initData() {
            this.data = dataSource.books;
        }

        render() {

            for (let book of this.data) {

                const ratingBgc = this.determineRatingBgc(book.rating);
                const ratingWidth = book.rating * 10;

                book.ratingBgc = ratingBgc;
                book.ratingWidth = ratingWidth;

                const generatedHTML = templates.bookProduct(book);

                this.element = utils.createDOMFromHTML(generatedHTML);

                //this.bookList.appendChild(this.element);
                this.bookList.appendChild(this.element);

            }

        }

        getElements() {
            this.bookList = document.querySelector('.books-list');
            this.filtersForms = document.querySelectorAll('.filters form label input');

        }


        initActions() {
            const thisActions = this;

            this.bookList.addEventListener('dblclick', function (event) {

                if (!event.target.offsetParent.classList.contains('favorite')) {
                    event.preventDefault();
                    event.target.offsetParent.classList.add('favorite');
                    const bookId = event.target.offsetParent.getAttribute('data-id');

                    favoriteBooks.push(bookId);
                } else if (event.target.offsetParent.classList.contains('favorite')) {

                    const bookId = event.target.offsetParent.getAttribute('data-id');
                    event.target.offsetParent.classList.remove('favorite');
                    favoriteBooks.pop(bookId);
                }

            });

            this.filtersForm.addEventListener('click', function (event) {
                event.preventDefault();// dodano event prevent
                //doprecyzowałem filtrowanie
                const filters = event.target.tagName == 'INPUT' &&
                    event.target.name == 'filter' &&
                    event.target.type == 'checkbox';

                if (filters) {
                    if (event.target.checked) {
                        //event.preventDefault();
                        //event.target.value.add('adults');
                        filters.push(event.target.value);
                    }
                    else {
                        const indexToRemove = filters.indexOf(event.target.value);
                        filters.splice(indexToRemove, 1);
                    }
                }

                thisActions.filterBooks();
            });

        }
        //wersja alternatywna z modułu przy innej kolejnosci w konstruktorze:
        /* 
        
        for(let filtersForm of this.filtersForms){
        filtersForm.addEventListener('click', function(event){
          
          
          if(event.target.checked){
            
            filters.push(event.target.value);
          }
          else{
            filters.splice(filters.indexOf(event.target.value));
          }
        */



        //filtrowanie zrobione wg modułu
        filterBooks() {

            for (let book of this.data) {

                let shouldBeHidden = false;
                for (const filter of filters) {
                    if (!book.details[filter]) {
                        shouldBeHidden = true;
                        break;
                    }
                }
                if (shouldBeHidden) {

                    const hide = document.querySelector('.book__image[data-id="' + book.id + '"]');
                    hide.classList.add('hidden');

                } else if (!shouldBeHidden) {

                    const uncover = document.querySelector('.book__image[data-id="' + book.id + '"]');
                    uncover.classList.remove('hidden');

                }
            }
        }



        /////pasek czytalności
        determineRatingBgc(rating) {

            let background = '';


            if (rating < 6) {

                background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';

            }
            else if (rating > 6 && rating <= 8) {

                background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';

            }
            else if (rating > 8 && rating <= 9) {

                background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';

            }
            else if (rating > 9) {

                background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';

            }
            console.log('tło', background);


            return background;
        }
    }
    const app = new BooksList();
    app;
}

