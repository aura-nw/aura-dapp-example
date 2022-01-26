
import express from 'express';

const router = express.Router()
// import bodyParser from 'body-parser';
// import fileUpload from 'express-fileupload';

import apiV1 from './controllers/ApiRoute.js'

// router.use(bodyParser.json());
// router.use(fileUpload());
router.use(apiV1)

export default router