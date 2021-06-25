import { Component, OnInit } from '@angular/core';
import { Invoice } from '../models/invoice';
import { InvoiceLine } from '../models/invoiceLine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  invoiceNum: number = 0;

  ngOnInit(): void {
    this.createInvoiceWithOneItem();
    this.createInvoiceWithMultipleItemsAndQuantities();
    this.removeItem();
    this.mergeInvoices();
    this.cloneInvoice();
    this.invoiceToString();
  }

  ngAfterViewChecked(): void {
    console.log('Thanks for the opportunity!');
  }

  createInvoiceWithOneItem() {
    const invoice = new Invoice(new Date(), ++this.invoiceNum, []);
    invoice.addInvoiceLine(new InvoiceLine(1, 6.99, 1, "Apple"));

    console.log('******* Creating an invoice with a single lineItem *******');
    console.log(invoice.lineItems);
  }

  createInvoiceWithMultipleItemsAndQuantities () {
    const invoice = new Invoice(new Date(), ++this.invoiceNum, []);
    invoice.addInvoiceLine(new InvoiceLine(1, 10.21, 4, "Banana"));
    invoice.addInvoiceLine(new InvoiceLine(2, 5.21, 1, "Orange" ));
    invoice.addInvoiceLine(new InvoiceLine(3, 6.21, 5, "Pineapple"));

    /**
     * JONO NOTE:
     * The instructions weren't clear on what total to get, so I created
     * a function to get the cost total as well as the quantity total.
     *  */

    console.log('******* Creating an invoice with multiple lineItems *******');
    console.log('The total cost of invoice: ',invoice.getTotalCost());
    console.log('The total quantity of invoice: ', invoice.getTotalQuantity());
  }

  removeItem() {
    const invoice = new Invoice(new Date(), ++this.invoiceNum, []);

    invoice.addInvoiceLine(new InvoiceLine(1, 10.21, 1, "Orange"));
    invoice.addInvoiceLine(new InvoiceLine(2, 10.99, 5, "Banana"));

    invoice.removeInvoiceLine(1);

    console.log('******* Removing a lineItem for the invoice *******');
    console.log('The total cost of invoice: ', invoice.getTotalCost());
    console.log('The total quantity of invoice: ', invoice.getTotalQuantity());
  }

  mergeInvoices() {
    const invoice1 = new Invoice(new Date(), ++this.invoiceNum, []);

    invoice1.addInvoiceLine(new InvoiceLine(1, 10.21, 1, "Blueberries"));

    const invoice2 = new Invoice(new Date(), ++this.invoiceNum, []);

    invoice2.addInvoiceLine(new InvoiceLine(2, 5.29, 4, "Orange"));
    invoice2.addInvoiceLine(new InvoiceLine(3, 9.99, 1, "Banana"));

    invoice1.mergeInvoices(invoice2);

    console.log('******* Merging the second invoice into the first invoice *******');
    console.log('The total cost of invoice: ', invoice1.getTotalCost());
    console.log('The total quantity of invoice: ', invoice1.getTotalQuantity());
  }

  cloneInvoice() {
    const invoice = new Invoice(new Date(), ++this.invoiceNum, []);

    invoice.addInvoiceLine(new InvoiceLine(1, 0.99, 5, "Onion"));
    invoice.addInvoiceLine(new InvoiceLine(2, 10.49, 2, "Watermelon"));

    const clonedInvoice = invoice.clone();

    console.log('******* Cloning the invoice *******');
    console.log('The total cost of invoice: ', clonedInvoice.getTotalCost());
    console.log('The total quantity of invoice: ', clonedInvoice.getTotalQuantity());
  }

  invoiceToString() {
    const invoice = new Invoice(
      new Date(),
      ++this.invoiceNum,
      [
        new InvoiceLine(1, 1.99, 20, "Peer")
      ]
    );

    console.log('******* Stringifying the invoice *******');
    console.log(JSON.stringify(invoice));
  }
}
