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

import {getQuery} from "../tools/SQLFlavorManager";
import * as util from "util";

import AgensGraphRepository from '../models/agensgraph/agensGraphRepository';

class DatabaseService {
    agensDatabaseHelper = null;

    async getMetaData() {
        let metadata = {};
        try {
            let connectionInfo = this.getConnectionInfo();
            metadata.nodes = await this.getNodes();
            metadata.edges = await this.getEdges();
            metadata.propertyKeys = await this.getPropertyKeys();
            metadata.graph = connectionInfo.graph;
            metadata.database = connectionInfo.database;
            metadata.role = await this.getRole();
        } catch (error) {
            throw error;
        }
        return metadata;
    }

    async getGraphLabels() {
        let agensDatabaseHelper = this.agensDatabaseHelper;
        let queryResult = {};
        try {
            queryResult = await agensDatabaseHelper.execute(getQuery(agensDatabaseHelper.flavor, 'graph_labels'), [this.getConnectionInfo().graph]);
        } catch (error) {
            throw error;
        }

        return queryResult.rows;
    }

    async getGraphLabelCount(labelName, labelKind) {
        let agensDatabaseHelper = this.agensDatabaseHelper;
        let query = null;

        if (labelKind === 'v') {
            query = util.format(getQuery(agensDatabaseHelper.flavor, 'label_count_vertex'), `${this.getConnectionInfo().graph}.${labelName}`);
        } else if (labelKind === 'e') {
            query = util.format(getQuery(agensDatabaseHelper.flavor, 'label_count_edge'), `${this.getConnectionInfo().graph}.${labelName}`);
        }

        let queryResult = await agensDatabaseHelper.execute(query);

        return queryResult.rows;
    }

    async getNodes() {
        let agensDatabaseHelper = this.agensDatabaseHelper;
        let queryResult = await agensDatabaseHelper.execute(util.format(getQuery(agensDatabaseHelper.flavor, 'meta_nodes'), agensDatabaseHelper.graph, agensDatabaseHelper.graph));
        return queryResult.rows;
    }

    async getEdges() {
        let agensDatabaseHelper = this.agensDatabaseHelper;
        let queryResult = await agensDatabaseHelper.execute(util.format(getQuery(agensDatabaseHelper.flavor, 'meta_edges'), agensDatabaseHelper.graph, agensDatabaseHelper.graph));
        return queryResult.rows;
    }

    async getPropertyKeys() {
        let agensDatabaseHelper = this.agensDatabaseHelper;
        let queryResult = await agensDatabaseHelper.execute(getQuery(agensDatabaseHelper.flavor, 'property_keys'));
        return queryResult.rows;
    }

    async getRole() {
        let agensDatabaseHelper = this.agensDatabaseHelper;
        let queryResult = await agensDatabaseHelper.execute(getQuery(agensDatabaseHelper.flavor, 'get_role'), [this.getConnectionInfo().user]);
        return queryResult.rows[0];
    }

    async connectDatabase(connectionInfo) {
        let agensDatabaseHelper = this.agensDatabaseHelper;
        if (agensDatabaseHelper == null) {
            this.agensDatabaseHelper = new AgensGraphRepository(connectionInfo);
            agensDatabaseHelper = this.agensDatabaseHelper;
        }

        try {
            let client = await agensDatabaseHelper.getConnection(agensDatabaseHelper.getConnectionInfo(), true);
            client.release();
        } catch (e) {
            this.agensDatabaseHelper = null;
            throw e;
        }
        return true;
    }

    async disconnectDatabase() {
        let agensDatabaseHelper = this.agensDatabaseHelper;
        if (agensDatabaseHelper == null) {
            console.log('Already Disconnected');
            return false;
        } else {
            let isRelease = await this.agensDatabaseHelper.releaseConnection();
            if (isRelease) {
                this.agensDatabaseHelper = null;
                return true;
            } else {
                console.log('Failed releaseConnection()');
                return false;
            }
        }
    }

    async getConnectionStatus() {
        let agensDatabaseHelper = this.agensDatabaseHelper;
        if (agensDatabaseHelper == null) {
            return false;
        }

        try {
            let client = await AgensGraphRepository.getConnection(agensDatabaseHelper.getConnectionInfo());
            client.release();
        } catch (err) {
            return false;
        }
        return true;
    }

    getConnectionInfo() {
        if (this.isConnected() === false)
            throw new Error("Not connected");
        return this.agensDatabaseHelper.getConnectionInfo();
    }

    isConnected() {
        return this.agensDatabaseHelper != null;
    }

    get agensDatabaseHelper() {
        return this.agensDatabaseHelper;
    }

    convertEdge({label, id, start, end, props}) {
        return {
            label: label,
            id: `${id.oid}.${id.id}`,
            start: `${start.oid}.${start.id}`,
            end: `${end.oid}.${end.id}`,
            properties: props,
        };
    }
}

export default DatabaseService;
