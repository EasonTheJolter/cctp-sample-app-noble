// @ts-nocheck
import * as _117 from "./applications/transfer/v1/genesis";
import * as _118 from "./applications/transfer/v1/query";
import * as _119 from "./applications/transfer/v1/transfer";
import * as _120 from "./applications/transfer/v1/tx";
import * as _121 from "./applications/transfer/v2/packet";
import * as _122 from "./core/channel/v1/channel";
import * as _123 from "./core/channel/v1/genesis";
import * as _124 from "./core/channel/v1/query";
import * as _125 from "./core/channel/v1/tx";
import * as _126 from "./core/client/v1/client";
import * as _127 from "./core/client/v1/genesis";
import * as _128 from "./core/client/v1/query";
import * as _129 from "./core/client/v1/tx";
import * as _130 from "./core/commitment/v1/commitment";
import * as _131 from "./core/connection/v1/connection";
import * as _132 from "./core/connection/v1/genesis";
import * as _133 from "./core/connection/v1/query";
import * as _134 from "./core/connection/v1/tx";
import * as _135 from "./lightclients/localhost/v1/localhost";
import * as _136 from "./lightclients/solomachine/v1/solomachine";
import * as _137 from "./lightclients/solomachine/v2/solomachine";
import * as _138 from "./lightclients/tendermint/v1/tendermint";
import * as _209 from "./applications/transfer/v1/tx.amino";
import * as _210 from "./core/channel/v1/tx.amino";
import * as _211 from "./core/client/v1/tx.amino";
import * as _212 from "./core/connection/v1/tx.amino";
import * as _213 from "./applications/transfer/v1/tx.registry";
import * as _214 from "./core/channel/v1/tx.registry";
import * as _215 from "./core/client/v1/tx.registry";
import * as _216 from "./core/connection/v1/tx.registry";
import * as _217 from "./applications/transfer/v1/query.rpc.Query";
import * as _218 from "./core/channel/v1/query.rpc.Query";
import * as _219 from "./core/client/v1/query.rpc.Query";
import * as _220 from "./core/connection/v1/query.rpc.Query";
import * as _221 from "./applications/transfer/v1/tx.rpc.msg";
import * as _222 from "./core/channel/v1/tx.rpc.msg";
import * as _223 from "./core/client/v1/tx.rpc.msg";
import * as _224 from "./core/connection/v1/tx.rpc.msg";
import * as _229 from "./rpc.query";
import * as _230 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._117,
        ..._118,
        ..._119,
        ..._120,
        ..._209,
        ..._213,
        ..._217,
        ..._221
      };
      export const v2 = {
        ..._121
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._122,
        ..._123,
        ..._124,
        ..._125,
        ..._210,
        ..._214,
        ..._218,
        ..._222
      };
    }
    export namespace client {
      export const v1 = {
        ..._126,
        ..._127,
        ..._128,
        ..._129,
        ..._211,
        ..._215,
        ..._219,
        ..._223
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._130
      };
    }
    export namespace connection {
      export const v1 = {
        ..._131,
        ..._132,
        ..._133,
        ..._134,
        ..._212,
        ..._216,
        ..._220,
        ..._224
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v1 = {
        ..._135
      };
    }
    export namespace solomachine {
      export const v1 = {
        ..._136
      };
      export const v2 = {
        ..._137
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._138
      };
    }
  }
  export const ClientFactory = {
    ..._229,
    ..._230
  };
}