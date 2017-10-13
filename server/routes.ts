import * as path from 'path';
import * as express from 'express';

export default function (app) {
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/contacts', require('./api/contact'));
  app.use('/api/media', require('./api/media'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/products', require('./api/product'));
  app.use('/api/orders', require('./api/order'));
  app.use('/api/coupons', require('./api/coupon'));
  app.use('/api/brands', require('./api/brand'));
  app.use('/api/categories', require('./api/category'));
  app.use('/api/features', require('./api/feature'));
  app.use('/api/addresses', require('./api/address'));
  app.use('/api/reviews', require('./api/review'));
  app.use('/api/wishlists', require('./api/wishlist'));
  app.use('/api/shippings', require('./api/shipping'));
  app.use('/api/pay', require('./api/pay'));
  // app.use('/api/sendmail', require('./api/sendmail'));

  app.use('/auth', require('./auth'));

  //Affillio Links
  app.use('/aflo/partners', require('./aflo/partner'));
  app.use('/aflo/media', require('./aflo/media'));
  app.use('/aflo/catalog-sources', require('./aflo/catalog-source'));

  app.use(express.static('public'));
  app.use('/uploads', express.static('uploads'));

  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`./public/index.html`));
    });
}
