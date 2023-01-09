import express from "express";

//middlewares
import * as validator from "../middleware/validate-resources";
import * as  de from "../middleware/deserialize-user";
import authorizedUsersOnly from "../middleware/authorized-users-only";
import {fileFilter, storage} from "../middleware/upload-image";

//Controllers
import * as userCont from "../controller/user.controller";
import * as sessionCont from "../controller/session.controller";
import * as ImageCont from "../controller/image.controller";

import multer from "multer";

//Zod validators
import {ZodUserLoginSchema, ZodUserRegisterSchema} from "../zod/user.schema";

const v1 = express()


const upload = multer({storage: storage, fileFilter: fileFilter})


v1.post('/register', validator.validate(ZodUserRegisterSchema), userCont.createUser);
v1.post('/login', validator.validate(ZodUserLoginSchema), sessionCont.login);

v1.post('/refresh-token',  sessionCont.generateNewAccessToken);

v1.use(de.deserializeUser);

v1.get('/user/details', [authorizedUsersOnly], userCont.getUserDetails);
v1.post('/user/logout', [authorizedUsersOnly], sessionCont.deleteSession);


v1.get('/user/images/search', [authorizedUsersOnly], ImageCont.searchImage);

v1.post('/user/image/upload', [authorizedUsersOnly, upload.single('image')], ImageCont.addImage);
v1.post('/user/image/edit', [authorizedUsersOnly, upload.single('image')], ImageCont.addImage);



export default v1;

