import { Transfer } from "../generated/Contract/Contract"
import { TransferEvent } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  let transferEvent = new TransferEvent(event.transaction.hash.toHex())

  let amount = (event.params.value.toBigDecimal())
  transferEvent.amount = amount

  transferEvent.sender = event.params.from
  transferEvent.destination = event.params.to

  transferEvent.block = event.block.number
  transferEvent.timestamp = event.block.timestamp
  transferEvent.transaction = event.transaction.hash

  transferEvent.save()
}
