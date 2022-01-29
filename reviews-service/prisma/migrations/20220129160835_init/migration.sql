-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "text" VARCHAR(512) NOT NULL,
    "product_id" UUID NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);
