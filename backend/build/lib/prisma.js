"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../generated/client");
// Isso garante que você use a mesma conexão em todo o app
const prisma = new client_1.PrismaClient();
exports.default = prisma;
