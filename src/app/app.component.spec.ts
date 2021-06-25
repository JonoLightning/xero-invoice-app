import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { InvoiceLine } from '../models/invoiceLine';
import { Invoice } from '../models/invoice';

describe('AppComponent', () => {
  let invoiceClass: Invoice;
  let invoiceLineClass: InvoiceLine;
  let invoiceNum: number = 0;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: []
    }).compileComponents();
  }));

  afterEach(async(() => {
    invoiceClass = null;
    invoiceLineClass = null;
  }))

  it('should add a single lineItem to the invoice', () => {
    invoiceClass = new Invoice(new Date(), ++invoiceNum, []);

    invoiceClass.addInvoiceLine(new InvoiceLine(1, 1, 1, 'Line Item 1'));

    expect(invoiceClass instanceof Invoice).toBeTrue();
    expect(invoiceClass.lineItems[0] instanceof InvoiceLine).toBeTrue();
    expect(invoiceClass.lineItems.length).toEqual(1);
  });

  it('should add multiple lineItems to the invoice', () => {
    invoiceClass = new Invoice(new Date(), ++invoiceNum, []);

    invoiceClass.addInvoiceLine(new InvoiceLine(1, 1, 1, 'Line Item 1'));
    invoiceClass.addInvoiceLine(new InvoiceLine(2, 2, 2, 'Line Item 2'));
    invoiceClass.addInvoiceLine(new InvoiceLine(3, 3, 3, 'Line Item 3'));

    expect(invoiceClass instanceof Invoice).toBeTrue();
    expect(invoiceClass.lineItems[0] instanceof InvoiceLine).toBeTrue();
    expect(invoiceClass.lineItems.length).toBeGreaterThan(0);
  });

  it('should remove a lineItem based on the ID', () => {
    invoiceClass = new Invoice(new Date(), ++invoiceNum, []);

    invoiceClass.addInvoiceLine(new InvoiceLine(1, 1, 1, 'Line Item 1'));
    invoiceClass.addInvoiceLine(new InvoiceLine(2, 2, 2, 'Line Item 2'));
    invoiceClass.addInvoiceLine(new InvoiceLine(3, 3, 3, 'Line Item 3'));

    invoiceClass.removeInvoiceLine(2);

    let exists = invoiceClass.lineItems.some(item => item.invoiceLineId == 2);

    expect(invoiceClass instanceof Invoice).toBeTrue();
    expect(invoiceClass.lineItems[0] instanceof InvoiceLine).toBeTrue();
    expect(exists).toBeFalse();
    expect(invoiceClass.lineItems.length).toEqual(2);
  });

  it('should merge second invoice into the first invoice', () => {
    invoiceClass = new Invoice(new Date(), ++invoiceNum, []);
    let mergeInvoice = new Invoice(new Date(), ++invoiceNum, []);

    invoiceClass.addInvoiceLine(new InvoiceLine(1, 1, 1, 'Line Item 1'));
    invoiceClass.addInvoiceLine(new InvoiceLine(2, 2, 2, 'Line Item 2'));
    invoiceClass.addInvoiceLine(new InvoiceLine(3, 3, 3, 'Line Item 3'));

    mergeInvoice.addInvoiceLine(new InvoiceLine(4, 4, 4, 'Line Item 4'));
    mergeInvoice.addInvoiceLine(new InvoiceLine(5, 5, 5, 'Line Item 5'));

    invoiceClass.mergeInvoices(mergeInvoice);

    expect(invoiceClass instanceof Invoice).toBeTrue();
    expect(invoiceClass.lineItems[0] instanceof InvoiceLine).toBeTrue();
    expect(invoiceClass.lineItems.length).toEqual(5);
  });

  it('should clone the invoice', () => {
    invoiceClass = new Invoice(new Date(), ++invoiceNum, []);

    invoiceClass.addInvoiceLine(new InvoiceLine(1, 1, 1, 'Line Item 1'));
    invoiceClass.addInvoiceLine(new InvoiceLine(2, 2, 2, 'Line Item 2'));
    invoiceClass.addInvoiceLine(new InvoiceLine(3, 3, 3, 'Line Item 3'));

    let clone = invoiceClass.clone();

    expect(clone instanceof Invoice).toBeTrue();
    expect(clone.lineItems[0] instanceof InvoiceLine).toBeTrue();
    expect(clone.lineItems.length).toEqual(3);
    expect(clone.invoiceNumber).toEqual(invoiceClass.invoiceNumber);
    expect(clone.lineItems.length).toEqual(invoiceClass.lineItems.length);
  });

  it('should stringify invoice JSON object', () => {
    invoiceClass = new Invoice(new Date(), ++invoiceNum, []);

    invoiceClass.addInvoiceLine(new InvoiceLine(1, 1, 1, 'Line Item 1'));
    invoiceClass.addInvoiceLine(new InvoiceLine(2, 2, 2, 'Line Item 2'));
    invoiceClass.addInvoiceLine(new InvoiceLine(3, 3, 3, 'Line Item 3'));

    let invoiceToString = JSON.stringify(invoiceClass);

    expect(typeof invoiceToString).toEqual('string');

  });
});
