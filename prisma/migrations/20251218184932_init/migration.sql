-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone_number" TEXT NOT NULL,
    "whatsapp_number" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'seller',
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "trust_score" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "plots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seller_id" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ta" TEXT,
    "description_en" TEXT,
    "description_ta" TEXT,
    "category" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "taluk" TEXT NOT NULL DEFAULT 'Cheyyar',
    "district" TEXT NOT NULL DEFAULT 'Tiruvannamalai',
    "state" TEXT NOT NULL DEFAULT 'Tamil Nadu',
    "survey_number" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "size_sqft" INTEGER NOT NULL,
    "size_cents" REAL,
    "total_price" INTEGER NOT NULL,
    "price_per_sqft" INTEGER,
    "is_negotiable" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "verification_status" TEXT NOT NULL DEFAULT 'pending',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "amenities" JSONB NOT NULL DEFAULT [],
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "inquiry_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "published_at" DATETIME,
    CONSTRAINT "plots_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "plot_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plot_id" TEXT NOT NULL,
    "cloudinary_url" TEXT NOT NULL,
    "cloudinary_public_id" TEXT NOT NULL,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "plot_images_plot_id_fkey" FOREIGN KEY ("plot_id") REFERENCES "plots" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "verification_documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plot_id" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "cloudinary_url" TEXT NOT NULL,
    "cloudinary_public_id" TEXT NOT NULL,
    "uploaded_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "verification_documents_plot_id_fkey" FOREIGN KEY ("plot_id") REFERENCES "plots" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "verification_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plot_id" TEXT NOT NULL,
    "verifier_id" TEXT,
    "action" TEXT NOT NULL,
    "notes" TEXT,
    "rejection_reason" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "verification_logs_plot_id_fkey" FOREIGN KEY ("plot_id") REFERENCES "plots" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "verification_logs_verifier_id_fkey" FOREIGN KEY ("verifier_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plot_id" TEXT NOT NULL,
    "inquiry_type" TEXT NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "inquiries_plot_id_fkey" FOREIGN KEY ("plot_id") REFERENCES "plots" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "plot_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "favorites_plot_id_fkey" FOREIGN KEY ("plot_id") REFERENCES "plots" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "admin_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "admin_id" TEXT,
    "action" TEXT NOT NULL,
    "entity_type" TEXT,
    "entity_id" TEXT,
    "details" JSONB,
    "ip_address" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "admin_logs_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE INDEX "plots_status_idx" ON "plots"("status");

-- CreateIndex
CREATE INDEX "plots_category_idx" ON "plots"("category");

-- CreateIndex
CREATE INDEX "plots_village_idx" ON "plots"("village");

-- CreateIndex
CREATE INDEX "plots_total_price_idx" ON "plots"("total_price");

-- CreateIndex
CREATE INDEX "plots_seller_id_idx" ON "plots"("seller_id");

-- CreateIndex
CREATE INDEX "plot_images_plot_id_idx" ON "plot_images"("plot_id");

-- CreateIndex
CREATE INDEX "inquiries_plot_id_idx" ON "inquiries"("plot_id");

-- CreateIndex
CREATE INDEX "inquiries_created_at_idx" ON "inquiries"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_plot_id_key" ON "favorites"("user_id", "plot_id");

-- CreateIndex
CREATE INDEX "admin_logs_admin_id_idx" ON "admin_logs"("admin_id");

-- CreateIndex
CREATE INDEX "admin_logs_created_at_idx" ON "admin_logs"("created_at");
