/* eslint-disable indent */

{
    const select = {
        templateOf: {
            book: '#template-book',
        },
        listOf: {
            books: '.books-list',
            images: 'book__image',
        },
        atributes: {
            dataId: 'data-id',
        },
        classNames: {
            favorite: 'favorite',
            hidden: 'hidden',
        },
        filters: '.filters',
        ratings: '.book__rating__fill',
    };

    const templates = {
        booksList: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    };

    const favouriteBooks = [];

    const filters = [];


    class BooksList {

        constructor() {

            /*
            this.getElements();
            this.initActions();
            this.initData();
            this.render(this.data);
            */
            this.initData();
            this.getElements();
            this.render(this.data);
            this.initActions();

        }


        initData() {
            this.data = dataSource.books;
        }

        render(listOfBooks) {

            for (let book of listOfBooks) {
                const ratingBgc = this.determineRatingBgc(book.rating);
                const ratingWidth = this.determineRatingWidth(book.rating);
                const HTMLelement = templates.booksList(book);
                const DOMelement = utils.createDOMFromHTML(HTMLelement);
                this.dom.booksList.appendChild(DOMelement);

                const ratingFill = DOMelement.querySelector(select.ratings);
                ratingFill.style.width = ratingWidth;
                ratingFill.style.background = ratingBgc;

            }
        }
        getElements() {
            this.dom = {
                booksList: document.querySelector(select.listOf.books),
                filtersList: document.querySelector(select.filters),
            };
        }


        initActions() {
            const thisActions = this;

            this.dom.booksList.addEventListener('dblclick', function (event) {
                //event.preventDefault();
                const clickedBook = event.target.offsetParent;

                if (clickedBook.classList.contains('book__image')) {
                    const bookId = clickedBook.getAttribute('data-Id');

                    if (favouriteBooks.includes(bookId)) {
                        clickedBook.classList.remove('favorite');
                        favouriteBooks.pop(bookId);
                    } else {
                        clickedBook.classList.add('favorite');
                        favouriteBooks.push(bookId);
                    }
                }
            });



            this.dom.filtersList.addEventListener('click', function (event) {
                const filterClicked = event.target.tagName == 'INPUT' &&
                    event.target.name == 'filter' &&
                    event.target.type == 'checkbox';

                if (filterClicked) {
                    if (event.target.checked) {
                        filters.push(event.target.value);
                    } else {
                        const indexToRemove = filters.indexOf(event.target.value);
                        filters.splice(indexToRemove, 1);
                    }
                }
                thisActions.filterBooks();
            });
        }


        filterBooks() {

            for (let book of dataSource.books) {
                let shouldBeHidden = false;

                for (let singleFilter of filters) {
                    if (!book.details[singleFilter]) {
                        shouldBeHidden = true;
                    }
                }

                const bookToHide = document.querySelector('.' + select.listOf.images + '[' + select.atributes.dataId + '="' + book.id + '"]');
                if (shouldBeHidden) {
                    bookToHide.classList.add(select.classNames.hidden);
                } else {
                    bookToHide.classList.remove(select.classNames.hidden);
                }
            }
        }
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
        determineRatingWidth(rating) {
            return (rating * 10 + '%');
        }
    }



    const app = new BooksList();
    app;
}

