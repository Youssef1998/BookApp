import React from "react";
import "./App.css";
import BookList from "./BookList";
import SearchBook from "./SearchBook";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";


class BooksApp extends React.Component {
  state = {
    myBooks: [],
    error: "This shelf is empty",
    fetchingError: undefined,
    isFetchingBooks: true
  };
  componentDidMount() {
    this.fetchMyBooks();
  }
  fetchMyBooks = () => {
    this.setState({
      isFetchingBooks: true
    });
    BooksAPI.getAll()
      .then(books => {
        if (!books.length) {
          this.setState({
            fetchingError: undefined,
            isFetchingBooks: false
          });
        } else {
          this.setState({
            myBooks: books,
            fetchingError: undefined,
            isFetchingBooks: false
          });
        }
      })
      .catch(err => {
        this.setState({
          fetchingError:
            "There was an error loading your books, please check your connection",
          isFetchingBooks: false
        });
      });
  };
  changeBookShelf = (book, shelf) => {
    book.shelf = shelf;
    this.setState(prevState => ({
      myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat([book])
    }));
    BooksAPI.update(book, shelf);
  };
  render() {
    const { myBooks, error, fetchingError, isFetchingBooks } = this.state;
    const { changeBookShelf, fetchMyBooks } = this;
    return (
      <div className="app">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BookList
                fetchingError={fetchingError}
                myBooks={myBooks}
                changeBookShelf={changeBookShelf}
                error={error}
                fetchMyBooks={fetchMyBooks}
                isFetchingBooks={isFetchingBooks}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <SearchBook
                myBooks={myBooks}
                changeBookShelf={changeBookShelf}
              />
            )}
          />
        </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default BooksApp;
