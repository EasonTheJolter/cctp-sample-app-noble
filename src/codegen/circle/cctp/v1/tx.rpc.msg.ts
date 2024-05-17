// @ts-nocheck
import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgAcceptOwner, MsgAcceptOwnerResponse, MsgAddRemoteTokenMessenger, MsgAddRemoteTokenMessengerResponse, MsgDepositForBurn, MsgDepositForBurnResponse, MsgDepositForBurnWithCaller, MsgDepositForBurnWithCallerResponse, MsgDisableAttester, MsgDisableAttesterResponse, MsgEnableAttester, MsgEnableAttesterResponse, MsgLinkTokenPair, MsgLinkTokenPairResponse, MsgPauseBurningAndMinting, MsgPauseBurningAndMintingResponse, MsgPauseSendingAndReceivingMessages, MsgPauseSendingAndReceivingMessagesResponse, MsgReceiveMessage, MsgReceiveMessageResponse, MsgRemoveRemoteTokenMessenger, MsgRemoveRemoteTokenMessengerResponse, MsgReplaceDepositForBurn, MsgReplaceDepositForBurnResponse, MsgReplaceMessage, MsgReplaceMessageResponse, MsgSendMessage, MsgSendMessageResponse, MsgSendMessageWithCaller, MsgSendMessageWithCallerResponse, MsgUnlinkTokenPair, MsgUnlinkTokenPairResponse, MsgUnpauseBurningAndMinting, MsgUnpauseBurningAndMintingResponse, MsgUnpauseSendingAndReceivingMessages, MsgUnpauseSendingAndReceivingMessagesResponse, MsgUpdateOwner, MsgUpdateOwnerResponse, MsgUpdateAttesterManager, MsgUpdateAttesterManagerResponse, MsgUpdateTokenController, MsgUpdateTokenControllerResponse, MsgUpdatePauser, MsgUpdatePauserResponse, MsgUpdateMaxMessageBodySize, MsgUpdateMaxMessageBodySizeResponse, MsgSetMaxBurnAmountPerMessage, MsgSetMaxBurnAmountPerMessageResponse, MsgUpdateSignatureThreshold, MsgUpdateSignatureThresholdResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  acceptOwner(request: MsgAcceptOwner): Promise<MsgAcceptOwnerResponse>;
  addRemoteTokenMessenger(request: MsgAddRemoteTokenMessenger): Promise<MsgAddRemoteTokenMessengerResponse>;
  depositForBurn(request: MsgDepositForBurn): Promise<MsgDepositForBurnResponse>;
  depositForBurnWithCaller(request: MsgDepositForBurnWithCaller): Promise<MsgDepositForBurnWithCallerResponse>;
  disableAttester(request: MsgDisableAttester): Promise<MsgDisableAttesterResponse>;
  enableAttester(request: MsgEnableAttester): Promise<MsgEnableAttesterResponse>;
  linkTokenPair(request: MsgLinkTokenPair): Promise<MsgLinkTokenPairResponse>;
  pauseBurningAndMinting(request: MsgPauseBurningAndMinting): Promise<MsgPauseBurningAndMintingResponse>;
  pauseSendingAndReceivingMessages(request: MsgPauseSendingAndReceivingMessages): Promise<MsgPauseSendingAndReceivingMessagesResponse>;
  receiveMessage(request: MsgReceiveMessage): Promise<MsgReceiveMessageResponse>;
  removeRemoteTokenMessenger(request: MsgRemoveRemoteTokenMessenger): Promise<MsgRemoveRemoteTokenMessengerResponse>;
  replaceDepositForBurn(request: MsgReplaceDepositForBurn): Promise<MsgReplaceDepositForBurnResponse>;
  replaceMessage(request: MsgReplaceMessage): Promise<MsgReplaceMessageResponse>;
  sendMessage(request: MsgSendMessage): Promise<MsgSendMessageResponse>;
  sendMessageWithCaller(request: MsgSendMessageWithCaller): Promise<MsgSendMessageWithCallerResponse>;
  unlinkTokenPair(request: MsgUnlinkTokenPair): Promise<MsgUnlinkTokenPairResponse>;
  unpauseBurningAndMinting(request: MsgUnpauseBurningAndMinting): Promise<MsgUnpauseBurningAndMintingResponse>;
  unpauseSendingAndReceivingMessages(request: MsgUnpauseSendingAndReceivingMessages): Promise<MsgUnpauseSendingAndReceivingMessagesResponse>;
  updateOwner(request: MsgUpdateOwner): Promise<MsgUpdateOwnerResponse>;
  updateAttesterManager(request: MsgUpdateAttesterManager): Promise<MsgUpdateAttesterManagerResponse>;
  updateTokenController(request: MsgUpdateTokenController): Promise<MsgUpdateTokenControllerResponse>;
  updatePauser(request: MsgUpdatePauser): Promise<MsgUpdatePauserResponse>;
  updateMaxMessageBodySize(request: MsgUpdateMaxMessageBodySize): Promise<MsgUpdateMaxMessageBodySizeResponse>;
  setMaxBurnAmountPerMessage(request: MsgSetMaxBurnAmountPerMessage): Promise<MsgSetMaxBurnAmountPerMessageResponse>;
  updateSignatureThreshold(request: MsgUpdateSignatureThreshold): Promise<MsgUpdateSignatureThresholdResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.acceptOwner = this.acceptOwner.bind(this);
    this.addRemoteTokenMessenger = this.addRemoteTokenMessenger.bind(this);
    this.depositForBurn = this.depositForBurn.bind(this);
    this.depositForBurnWithCaller = this.depositForBurnWithCaller.bind(this);
    this.disableAttester = this.disableAttester.bind(this);
    this.enableAttester = this.enableAttester.bind(this);
    this.linkTokenPair = this.linkTokenPair.bind(this);
    this.pauseBurningAndMinting = this.pauseBurningAndMinting.bind(this);
    this.pauseSendingAndReceivingMessages = this.pauseSendingAndReceivingMessages.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.removeRemoteTokenMessenger = this.removeRemoteTokenMessenger.bind(this);
    this.replaceDepositForBurn = this.replaceDepositForBurn.bind(this);
    this.replaceMessage = this.replaceMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendMessageWithCaller = this.sendMessageWithCaller.bind(this);
    this.unlinkTokenPair = this.unlinkTokenPair.bind(this);
    this.unpauseBurningAndMinting = this.unpauseBurningAndMinting.bind(this);
    this.unpauseSendingAndReceivingMessages = this.unpauseSendingAndReceivingMessages.bind(this);
    this.updateOwner = this.updateOwner.bind(this);
    this.updateAttesterManager = this.updateAttesterManager.bind(this);
    this.updateTokenController = this.updateTokenController.bind(this);
    this.updatePauser = this.updatePauser.bind(this);
    this.updateMaxMessageBodySize = this.updateMaxMessageBodySize.bind(this);
    this.setMaxBurnAmountPerMessage = this.setMaxBurnAmountPerMessage.bind(this);
    this.updateSignatureThreshold = this.updateSignatureThreshold.bind(this);
  }
  acceptOwner(request: MsgAcceptOwner): Promise<MsgAcceptOwnerResponse> {
    const data = MsgAcceptOwner.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "AcceptOwner", data);
    return promise.then(data => MsgAcceptOwnerResponse.decode(new BinaryReader(data)));
  }
  addRemoteTokenMessenger(request: MsgAddRemoteTokenMessenger): Promise<MsgAddRemoteTokenMessengerResponse> {
    const data = MsgAddRemoteTokenMessenger.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "AddRemoteTokenMessenger", data);
    return promise.then(data => MsgAddRemoteTokenMessengerResponse.decode(new BinaryReader(data)));
  }
  depositForBurn(request: MsgDepositForBurn): Promise<MsgDepositForBurnResponse> {
    const data = MsgDepositForBurn.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "DepositForBurn", data);
    return promise.then(data => MsgDepositForBurnResponse.decode(new BinaryReader(data)));
  }
  depositForBurnWithCaller(request: MsgDepositForBurnWithCaller): Promise<MsgDepositForBurnWithCallerResponse> {
    const data = MsgDepositForBurnWithCaller.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "DepositForBurnWithCaller", data);
    return promise.then(data => MsgDepositForBurnWithCallerResponse.decode(new BinaryReader(data)));
  }
  disableAttester(request: MsgDisableAttester): Promise<MsgDisableAttesterResponse> {
    const data = MsgDisableAttester.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "DisableAttester", data);
    return promise.then(data => MsgDisableAttesterResponse.decode(new BinaryReader(data)));
  }
  enableAttester(request: MsgEnableAttester): Promise<MsgEnableAttesterResponse> {
    const data = MsgEnableAttester.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "EnableAttester", data);
    return promise.then(data => MsgEnableAttesterResponse.decode(new BinaryReader(data)));
  }
  linkTokenPair(request: MsgLinkTokenPair): Promise<MsgLinkTokenPairResponse> {
    const data = MsgLinkTokenPair.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "LinkTokenPair", data);
    return promise.then(data => MsgLinkTokenPairResponse.decode(new BinaryReader(data)));
  }
  pauseBurningAndMinting(request: MsgPauseBurningAndMinting): Promise<MsgPauseBurningAndMintingResponse> {
    const data = MsgPauseBurningAndMinting.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "PauseBurningAndMinting", data);
    return promise.then(data => MsgPauseBurningAndMintingResponse.decode(new BinaryReader(data)));
  }
  pauseSendingAndReceivingMessages(request: MsgPauseSendingAndReceivingMessages): Promise<MsgPauseSendingAndReceivingMessagesResponse> {
    const data = MsgPauseSendingAndReceivingMessages.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "PauseSendingAndReceivingMessages", data);
    return promise.then(data => MsgPauseSendingAndReceivingMessagesResponse.decode(new BinaryReader(data)));
  }
  receiveMessage(request: MsgReceiveMessage): Promise<MsgReceiveMessageResponse> {
    const data = MsgReceiveMessage.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "ReceiveMessage", data);
    return promise.then(data => MsgReceiveMessageResponse.decode(new BinaryReader(data)));
  }
  removeRemoteTokenMessenger(request: MsgRemoveRemoteTokenMessenger): Promise<MsgRemoveRemoteTokenMessengerResponse> {
    const data = MsgRemoveRemoteTokenMessenger.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "RemoveRemoteTokenMessenger", data);
    return promise.then(data => MsgRemoveRemoteTokenMessengerResponse.decode(new BinaryReader(data)));
  }
  replaceDepositForBurn(request: MsgReplaceDepositForBurn): Promise<MsgReplaceDepositForBurnResponse> {
    const data = MsgReplaceDepositForBurn.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "ReplaceDepositForBurn", data);
    return promise.then(data => MsgReplaceDepositForBurnResponse.decode(new BinaryReader(data)));
  }
  replaceMessage(request: MsgReplaceMessage): Promise<MsgReplaceMessageResponse> {
    const data = MsgReplaceMessage.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "ReplaceMessage", data);
    return promise.then(data => MsgReplaceMessageResponse.decode(new BinaryReader(data)));
  }
  sendMessage(request: MsgSendMessage): Promise<MsgSendMessageResponse> {
    const data = MsgSendMessage.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "SendMessage", data);
    return promise.then(data => MsgSendMessageResponse.decode(new BinaryReader(data)));
  }
  sendMessageWithCaller(request: MsgSendMessageWithCaller): Promise<MsgSendMessageWithCallerResponse> {
    const data = MsgSendMessageWithCaller.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "SendMessageWithCaller", data);
    return promise.then(data => MsgSendMessageWithCallerResponse.decode(new BinaryReader(data)));
  }
  unlinkTokenPair(request: MsgUnlinkTokenPair): Promise<MsgUnlinkTokenPairResponse> {
    const data = MsgUnlinkTokenPair.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "UnlinkTokenPair", data);
    return promise.then(data => MsgUnlinkTokenPairResponse.decode(new BinaryReader(data)));
  }
  unpauseBurningAndMinting(request: MsgUnpauseBurningAndMinting): Promise<MsgUnpauseBurningAndMintingResponse> {
    const data = MsgUnpauseBurningAndMinting.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "UnpauseBurningAndMinting", data);
    return promise.then(data => MsgUnpauseBurningAndMintingResponse.decode(new BinaryReader(data)));
  }
  unpauseSendingAndReceivingMessages(request: MsgUnpauseSendingAndReceivingMessages): Promise<MsgUnpauseSendingAndReceivingMessagesResponse> {
    const data = MsgUnpauseSendingAndReceivingMessages.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "UnpauseSendingAndReceivingMessages", data);
    return promise.then(data => MsgUnpauseSendingAndReceivingMessagesResponse.decode(new BinaryReader(data)));
  }
  updateOwner(request: MsgUpdateOwner): Promise<MsgUpdateOwnerResponse> {
    const data = MsgUpdateOwner.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "UpdateOwner", data);
    return promise.then(data => MsgUpdateOwnerResponse.decode(new BinaryReader(data)));
  }
  updateAttesterManager(request: MsgUpdateAttesterManager): Promise<MsgUpdateAttesterManagerResponse> {
    const data = MsgUpdateAttesterManager.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "UpdateAttesterManager", data);
    return promise.then(data => MsgUpdateAttesterManagerResponse.decode(new BinaryReader(data)));
  }
  updateTokenController(request: MsgUpdateTokenController): Promise<MsgUpdateTokenControllerResponse> {
    const data = MsgUpdateTokenController.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "UpdateTokenController", data);
    return promise.then(data => MsgUpdateTokenControllerResponse.decode(new BinaryReader(data)));
  }
  updatePauser(request: MsgUpdatePauser): Promise<MsgUpdatePauserResponse> {
    const data = MsgUpdatePauser.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "UpdatePauser", data);
    return promise.then(data => MsgUpdatePauserResponse.decode(new BinaryReader(data)));
  }
  updateMaxMessageBodySize(request: MsgUpdateMaxMessageBodySize): Promise<MsgUpdateMaxMessageBodySizeResponse> {
    const data = MsgUpdateMaxMessageBodySize.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "UpdateMaxMessageBodySize", data);
    return promise.then(data => MsgUpdateMaxMessageBodySizeResponse.decode(new BinaryReader(data)));
  }
  setMaxBurnAmountPerMessage(request: MsgSetMaxBurnAmountPerMessage): Promise<MsgSetMaxBurnAmountPerMessageResponse> {
    const data = MsgSetMaxBurnAmountPerMessage.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "SetMaxBurnAmountPerMessage", data);
    return promise.then(data => MsgSetMaxBurnAmountPerMessageResponse.decode(new BinaryReader(data)));
  }
  updateSignatureThreshold(request: MsgUpdateSignatureThreshold): Promise<MsgUpdateSignatureThresholdResponse> {
    const data = MsgUpdateSignatureThreshold.encode(request).finish();
    const promise = this.rpc.request("circle.cctp.v1.Msg", "UpdateSignatureThreshold", data);
    return promise.then(data => MsgUpdateSignatureThresholdResponse.decode(new BinaryReader(data)));
  }
}