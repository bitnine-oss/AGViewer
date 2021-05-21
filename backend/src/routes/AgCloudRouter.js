/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Router} from "express";
import AgCloudController from "../controllers/AgCloudController";
import {wrap} from '../common/Routes';

const router = Router();
const agCloudController = new AgCloudController();


// Execute Cypher Query
router.post("/", wrap(agCloudController.connectDatabase));

export default router;
