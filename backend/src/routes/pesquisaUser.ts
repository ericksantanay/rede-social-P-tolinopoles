// import { Router } from "express";
// import prisma from "../lib/prisma";
// import { Request, Response } from "express";

// const router = Router();

// router.post("/bucarUsuario", async (req: Request, res: Response) => {

//     const {nome} = req.body;

//     if (!nome) {
//         res.status(404).json("Erro cadastre-se!");
//         return
//     }


//     try {
        
//         const buscarUser = await prisma.usuariosPatolinopoles.findUnique({
//             where: {nome: nome}
//         });

//         if (!buscarUser) {
//             return  res.status(404).json({mensagem: "Esse usuario não existe"});
//         };

//         if (buscarUser) {
//             res.status(200).json(buscarUser);
//         };



//     } catch (error) {
//        console.log(`ERRO NO BACKEND ${error}`) 
//         return res.status(500).json({mensagem: "Erro no servidor"})
//     }


// });


// router.get("/bucarUsuario", async (req: Request, res: Response) => {

//     try {

//         // const usuarioQueBuscado = await prisma.usuariosPatolinopoles.findFirst({
//         //     where: {nome: nome}
//         // })




        
//     } catch (error) {
//         console.log(`Erro no backend >${error}`)
//         return res.status(500).json({mensagem: "Erro no servidor"})

//     }

// });






// export default router;