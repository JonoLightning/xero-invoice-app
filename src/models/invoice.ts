import { InvoiceLine } from './invoiceLine';

export class Invoice {
  public invoiceDate: Date;
  public invoiceNumber: number;
  public lineItems: InvoiceLine[];

  constructor(invoiceDate = new Date(), invoiceNumber = 0, lineItems = []) {
    this.invoiceDate = invoiceDate;
    this.invoiceNumber = invoiceNumber;
    this.lineItems = lineItems;
  }

  // Adds a line to invoice
  addInvoiceLine(line: InvoiceLine) {
      this.lineItems.push(line);
  };

  // Removes a line
  removeInvoiceLine(id: number) {
    const index = this.lineItems.findIndex(item => item.invoiceLineId == id);
    this.lineItems.splice(index, 1)
  };

  // Get total cost
  getTotalCost() {
    let total = 0;
    this.lineItems.forEach(item => {
      total = total + item.cost;
    });
    return +total.toFixed(2);
  };

  // Get total quantity
  getTotalQuantity() {
    let total = 0;
    this.lineItems.forEach(item => {
      total = total + item.quantity;
    });
    return +total;
  };

  // Merging second invoice lineitems into first invoice
  mergeInvoices(invoiceToMerge: Invoice) {
    invoiceToMerge.lineItems.forEach(item => {
      this.lineItems.push(item);
    })
  }

  // Cloning invoice
  clone() {
    return Object.assign(
      Object.create(
      Object.getPrototypeOf(this)
      ), this
    )
  };
}
