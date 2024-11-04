const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const getAllBooks = async() => {
    try {
        const allBooks = await prisma.book.findMany();
        return allBooks;
    }
    catch(err) {
        console.log("Error in getAllBooks in book.js");
        console.log(err.stack);
        throw err;
    }
}

// const filterBooks = async(req, res) => {
//     try {
//         const {author, genre, subject, sortOrder} = req.query;
//         const filters = {};
//         if (author) filters.author = author;
//         if (genre) filters.genre = genre;
//         if (subject) filters.subject = subject;

//         const books = await prisma.book.findMany(
//             {
//                 where: filters,
//                 orderBy:
//                 {
//                     title: sortOrder === 'asc' ? 'asc' : 'desc',
//                 }
//             }
//         );
//         return books;
//     }
//     catch(err)
//     {
//         console.error("Error in fetching the books: ", error);
//         res.status(500).json({error: 'Failed in fetching the books in filterBooks in book.js'});
//     }
// };

const getBookByID = async(id) => {
    try {
        const bookByID = await prisma.book.findUnique({
            where: {
                id: ids
            }
        });
        return bookByID;
    }
    catch(err) {
        console.log("Error in getBookByID in book.js", err);
        console.log(err.stack);
        throw err;
    }
};

const addBook = async(id, name, author, image) => {
    try {
        const newBook = await prisma.book.create({
            data: {
                id: id,
                name: name,
                author: author,
                image: image
            }
        });
        return newBook;
    }
    catch(err) {
        console.log("Error in addBook in book.js");
        console.log(err.stack);
        throw err;
    }
};

const updateBook = async(id, name, author, image, old) => {
    console.log(`${old} ${id} ${name} ${author} ${image}`);
    try {
        const updatedBook = await prisma.book.update({
            where: {
                id: old
            },
            data: {
                id: id,
                name: name,
                author: author,
                image: image
            }
        });
        console.log("Updated book details successfully");
        return updatedBook;
    }
    catch(err) {
        console.log("Error in updateBook in book.js");
        console.log(err.stack);
        throw err;
    }
};

const deleteBook = async(id) => {
    try {
        const deletedBook = await prisma.book.delete({
            where: {
                id: id
            }
        });
        console.log("Book deleted");
        return deletedBook;
    }
    catch(err) {    
        console.log("Error in deleteBook in book.js");
        console.log(err.stack);
        throw err;
    }
}

const filterBooks = async(searchText) =>{
    try {
        const filteredRecords =  await prisma.book.findMany({
            where: {
                OR: [
                    
                    { name: {
                            contains: searchText,
                            mode: 'insensitive',
                        },
                    },
                    {    author: {
                            contains: searchText,
                            mode: 'insensitive',
                        },
                    },
                    {
<<<<<<< HEAD
                        name: {
                            contains: searchText,
                            mode: 'insensitive',
                        },
                    },
                    {
                        author: {
                            contains: searchText,
                            mode: 'insensitive',
                        },
                    },
                    {
=======
>>>>>>> main
                        publication: {
                            contains: searchText,
                            mode: 'insensitive',
                        },
                    },
<<<<<<< HEAD
                    {
=======
                    { 
>>>>>>> main
                        subject: {
                            contains: searchText,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });
        return filteredRecords;
    }
    catch(err) {
        console.log("Error in filtering books in books.js");
        console.log(err.stack);
        throw err;
    }
}

module.exports = {getAllBooks, getBookByID, addBook, updateBook, deleteBook,filterBooks};