import Joi from "@hapi/joi";

const BookSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Gagal menambahkan buku. Mohon isi nama buku",
  }),
  year: Joi.number().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().required(),
  readPage: Joi.number().required().max(Joi.ref("pageCount")).messages({
    "number.max": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
  }),
  reading: Joi.boolean().required(),
});

const UpdateBookSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Gagal memperbarui buku. Mohon isi nama buku",
  }),
  year: Joi.number().required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().required(),
  readPage: Joi.number().required().max(Joi.ref("pageCount")).messages({
    "number.max": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
  }),
  reading: Joi.boolean().required(),
});

export { BookSchema, UpdateBookSchema };
