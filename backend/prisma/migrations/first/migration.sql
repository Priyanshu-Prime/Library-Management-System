-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publication" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "issues" (
    "book_id" TEXT NOT NULL,
    "student_id" INTEGER,
    "date_of_issue" DATE NOT NULL,
    "date_of_return" DATE NOT NULL,

    CONSTRAINT "issues_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "student" (
    "roll_no" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("roll_no")
);

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("roll_no") ON DELETE NO ACTION ON UPDATE NO ACTION;