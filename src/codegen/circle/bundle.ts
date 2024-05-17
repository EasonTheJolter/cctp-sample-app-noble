// @ts-nocheck
import * as _1 from "./cctp/v1/attester";
import * as _2 from "./cctp/v1/burn_message";
import * as _3 from "./cctp/v1/burning_and_minting_paused";
import * as _4 from "./cctp/v1/events";
import * as _5 from "./cctp/v1/genesis";
import * as _6 from "./cctp/v1/max_message_body_size";
import * as _7 from "./cctp/v1/message";
import * as _8 from "./cctp/v1/nonce";
import * as _9 from "./cctp/v1/params";
import * as _10 from "./cctp/v1/per_message_burn_limit";
import * as _11 from "./cctp/v1/query";
import * as _12 from "./cctp/v1/remote_token_messenger";
import * as _13 from "./cctp/v1/sending_and_receiving_messages_paused";
import * as _14 from "./cctp/v1/signature_threshold";
import * as _15 from "./cctp/v1/token_pair";
import * as _16 from "./cctp/v1/tx";
import * as _150 from "./cctp/v1/tx.amino";
import * as _151 from "./cctp/v1/tx.registry";
import * as _152 from "./cctp/v1/query.rpc.Query";
import * as _153 from "./cctp/v1/tx.rpc.msg";
import * as _225 from "./rpc.query";
import * as _226 from "./rpc.tx";
export namespace circle {
  export namespace cctp {
    export const v1 = {
      ..._1,
      ..._2,
      ..._3,
      ..._4,
      ..._5,
      ..._6,
      ..._7,
      ..._8,
      ..._9,
      ..._10,
      ..._11,
      ..._12,
      ..._13,
      ..._14,
      ..._15,
      ..._16,
      ..._150,
      ..._151,
      ..._152,
      ..._153
    };
  }
  export const ClientFactory = {
    ..._225,
    ..._226
  };
}