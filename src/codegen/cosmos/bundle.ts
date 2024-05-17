// @ts-nocheck
import * as _19 from "./app/runtime/v1alpha1/module";
import * as _20 from "./auth/module/v1/module";
import * as _21 from "./auth/v1beta1/auth";
import * as _22 from "./auth/v1beta1/genesis";
import * as _23 from "./auth/v1beta1/query";
import * as _24 from "./auth/v1beta1/tx";
import * as _25 from "./authz/module/v1/module";
import * as _26 from "./authz/v1beta1/authz";
import * as _27 from "./authz/v1beta1/event";
import * as _28 from "./authz/v1beta1/genesis";
import * as _29 from "./authz/v1beta1/query";
import * as _30 from "./authz/v1beta1/tx";
import * as _31 from "./bank/module/v1/module";
import * as _32 from "./bank/v1beta1/authz";
import * as _33 from "./bank/v1beta1/bank";
import * as _34 from "./bank/v1beta1/genesis";
import * as _35 from "./bank/v1beta1/query";
import * as _36 from "./bank/v1beta1/tx";
import * as _37 from "./base/abci/v1beta1/abci";
import * as _38 from "./base/node/v1beta1/query";
import * as _39 from "./base/query/v1beta1/pagination";
import * as _40 from "./base/reflection/v2alpha1/reflection";
import * as _41 from "./base/v1beta1/coin";
import * as _42 from "./capability/module/v1/module";
import * as _43 from "./consensus/module/v1/module";
import * as _44 from "./consensus/v1/query";
import * as _45 from "./consensus/v1/tx";
import * as _46 from "./crisis/module/v1/module";
import * as _47 from "./crypto/ed25519/keys";
import * as _48 from "./crypto/hd/v1/hd";
import * as _49 from "./crypto/keyring/v1/record";
import * as _50 from "./crypto/multisig/keys";
import * as _51 from "./crypto/secp256k1/keys";
import * as _52 from "./crypto/secp256r1/keys";
import * as _53 from "./distribution/module/v1/module";
import * as _54 from "./distribution/v1beta1/distribution";
import * as _55 from "./distribution/v1beta1/genesis";
import * as _56 from "./distribution/v1beta1/query";
import * as _57 from "./distribution/v1beta1/tx";
import * as _58 from "./evidence/module/v1/module";
import * as _59 from "./feegrant/module/v1/module";
import * as _60 from "./feegrant/v1beta1/feegrant";
import * as _61 from "./feegrant/v1beta1/genesis";
import * as _62 from "./feegrant/v1beta1/query";
import * as _63 from "./feegrant/v1beta1/tx";
import * as _64 from "./genutil/module/v1/module";
import * as _65 from "./gov/module/v1/module";
import * as _66 from "./gov/v1/genesis";
import * as _67 from "./gov/v1/gov";
import * as _68 from "./gov/v1/query";
import * as _69 from "./gov/v1/tx";
import * as _70 from "./gov/v1beta1/genesis";
import * as _71 from "./gov/v1beta1/gov";
import * as _72 from "./gov/v1beta1/query";
import * as _73 from "./gov/v1beta1/tx";
import * as _74 from "./group/module/v1/module";
import * as _75 from "./group/v1/events";
import * as _76 from "./group/v1/genesis";
import * as _77 from "./group/v1/query";
import * as _78 from "./group/v1/tx";
import * as _79 from "./group/v1/types";
import * as _80 from "./mint/module/v1/module";
import * as _81 from "./mint/v1beta1/genesis";
import * as _82 from "./mint/v1beta1/mint";
import * as _83 from "./mint/v1beta1/query";
import * as _84 from "./mint/v1beta1/tx";
import * as _85 from "./nft/module/v1/module";
import * as _86 from "./orm/module/v1alpha1/module";
import * as _87 from "./orm/query/v1alpha1/query";
import * as _88 from "./params/module/v1/module";
import * as _89 from "./params/v1beta1/params";
import * as _90 from "./params/v1beta1/query";
import * as _91 from "./query/v1/query";
import * as _92 from "./reflection/v1/reflection";
import * as _93 from "./slashing/module/v1/module";
import * as _94 from "./staking/module/v1/module";
import * as _95 from "./staking/v1beta1/authz";
import * as _96 from "./staking/v1beta1/genesis";
import * as _97 from "./staking/v1beta1/query";
import * as _98 from "./staking/v1beta1/staking";
import * as _99 from "./staking/v1beta1/tx";
import * as _100 from "./tx/config/v1/config";
import * as _101 from "./tx/signing/v1beta1/signing";
import * as _102 from "./tx/v1beta1/service";
import * as _103 from "./tx/v1beta1/tx";
import * as _104 from "./upgrade/module/v1/module";
import * as _105 from "./upgrade/v1beta1/query";
import * as _106 from "./upgrade/v1beta1/tx";
import * as _107 from "./upgrade/v1beta1/upgrade";
import * as _108 from "./vesting/module/v1/module";
import * as _109 from "./vesting/v1beta1/tx";
import * as _110 from "./vesting/v1beta1/vesting";
import * as _154 from "./auth/v1beta1/tx.amino";
import * as _155 from "./authz/v1beta1/tx.amino";
import * as _156 from "./bank/v1beta1/tx.amino";
import * as _157 from "./consensus/v1/tx.amino";
import * as _158 from "./distribution/v1beta1/tx.amino";
import * as _159 from "./feegrant/v1beta1/tx.amino";
import * as _160 from "./gov/v1/tx.amino";
import * as _161 from "./gov/v1beta1/tx.amino";
import * as _162 from "./group/v1/tx.amino";
import * as _163 from "./mint/v1beta1/tx.amino";
import * as _164 from "./staking/v1beta1/tx.amino";
import * as _165 from "./upgrade/v1beta1/tx.amino";
import * as _166 from "./vesting/v1beta1/tx.amino";
import * as _167 from "./auth/v1beta1/tx.registry";
import * as _168 from "./authz/v1beta1/tx.registry";
import * as _169 from "./bank/v1beta1/tx.registry";
import * as _170 from "./consensus/v1/tx.registry";
import * as _171 from "./distribution/v1beta1/tx.registry";
import * as _172 from "./feegrant/v1beta1/tx.registry";
import * as _173 from "./gov/v1/tx.registry";
import * as _174 from "./gov/v1beta1/tx.registry";
import * as _175 from "./group/v1/tx.registry";
import * as _176 from "./mint/v1beta1/tx.registry";
import * as _177 from "./staking/v1beta1/tx.registry";
import * as _178 from "./upgrade/v1beta1/tx.registry";
import * as _179 from "./vesting/v1beta1/tx.registry";
import * as _180 from "./auth/v1beta1/query.rpc.Query";
import * as _181 from "./authz/v1beta1/query.rpc.Query";
import * as _182 from "./bank/v1beta1/query.rpc.Query";
import * as _183 from "./base/node/v1beta1/query.rpc.Service";
import * as _184 from "./consensus/v1/query.rpc.Query";
import * as _185 from "./distribution/v1beta1/query.rpc.Query";
import * as _186 from "./feegrant/v1beta1/query.rpc.Query";
import * as _187 from "./gov/v1/query.rpc.Query";
import * as _188 from "./gov/v1beta1/query.rpc.Query";
import * as _189 from "./group/v1/query.rpc.Query";
import * as _190 from "./mint/v1beta1/query.rpc.Query";
import * as _191 from "./orm/query/v1alpha1/query.rpc.Query";
import * as _192 from "./params/v1beta1/query.rpc.Query";
import * as _193 from "./staking/v1beta1/query.rpc.Query";
import * as _194 from "./tx/v1beta1/service.rpc.Service";
import * as _195 from "./upgrade/v1beta1/query.rpc.Query";
import * as _196 from "./auth/v1beta1/tx.rpc.msg";
import * as _197 from "./authz/v1beta1/tx.rpc.msg";
import * as _198 from "./bank/v1beta1/tx.rpc.msg";
import * as _199 from "./consensus/v1/tx.rpc.msg";
import * as _200 from "./distribution/v1beta1/tx.rpc.msg";
import * as _201 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _202 from "./gov/v1/tx.rpc.msg";
import * as _203 from "./gov/v1beta1/tx.rpc.msg";
import * as _204 from "./group/v1/tx.rpc.msg";
import * as _205 from "./mint/v1beta1/tx.rpc.msg";
import * as _206 from "./staking/v1beta1/tx.rpc.msg";
import * as _207 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _208 from "./vesting/v1beta1/tx.rpc.msg";
import * as _227 from "./rpc.query";
import * as _228 from "./rpc.tx";
export namespace cosmos {
  export namespace app {
    export namespace runtime {
      export const v1alpha1 = {
        ..._19
      };
    }
  }
  export namespace auth {
    export namespace module {
      export const v1 = {
        ..._20
      };
    }
    export const v1beta1 = {
      ..._21,
      ..._22,
      ..._23,
      ..._24,
      ..._154,
      ..._167,
      ..._180,
      ..._196
    };
  }
  export namespace authz {
    export namespace module {
      export const v1 = {
        ..._25
      };
    }
    export const v1beta1 = {
      ..._26,
      ..._27,
      ..._28,
      ..._29,
      ..._30,
      ..._155,
      ..._168,
      ..._181,
      ..._197
    };
  }
  export namespace bank {
    export namespace module {
      export const v1 = {
        ..._31
      };
    }
    export const v1beta1 = {
      ..._32,
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._156,
      ..._169,
      ..._182,
      ..._198
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._37
      };
    }
    export namespace node {
      export const v1beta1 = {
        ..._38,
        ..._183
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._39
      };
    }
    export namespace reflection {
      export const v2alpha1 = {
        ..._40
      };
    }
    export const v1beta1 = {
      ..._41
    };
  }
  export namespace capability {
    export namespace module {
      export const v1 = {
        ..._42
      };
    }
  }
  export namespace consensus {
    export namespace module {
      export const v1 = {
        ..._43
      };
    }
    export const v1 = {
      ..._44,
      ..._45,
      ..._157,
      ..._170,
      ..._184,
      ..._199
    };
  }
  export namespace crisis {
    export namespace module {
      export const v1 = {
        ..._46
      };
    }
  }
  export namespace crypto {
    export const ed25519 = {
      ..._47
    };
    export namespace hd {
      export const v1 = {
        ..._48
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._49
      };
    }
    export const multisig = {
      ..._50
    };
    export const secp256k1 = {
      ..._51
    };
    export const secp256r1 = {
      ..._52
    };
  }
  export namespace distribution {
    export namespace module {
      export const v1 = {
        ..._53
      };
    }
    export const v1beta1 = {
      ..._54,
      ..._55,
      ..._56,
      ..._57,
      ..._158,
      ..._171,
      ..._185,
      ..._200
    };
  }
  export namespace evidence {
    export namespace module {
      export const v1 = {
        ..._58
      };
    }
  }
  export namespace feegrant {
    export namespace module {
      export const v1 = {
        ..._59
      };
    }
    export const v1beta1 = {
      ..._60,
      ..._61,
      ..._62,
      ..._63,
      ..._159,
      ..._172,
      ..._186,
      ..._201
    };
  }
  export namespace genutil {
    export namespace module {
      export const v1 = {
        ..._64
      };
    }
  }
  export namespace gov {
    export namespace module {
      export const v1 = {
        ..._65
      };
    }
    export const v1 = {
      ..._66,
      ..._67,
      ..._68,
      ..._69,
      ..._160,
      ..._173,
      ..._187,
      ..._202
    };
    export const v1beta1 = {
      ..._70,
      ..._71,
      ..._72,
      ..._73,
      ..._161,
      ..._174,
      ..._188,
      ..._203
    };
  }
  export namespace group {
    export namespace module {
      export const v1 = {
        ..._74
      };
    }
    export const v1 = {
      ..._75,
      ..._76,
      ..._77,
      ..._78,
      ..._79,
      ..._162,
      ..._175,
      ..._189,
      ..._204
    };
  }
  export namespace mint {
    export namespace module {
      export const v1 = {
        ..._80
      };
    }
    export const v1beta1 = {
      ..._81,
      ..._82,
      ..._83,
      ..._84,
      ..._163,
      ..._176,
      ..._190,
      ..._205
    };
  }
  export namespace nft {
    export namespace module {
      export const v1 = {
        ..._85
      };
    }
  }
  export namespace orm {
    export namespace module {
      export const v1alpha1 = {
        ..._86
      };
    }
    export namespace query {
      export const v1alpha1 = {
        ..._87,
        ..._191
      };
    }
  }
  export namespace params {
    export namespace module {
      export const v1 = {
        ..._88
      };
    }
    export const v1beta1 = {
      ..._89,
      ..._90,
      ..._192
    };
  }
  export namespace query {
    export const v1 = {
      ..._91
    };
  }
  export namespace reflection {
    export const v1 = {
      ..._92
    };
  }
  export namespace slashing {
    export namespace module {
      export const v1 = {
        ..._93
      };
    }
  }
  export namespace staking {
    export namespace module {
      export const v1 = {
        ..._94
      };
    }
    export const v1beta1 = {
      ..._95,
      ..._96,
      ..._97,
      ..._98,
      ..._99,
      ..._164,
      ..._177,
      ..._193,
      ..._206
    };
  }
  export namespace tx {
    export namespace config {
      export const v1 = {
        ..._100
      };
    }
    export namespace signing {
      export const v1beta1 = {
        ..._101
      };
    }
    export const v1beta1 = {
      ..._102,
      ..._103,
      ..._194
    };
  }
  export namespace upgrade {
    export namespace module {
      export const v1 = {
        ..._104
      };
    }
    export const v1beta1 = {
      ..._105,
      ..._106,
      ..._107,
      ..._165,
      ..._178,
      ..._195,
      ..._207
    };
  }
  export namespace vesting {
    export namespace module {
      export const v1 = {
        ..._108
      };
    }
    export const v1beta1 = {
      ..._109,
      ..._110,
      ..._166,
      ..._179,
      ..._208
    };
  }
  export const ClientFactory = {
    ..._227,
    ..._228
  };
}