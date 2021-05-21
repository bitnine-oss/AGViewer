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

import CypherService from "../services/cypherService";
import sessionService from "../services/sessionService";

export default class CypherController {
    async executeCypher(req, res) {
        let connectorService = sessionService.get(req.sessionID);
        if (connectorService.isConnected()) {
            let cypherService = new CypherService(
                connectorService.agensDatabaseHelper
            );
            let data = await cypherService.executeCypher(req.body.cmd);
            res.status(200).json(data).end();
        } else {
            throw new Error("Not connected");
        }
    }
}
