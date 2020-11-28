import * as rp from 'request-promise'

const UE4_SERVER_ADDRESS = process.env.UE4_SERVER_ADDRESS || "http://localhost:8080";

export type HttpMethodCalls = 'put' | 'PUT'

import { omitBy, isUndefined } from 'lodash'

import * as debug from 'debug'

const d = debug('ue4-remote-control:Resource')

export class Resource {
    async makeRequest<Req, Res>(method: HttpMethodCalls, endpoint: string, body: Req): Promise<Res> {
        const options: rp.Options = {
            uri: `${UE4_SERVER_ADDRESS}${endpoint}`,
            method,
            body: omitBy(body, isUndefined),
            json: true
        };
        d('>> request', options)
        const result = await rp(options) as Res
        d('<< result', result)
        return result
    }
}