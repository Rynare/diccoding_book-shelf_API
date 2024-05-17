import { nanoid } from "nanoid";
// eslint-disable-next-line import/named
import { BookSchema, UpdateBookSchema } from "./BookValidator.js";
// eslint-disable-next-line import/named
import { Books } from "./Books.js";

const BookController = {
  addBook(request, h) {
    const { error } = BookSchema.validate(request.payload);
    if (error) {
      return h.response({
        status: "fail",
        message: error.details[0].message,
      }).code(400);
    }

    const date = new Date();
    const newId = nanoid(16);
    Books.push({
      id: newId,
      updatedAt: date,
      insertedAt: date,
      // finished: !request.payload.reading,
      finished: request.payload.pageCount === request.payload.readPage,
      ...request.payload,
    });
    const isSuccess = Books.filter((book) => book.id === newId).length > 0;

    if (!isSuccess) {
      return h.response({
        status: "fail",
        message: "Gagal menambahkan buku. Terdapat kesalahan pada server",
      }).code(500);
    }

    return h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: newId,
      },
    }).code(201);
  },

  showAll(request, h) {
    const { name, reading, finished } = request.query;
    const queryArr = [name, reading, finished];
    let filteredBooks = null;
    if (queryArr.some((param) => param !== undefined)) {
      filteredBooks = BookController.getBooksByQuery(request, h);
    }
    return h.response({
      status: "success",
      data: {
        books: filteredBooks ? filteredBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })) : Books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    }).code(200);
  },

  showDetail(request, h) {
    const { bookId } = request.params;
    const bookDetail = Books.filter((book) => book.id === bookId);
    const found = bookDetail.length === 1;
    if (found) {
      return h.response({
        status: "success",
        data: {
          book: bookDetail[0],
        },
      }).code(200);
    }
    return h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    }).code(404);
  },

  updateBook(request, h) {
    const { bookId } = request.params;
    const index = Books.findIndex((book) => book.id === bookId);
    const found = index >= 0;
    if (!found) {
      return h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      }).code(404);
    }

    const { error } = UpdateBookSchema.validate(request.payload);
    if (error) {
      return h.response({
        status: "fail",
        message: error.details[0].message,
      }).code(400);
    }

    Books[index] = {
      ...Books[index],
      updatedAt: new Date(),
      ...request.payload,
    };

    return h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    }).code(200);
  },

  deleteBook(request, h) {
    const { bookId } = request.params;

    const index = Books.findIndex((book) => book.id === bookId);
    const found = index >= 0;
    if (!found) {
      return h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      }).code(404);
    }
    Books.splice(index, 1);
    return h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    }).code(200);
  },

  getBooksByQuery(request) {
    const { name, reading, finished } = request.query;
    const isReading = parseInt(reading, 10) === 1;
    const isFinished = parseInt(finished, 10) === 1;

    const filteredBooks = Books.filter((book) => {
      let isValid = true;

      const validRead = isReading === book.reading;
      const validFinish = isFinished === book.finished;

      if (name) {
        isValid = isValid && book.name.toLowerCase().includes(name.toLowerCase());
      }
      if (reading) {
        isValid = isValid && validRead;
      } else if (finished) {
        isValid = isValid && validFinish;
      }
      return isValid;
    });
    return filteredBooks;
  },
};

export { BookController };
