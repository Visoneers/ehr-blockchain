
import { NextFunction, Request, Response, Router } from "express";
import { ResponseHandler } from "../../utils/response.handler";
import authService from "./auth.service";

const router = Router();

router.post(
    '/register', 
    async(req, res,next) => {
    try {
        console.log(req.body)
        const data=req.body
        const result=await authService.register(data)
        res.send(new ResponseHandler(result))
        
    } catch (error) {
        next(error);
    }

})
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credential=req.body;
        const result=await authService.login(credential);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error)
    }
});
router.get('/w/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.url)
        res.json({
            url:req.url,
            baseurl:req.baseUrl,
            originalUrl:req.originalUrl,
            path:req.path
        })
    } catch (error) {
        next(error)
    }
})



export default router;