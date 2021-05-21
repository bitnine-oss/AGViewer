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

import Flavors from '../../config/Flavors';
import PgConfig from '../../config/Pg'
import pg from 'pg';
import types from 'pg-types';
import {setAGETypes} from '../../tools/AGEParser';

require('@bitnine-oss/ag-driver');


class AgensGraphRepository {
    host = null;
    port = 5432;
    database = null;
    graph = null;
    user = null;
    password = null;
    flavor = Flavors.AGENS;

    // Connection Pool
    pool = null;

    constructor({host, port, database, graph, user, password, flavor} = {}) {
        if (!flavor) {
            throw new Error('Flavor is required.');
        }

        this.host = host;
        this.port = port;
        this.database = database;
        this.graph = graph;
        this.user = user;
        this.password = password;
        this.flavor = flavor;
    }

    static async getConnection({
                                   host,
                                   port,
                                   database,
                                   graph,
                                   user,
                                   password,
                                   flavor
                               } = {},
                               closeConnection = true) {
        const client = new pg.Client({
                user,
                password,
                host,
                database,
                port,
            }
        )
        client.connect();
        if (flavor === Flavors.AGE) {
            await setAGETypes(client, types);
        } else if (flavor === Flavors.AGENS) {
            await client.query(`set graph_path = ${graph}`)
        } else {
            throw new Error(`Unknown flavor ${flavor}`)
        }

        if (closeConnection === true) {
            await client.end();
        }
        return client;
    }

    static newConnectionPool(poolConnectionConfig) {
        return new pg.Pool(poolConnectionConfig);
    }

    // Execute cypher query with params
    async execute(query, params = []) {
        let client = await this.getConnection();
        let result = null;
        try {
            result = await client.query(query, params);
        } catch (err) {
            throw err;
        } finally {
            client.release();
        }
        return result;
    }

    /**
     * Get connectionInfo
     */
    async getConnection() {
        if (!this.pool) {
            this.pool = AgensGraphRepository.newConnectionPool(this.getPoolConnectionInfo());
        }
        const client = await this.pool.connect();
        if (this.flavor === 'AGE') {
            await setAGETypes(client, types);
        } else {
            await client.query(`set graph_path = ${this.graph}`);
        }
        return client;
    }

    /**
     * Release connection
     */
    async releaseConnection() {
        try {
            await this.pool.end();
            return true;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get connection pool information
     */
    getPoolConnectionInfo() {
        if (!this.host || !this.port || !this.database) {
            return null;
        }
        return {
            host: this.host,
            port: this.port,
            database: this.database,
            user: this.user,
            password: this.password,
            max: PgConfig.max,
            idleTimeoutMillis: PgConfig.idleTimeoutMillis,
            connectionTimeoutMillis: PgConfig.connectionTimeoutMillis,
        };
    }

    /**
     * Get connection info
     */
    getConnectionInfo() {
        if (!this.host || !this.port || !this.database) {
            throw new Error("Not connected");
        }
        return {
            host: this.host,
            port: this.port,
            database: this.database,
            user: this.user,
            password: this.password,
            graph: this.graph,
            flavor: this.flavor,
        };
    }
}

export default AgensGraphRepository;
