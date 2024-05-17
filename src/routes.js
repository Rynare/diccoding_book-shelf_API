// eslint-disable-next-line import/named
import { BookController } from "./BookController.js";

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: BookController.addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: BookController.showAll,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: BookController.showDetail,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: BookController.updateBook,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: BookController.deleteBook,
  },
];

export { routes };
