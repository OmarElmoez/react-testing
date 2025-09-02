import { db } from './mocks/db';

describe('faker js', () => {
  it('fake data', () => {
    // const product = db.product.create();
    const product = db.product.create({ name: 'custom name' });

    // to delete a product
    db.product.delete({ where: {name: {equals: product.name}}})

    console.log(db.product.count())
  })
})