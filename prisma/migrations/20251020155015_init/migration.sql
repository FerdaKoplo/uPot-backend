-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PRIVATE', 'FOREST_VISIBLE');

-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Foresters" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Foresters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Forests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forest_Members" (
    "foresterId" INTEGER NOT NULL,
    "forestId" INTEGER NOT NULL,
    "status" "InviteStatus" NOT NULL DEFAULT 'PENDING',
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinedAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),

    CONSTRAINT "Forest_Members_pkey" PRIMARY KEY ("foresterId","forestId")
);

-- CreateTable
CREATE TABLE "Branches" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'FOREST_VISIBLE',
    "backgroundImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "forestId" INTEGER NOT NULL,

    CONSTRAINT "Branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Twigs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branchId" INTEGER NOT NULL,

    CONSTRAINT "Twigs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaflets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "twigId" INTEGER NOT NULL,

    CONSTRAINT "Leaflets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaflet_Assignees" (
    "leafletId" INTEGER NOT NULL,
    "foresterId" INTEGER NOT NULL,

    CONSTRAINT "Leaflet_Assignees_pkey" PRIMARY KEY ("leafletId","foresterId")
);

-- CreateTable
CREATE TABLE "Sap_Drops" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leafletId" INTEGER NOT NULL,
    "foresterId" INTEGER NOT NULL,

    CONSTRAINT "Sap_Drops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pollen_Grains" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leafletId" INTEGER NOT NULL,
    "foresterId" INTEGER NOT NULL,

    CONSTRAINT "Pollen_Grains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vines" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leafletId" INTEGER NOT NULL,

    CONSTRAINT "Vines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Berries" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,
    "vineId" INTEGER NOT NULL,

    CONSTRAINT "Berries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mosses" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "colorHex" TEXT NOT NULL,
    "branchId" INTEGER NOT NULL,

    CONSTRAINT "Mosses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaflet_Mosses" (
    "leafletId" INTEGER NOT NULL,
    "mossId" INTEGER NOT NULL,

    CONSTRAINT "Leaflet_Mosses_pkey" PRIMARY KEY ("leafletId","mossId")
);

-- CreateTable
CREATE TABLE "Forest_Echoes" (
    "id" SERIAL NOT NULL,
    "actionType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "foresterId" INTEGER NOT NULL,
    "leafletId" INTEGER,
    "branchId" INTEGER,

    CONSTRAINT "Forest_Echoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Whispering_Winds" (
    "id" SERIAL NOT NULL,
    "actionType" TEXT NOT NULL,
    "content" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipientId" INTEGER NOT NULL,
    "initiatorId" INTEGER NOT NULL,
    "leafletId" INTEGER,

    CONSTRAINT "Whispering_Winds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "Forester_Roles" (
    "id" SERIAL NOT NULL,
    "foresterId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "forestId" INTEGER,

    CONSTRAINT "Forester_Roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Foresters_username_key" ON "Foresters"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Foresters_email_key" ON "Foresters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Forester_Roles_foresterId_roleId_forestId_key" ON "Forester_Roles"("foresterId", "roleId", "forestId");

-- AddForeignKey
ALTER TABLE "Forest_Members" ADD CONSTRAINT "Forest_Members_foresterId_fkey" FOREIGN KEY ("foresterId") REFERENCES "Foresters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forest_Members" ADD CONSTRAINT "Forest_Members_forestId_fkey" FOREIGN KEY ("forestId") REFERENCES "Forests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branches" ADD CONSTRAINT "Branches_forestId_fkey" FOREIGN KEY ("forestId") REFERENCES "Forests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Twigs" ADD CONSTRAINT "Twigs_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaflets" ADD CONSTRAINT "Leaflets_twigId_fkey" FOREIGN KEY ("twigId") REFERENCES "Twigs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaflet_Assignees" ADD CONSTRAINT "Leaflet_Assignees_leafletId_fkey" FOREIGN KEY ("leafletId") REFERENCES "Leaflets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaflet_Assignees" ADD CONSTRAINT "Leaflet_Assignees_foresterId_fkey" FOREIGN KEY ("foresterId") REFERENCES "Foresters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sap_Drops" ADD CONSTRAINT "Sap_Drops_leafletId_fkey" FOREIGN KEY ("leafletId") REFERENCES "Leaflets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sap_Drops" ADD CONSTRAINT "Sap_Drops_foresterId_fkey" FOREIGN KEY ("foresterId") REFERENCES "Foresters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pollen_Grains" ADD CONSTRAINT "Pollen_Grains_leafletId_fkey" FOREIGN KEY ("leafletId") REFERENCES "Leaflets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pollen_Grains" ADD CONSTRAINT "Pollen_Grains_foresterId_fkey" FOREIGN KEY ("foresterId") REFERENCES "Foresters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vines" ADD CONSTRAINT "Vines_leafletId_fkey" FOREIGN KEY ("leafletId") REFERENCES "Leaflets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Berries" ADD CONSTRAINT "Berries_vineId_fkey" FOREIGN KEY ("vineId") REFERENCES "Vines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mosses" ADD CONSTRAINT "Mosses_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaflet_Mosses" ADD CONSTRAINT "Leaflet_Mosses_leafletId_fkey" FOREIGN KEY ("leafletId") REFERENCES "Leaflets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaflet_Mosses" ADD CONSTRAINT "Leaflet_Mosses_mossId_fkey" FOREIGN KEY ("mossId") REFERENCES "Mosses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forest_Echoes" ADD CONSTRAINT "Forest_Echoes_foresterId_fkey" FOREIGN KEY ("foresterId") REFERENCES "Foresters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forest_Echoes" ADD CONSTRAINT "Forest_Echoes_leafletId_fkey" FOREIGN KEY ("leafletId") REFERENCES "Leaflets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forest_Echoes" ADD CONSTRAINT "Forest_Echoes_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Whispering_Winds" ADD CONSTRAINT "Whispering_Winds_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Foresters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Whispering_Winds" ADD CONSTRAINT "Whispering_Winds_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "Foresters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Whispering_Winds" ADD CONSTRAINT "Whispering_Winds_leafletId_fkey" FOREIGN KEY ("leafletId") REFERENCES "Leaflets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forester_Roles" ADD CONSTRAINT "Forester_Roles_foresterId_fkey" FOREIGN KEY ("foresterId") REFERENCES "Foresters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forester_Roles" ADD CONSTRAINT "Forester_Roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forester_Roles" ADD CONSTRAINT "Forester_Roles_forestId_fkey" FOREIGN KEY ("forestId") REFERENCES "Forests"("id") ON DELETE SET NULL ON UPDATE CASCADE;
