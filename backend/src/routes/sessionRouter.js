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

import DatabaseService from '../services/databaseService';
import sessionService from '../services/sessionService';

function sessionRouter(req, res, next) {
    if (sessionService.get(req.sessionID) == null) {
        sessionService.put(req.sessionID, new DatabaseService());
    }
    next();
}

export default sessionRouter;
