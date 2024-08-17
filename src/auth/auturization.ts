import AppDataSource from "../db";
import { User } from "../entity/user";
import { errorfunc } from "../errors/errorfunc"
import * as jwt from "jsonwebtoken";

 const userRepository = AppDataSource.getRepository(User);
export const auth = errorfunc(async (req, res, next) => { 
    
try {
        const authorization = req.headers["authorization"];
        let token;
        if (authorization && authorization.startsWith("Bearer")) {
          token = authorization.split(" ")[1];
        }
       
        const user = await jwt.verify(token, process.env.jwtsecret|| "secret");

        const decodedToken = await jwt.decode(token); 
        const userId = decodedToken["user.id"];

        const confirmedUser = await userRepository.findOneBy({ id: userId });
        if (!confirmedUser) {
          res.status(403).json({ message: "Access denied" });
        }

        req.user = confirmedUser;
        next();

} catch (error) {
   res.status(403).json({ message: error.message });
}
    
})