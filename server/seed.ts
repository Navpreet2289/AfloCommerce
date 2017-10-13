
import User from './api/user/user.model';
//import Product from './api/product/product.model';
import Brand from './api/brand/brand.model';
import Category from './api/category/category.model';
//import Feature from './api/feature/feature.model';
import Coupon from './api/coupon/coupon.model';
import Shipping from './api/shipping/shipping.model';
import Address from './api/address/address.model';

User.find(function (err, data) {
  if (data.length < 1) {
    User.create({
      _id: '57c087895c0f110799b4c82d',
      provider: 'local',
      name: 'Test User',
      email: 'user@michaellogic.com',
      password: 'codenx'
      }, {
        _id: '57c087895c0f110799b4c82e',
        provider: 'local',
        role: 'admin',
        name: 'Mike Logic',
        email: 'chemistry@michaellogic.com',
        password: 'codenx'
      }, {
        provider: 'local',
        role: 'vendor',
        name: 'Vendor',
        email: 'vendor@michaellogic.com',
        password: 'codenx'
      }, {
        provider: 'local',
        role: 'manager',
        name: 'Manager',
        email: 'manager@michaellogic.com',
        password: 'codenx'
      }, function () {
        console.log('finished populating users');
      });
  }
});

Address.find(function (err, data) {
  if (data.length < 1) {
    Address.create(
      {
        "__v": 0,
        "_id": "57c087e05c0f110799b4c939",
        "active": true,
        "address": "1430 Donovan Dr",
        "city": "Chicago Heights",
        "country": "United States",
        "name": "Logic Lab",
        "phone": "312.888.9999",
        "state": "Illinois",
        "uid": "57c087895c0f110799b4c82e",
        "zip": 60411
      }
    );
  }
});

Shipping.find(function (err, data) {
  if (data.length < 1) {
    Shipping.create(
      {
        "_id": "561f73dbe87e75d814a98f5a",
        "carrier": "DTDC",
        "country": "United States",
        "charge": 100,
        "minWeight": 0,
        "maxWeight": 200,
        "freeShipping": 500,
        "active": true,
        "__v": 0,
        "name": "DTDC"
      },
      {
        "__v": 0,
        "_id": "561f7ff6fb2f8dac199a618f",
        "active": true,
        "carrier": "UPS",
        "charge": 500,
        "country": "United States",
        "freeShipping": 5000,
        "maxWeight": 100,
        "minWeight": 0
      },
      {
        "__v": 0,
        "_id": "561f801ffb2f8dac199a6190",
        "active": true,
        "carrier": "DHL",
        "charge": 300,
        "country": "United States",
        "freeShipping": 3000,
        "maxWeight": 200,
        "minWeight": 0
      },
      {
        "_id": "561f804dfb2f8dac199a6191",
        "carrier": "DHL",
        "country": "United States",
        "charge": 50,
        "minWeight": 100,
        "maxWeight": 500,
        "freeShipping": 1000,
        "active": true,
        "__v": 0
      }
    );
  }
});

Coupon.find(function (err, data) {
  if (data.length < 1) {
    Coupon.create(
      {
        "__v": 0,
        "_id": "561cbd6fc3c4fab4009caa0e",
        "active": true,
        "amount": 100,
        "code": "A100",
        "info": "15% discount on all products above $500",
        "minimumCartValue": 500,
        "type": "Discount"
      }
    );
  }
});


Category.find(function (err, data) {
  if (data.length < 1) {
    Category.create(
      {
        "_id": "57c1901f993c5fc13f000003",
        "__v": 0,
        "name": "Brake Calibers, Pads & more",
        "slug": "brakes",
        "uid": "ml@michaellogic.com",
        "children": [
          {
            "_id": "57c1904f993c5fe64d000001",
            "name": "Master Cylinder",
            "slug": "master-cylinder",
            "uid": "chemistry@michaellogic.com",
            "active": true,
          },
          {
            "_id": "57c198e2993c5fc13f00000f",
            "name": "Brake Lines",
            "slug": "brake-lines",
            "uid": "chemistry@michaellogic.com",
            "active": true,
          },
          {
            "_id": "57c19208993c5fc13f00000c",
            "name": "Brake Pads",
            "slug": "brake-pads",
            "uid": "chemistry@michaellogic.com",
            "active": true,
          },
          {
            "_id": "57c191c5993c5fe64d000008",
            "name": "Front Calipers",
            "slug": "front-calipers",
            "uid": "chemistry@michaellogic.com",
            "active": true,
          },
          {
            "_id": "57c191da993c5fc13f00000b",
            "name": "Rear Calipers",
            "slug": "rear-calipers",
            "uid": "chemistry@michaellogic.com",
            "active": true,
          },
          {
            "_id": "57c191f2993c5fe64d000009",
            "name": "Rotors",
            "slug": "rotors",
            "uid": "chemistry@michaellogic.com",
            "active": true,
          }
        ],
        "active": true,
      }, function () {
        console.log('finished populating categories');
      });
  }
});

Brand.find(function (err, data) {
  if (data.length < 1) {
    Brand.create({
      "_id": "5607c58bdddfb6780c5bddf3",
      "name": "Harley Davidson",
      "info": "Harley Davidson",
      "slug": "harley-davidson",
      "__v": 0,
      "active": true
    },
      {
        "_id": "5607c599dddfb6780c5bddf4",
        "name": "Victory Twin",
        "info": "Victory Twin",
        "slug": "v-twin",
        "__v": 0,
        "active": true
      }, function () {
        console.log('finished populating brands');
      });
  }
});

