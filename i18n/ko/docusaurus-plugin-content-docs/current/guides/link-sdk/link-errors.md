---
id: "link-errors"
title: "Link Errors"
slug: "/link-errors"
sidebar_position: 13
keywords:
  - imx-wallets
---

링크에서 표시될 수 있는 오류의 목록을 아래에서 확인하십시오.

## 일반 오류

| 오류 코드                                                    | 가능 시나리오                                                                          | 표시 오류 메시지                                                                                                                                                   | 사용자가 할 수 있는 조치                                    | 개발자가 할 수 있는 조치                                                                                     |
| -------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1000                                                     | 지갑에 연결할 때 SDK IMX 클라이언트를 인스턴트화하는 것에 실패함                                          | 문제가 발생했습니다.                                                                                                                                                 | 고객 센터에 연락합니다.                                     | SDK 설정을 확인합니다.                                                                                     |
| 1001                                                     | 토큰 목록 검색 불가                                                                      | 토큰 리스트를 검색하는 중에 문제가 발생했습니다: ${apiError}                                                                                                                     | 작업을 다시 시도/페이지 새로 고침 또는 고객 센터에 연락                  | 문제를 재현해 봅니다.                                                                                       |
| 1002                                                     | 지갑 주소 검색에 실패                                                                     | 지갑 주소를 검색하는 중에 문제가 발생했습니다. 지갑 공급자에게 문의하십시오.                                                                                                                 | IMX와 지갑의 연결을 확인합니다. 지갑 공급자에게 문의합니다. 고객 센터에 연락합니다. | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다.                                                                         |
| 1003                                                     | Link forcibly closed by the user                                                 | Link window closed.                                                                                                                                         | -                                                 | Give feedback on the Link closed to the user.                                                      |
| 1004                                                     | Failed to open Link as iFrame due to 3rd party cookies blocked                   | There is no storage available. This is usually related to a 3rd party cookie-blocking policy.                                                               | Unblock the 3rd party cookies on the browser.     | Give a feedback regarding 3rd party cookies to the user or change Link mode to be opened as popup. |
| :no_entry: ~~1005~~ <small><br/>`Obsolete`</small> | ~~Failed to open Link as iFrame due to application's domain not be whitelisted~~ | ~~Only whitelisted partners can currently embed link using an iframe. Please contact support@immutable.com and quote referrer ${address} for information.~~ | ~~Contact the Customer Support team.~~            | ~~Contact the Customer Support team.~~                                                             |

## 입금

| 오류 코드 | 가능 시나리오               | 표시 오류 메시지                                   | 사용자가 할 수 있는 조치                                                                   | 개발자가 할 수 있는 조치                                       |
| ----- | --------------------- | ------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 2000  | 지갑 주소 검색에 실패          | 지갑 주소를 검색하는 중에 문제가 발생했습니다. 지갑 공급자에게 문의하십시오. | IMX와 지갑의 연결을 확인합니다. 고객 센터에 연락합니다.                                                | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다.                           |
| 2001  | 유효하지 않은 ERC20 토큰 제공   | IMX에서 사용할 수 없는 토큰입니다.                       | 트랜잭션을 다시 시도하십시오. 고객 센터에 연락해 유효하지 않은 토큰을 보고하십시오.                                  | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다.                           |
| 2002  | 자금 부족                 | 자금이 부족합니다.                                  | L1 지갑에 자금을 추가합니다.                                                                | N/A                                                  |
| 2003  | API rejected deposits | The API rejected the deposit: ${details}    | Retry the operation. If it continues failing, contact the Customer Support team. | Try to replicate the issue. Check the error details. |

## 완전 인출

| 오류 코드 | 가능 시나리오      | 표시 오류 메시지                                   | 사용자가 할 수 있는 조치                                    | 개발자가 할 수 있는 조치             |
| ----- | ------------ | ------------------------------------------- | ------------------------------------------------- | -------------------------- |
| 4000  | 지갑 주소 검색에 실패 | 지갑 주소를 검색하는 중에 문제가 발생했습니다. 지갑 공급자에게 문의하십시오. | IMX와 지갑의 연결을 확인합니다. 지갑 공급자에게 문의합니다. 고객 센터에 연락합니다. | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다. |

## 매수

| 오류 코드 | 가능 시나리오             | 표시 오류 메시지                                 | 사용자가 할 수 있는 조치                                                                   | 개발자가 할 수 있는 조치                                       |
| ----- | ------------------- | ----------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 5000  | 오더 세부 내역 검색에 실패     | 문제가 발생했습니다. -API가 추가 오류 메시지 제공.           | IMX와 지갑의 연결을 확인합니다. 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.                      | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다.                           |
| 5001  | 자산 세부 내역 검색에 실패     | 문제가 발생했습니다. -API가 추가 오류 메시지 제공.           | IMX와 지갑의 연결을 확인합니다. 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.                      | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다.                           |
| 5002  | 거래 요청 실패            | 문제가 발생했습니다. -API가 추가 오류 메시지 제공.           | IMX와 지갑의 연결을 확인합니다. 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.                      | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다.                           |
| 5003  | API rejected trades | The API rejected the purchase: ${details} | Retry the operation. If it continues failing, contact the Customer Support team. | Try to replicate the issue. Check the error details. |

## 매도

| 오류 코드 | 가능 시나리오                      | 표시 오류 메시지                                | 사용자가 할 수 있는 조치                                                                   | 개발자가 할 수 있는 조치                                       |
| ----- | ---------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 6000  | 자산 세부 내역을 검색할 수 없음           | 문제가 발생했습니다.-API가 추가 세부 내용/오류 메시지 제공.     | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.                                          | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다.                           |
| 6001  | 자산을 판매하기 위해 상장할 수 없음         | 자산을 상장할 수 없습니다-API가 추가 세부 내용/오류 메시지 제공.  | 작업을 재시도합니다. 자산이 이미 상장된 것은 아닌지 확인합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.                 | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다.                           |
| 6002  | 자산이 판매를 위해 이미 상장됨            | 자산을 이용할 수 없습니다.                          | 작업을 재시도합니다. 자산이 이미 상장되었는지 확인합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.                     | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다.                           |
| 6003  | 쿼리 매개 변수로 유효하지 않은 통화가 제공됨    | 알 수 없는 통화입니다.                            | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.                                          | IMX에서 사용할 수 있는 토큰을 확인합니다. 문제를 재현해 봅니다. 콘솔 로그를 확인합니다. |
| 6004  | 쿼리 매개 변수로 유효하지 않은 자산 가격이 제공됨 | 가격은 최소 ${minPrice}이어야 합니다.               | 다른 가격으로 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.                                  | N/A                                                  |
| 6005  | API rejected listings        | The API rejected the listing: ${details} | Retry the operation. If it continues failing, contact the Customer Support team. | Try to replicate the issue. Check the error details. |

## 전송

| 오류 코드 | 가능 시나리오                   | 표시 오류 메시지                                                      | 사용자가 할 수 있는 조치                                                                   | 개발자가 할 수 있는 조치                                       |
| ----- | ------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 7000  | 전송 토큰 세부 내역 검색에 실패        | 토큰 세부 내용을 검색하는 중에 문제가 발생했습니다.                                  | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.                                          | IMX에서 사용할 수 있는 토큰을 확인합니다. 문제를 재현해 봅니다. 콘솔 로그를 확인합니다. |
| 7001  | 사용자 토큰 잔금 검색에 실패          | ${tokenType} 토큰 잔고 검색 중에 문제가 발생했습니다.                           | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.                                          | IMX에서 사용할 수 있는 토큰을 확인합니다. 문제를 재현해 봅니다. 콘솔 로그를 확인합니다. |
| 7002  | 전송을 시작하기 전 유효하지 않은 데이터 발견 | 전송이 인증에 실패하였습니다. 다음의 인증 오류가 식별되었습니다:${listOfFailedValidations} | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.                                          | 문제를 재현해 봅니다. 오류의 자세한 내용을 확인합니다.                      |
| 7003  | API가 전송을 거부               | API가 전송을 거부하였습니다: ${details}                                   | Retry the operation. If it continues failing, contact the Customer Support team. | Try to replicate the issue. Check the error details. |

## 히스토리

| 오류 코드 | 가능 시나리오     | 표시 오류 메시지                            | 사용자가 할 수 있는 조치                                         | 개발자가 할 수 있는 조치             |
| ----- | ----------- | ------------------------------------ | ------------------------------------------------------ | -------------------------- |
| 8000  | 트랜잭션 검색에 실패 | 트랜잭션을 검색하는 중에 문제가 발생했습니다: ${details} | 작업을 재시도합니다. 지갑의 연결을 확인합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다. | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다. |

## 취소

| 오류 코드 | 가능 시나리오         | 표시 오류 메시지                      | 사용자가 할 수 있는 조치                          | 개발자가 할 수 있는 조치             |
| ----- | --------------- | ------------------------------ | --------------------------------------- | -------------------------- |
| 9000  | 오더 세부 내역 검색에 실패 | 오더의 세부 내용을 검색하는 중에 문제가 발생했습니다. | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다. | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다. |
| 9001  | 토큰 세부 내역 검색에 실패 | 토큰의 세부 내용을 검색하는 중에 문제가 발생했습니다. | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다. | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다. |

## Onramp

| 오류 코드 | 가능 시나리오          | 표시 오류 메시지      | 사용자가 할 수 있는 조치                          | 개발자가 할 수 있는 조치                             |
| ----- | ---------------- | -------------- | --------------------------------------- | ------------------------------------------ |
| 10001 | 환전에 실패           | 문제가 발생했습니다.    | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다. | Check transaction status with IMX/MoonPay. |
| 10002 | 환전 상태를 검색할 수 없음  | 연결 오류가 발생했습니다. | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다. | Check transaction status with IMX/MoonPay. |
| 10003 | 유효하지 않은 암호 화폐 통화 | 유효하지 않은 통화입니다. | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다. | Check supported tokens for Onramp.         |
| 10004 | 통화를 가져올 수 없음     | 문제가 발생했습니다.    | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다. | Check supported tokens for Onramp.         |

## Offramp

| 오류 코드 | 가능 시나리오         | 표시 오류 메시지        | 사용자가 할 수 있는 조치                                  | 개발자가 할 수 있는 조치                             |
| ----- | --------------- | ---------------- | ----------------------------------------------- | ------------------------------------------ |
| 11001 | 환전에 실패          | 문제가 발생했습니다.      | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.         | Check transaction status with IMX/MoonPay. |
| 11002 | 환전 상태를 검색할 수 없음 | 연결 오류가 발생했습니다.   | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.         | Check transaction status with IMX/MoonPay. |
| 11003 | 통화를 가져올 수 없음    | 문제가 발생했습니다.      | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.         | Check supported tokens for Offramp.        |
| 11004 | 필터링 후 남는 통화가 없음 | 통화를 사용할 수 없습니다   | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.         | Check supported tokens for Offramp.        |
| 11005 | 유효하지 않은 통화 금액   | 유효하지 않은 통화 금액입니다 | 다른 금액으로 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다. | Check supported tokens for Offramp.        |
| 11006 | 올바르지 않은 트랜잭션 형식 | 문제가 발생했습니다.      | 작업을 재시도합니다. 계속해서 실패하는 경우, 고객 센터에 연락합니다.         | 문제를 재현해 봅니다. 콘솔 로그를 확인합니다.                 |


## NFT Checkout Primary

| Error Code | Likely Scenario                | Displayed Error Message            | Possible User Actions                                           | Possible Developer Actions                      |
| ---------- | ------------------------------ | ---------------------------------- | --------------------------------------------------------------- | ----------------------------------------------- |
| 12000      | Feature is disabled            | NFT Primary sale is not supported. | Try later, when a feature will be announced                     | Check that a feature should be enabled or not.  |
| 12001      | Cannot create a transaction    | Cannot create a transaction.       | Retry operation. If continue to fail, contact Customer Support. | Try to replicate the issue. Check console logs. |
| 12002      | Cannot connect to imx-exchange | Connection Error.                  | Retry operation. If continue to fail, contact Customer Support. | Check transaction status with IMX/MoonPay.      |
| 12003      | Polling error                  | Cannot retrieve status.            | Retry operation. If continue to fail, contact Customer Support. | Check logs why status polling is failing.       |
| 12004      | Transaction is failed          | Transaction failed.                | Retry operation. If continue to fail, contact Customer Support. | Check transaction status with IMX/MoonPay.      |

## Offers

| Error Code | Likely Scenario                           | Displayed Error Message                                                                                                                           | Possible User Actions                                           | Possible Developer Actions                                                         |
| ---------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| -          | Invalid parameters supplied to link route | Invalid make offer parameters                                                                                                                     | Retry operation. If continue to fail, contact Customer Support. | Check that the correct parameters are being passed to the link route and are valid |
| -          | API is returning an error                 | We have encountered an issue with our APIs while processing this request. Please try again. For further assistance please visit our support page. | Retry operation. If continue to fail, contact Customer Support. | Try to replicate the issue. Check console logs.                                    |
