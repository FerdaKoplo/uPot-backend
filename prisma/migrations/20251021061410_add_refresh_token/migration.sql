-- CreateTable
CREATE TABLE "Refresh_Tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "foresterId" INTEGER NOT NULL,
    "userAgent" TEXT,
    "replacedById" INTEGER,

    CONSTRAINT "Refresh_Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Refresh_Tokens_token_key" ON "Refresh_Tokens"("token");

-- AddForeignKey
ALTER TABLE "Refresh_Tokens" ADD CONSTRAINT "Refresh_Tokens_foresterId_fkey" FOREIGN KEY ("foresterId") REFERENCES "Foresters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refresh_Tokens" ADD CONSTRAINT "Refresh_Tokens_replacedById_fkey" FOREIGN KEY ("replacedById") REFERENCES "Refresh_Tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE;
