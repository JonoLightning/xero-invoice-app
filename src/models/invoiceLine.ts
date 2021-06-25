export class InvoiceLine {
  public invoiceLineId: number;
  public cost: number;
  public quantity: number;
  public description: string;

  constructor(invoiceLineId = 0, cost = 0, quantity = 0, description = "") {
      this.invoiceLineId = invoiceLineId;
      this.cost = cost;
      this.quantity = quantity;
      this.description = description;
  }
}
