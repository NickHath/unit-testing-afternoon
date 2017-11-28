const cart = require('./cart')
    , cars = require('./data/cars');

describe('Cart Properties:', () => {
  test('Cart should be an empty array initially', () => {
    expect(Array.isArray(cart.cart)).toBeTruthy();
    expect(cart.cart.length).toBe(0);
  })

  test('Cart total should be 0 initially', () => {
    expect(typeof cart.total).toBe('number');
    expect(cart.total).toBe(0);
  })
})

describe('Cart Methods:', () => {
  afterEach(() => { cart.total = 0; cart.cart = []; });
  
  test('addToCart() updates cart array appropriately', () => {
    let initialLen = cart.cart.length;
    cart.addToCart(cars[0]);
    cart.addToCart(cars[5]);
    cart.addToCart(cars[15]);

    let newLen = cart.cart.length;

    expect(newLen).toBe(initialLen + 3);
    expect(cart.cart[newLen - 1]).toBe(cars[15]);
    expect(cart.cart[newLen - 2]).toBe(cars[5]);
    expect(cart.cart[newLen - 3]).toBe(cars[0]);
  })

  test('addToCart() updates the total', () => {
    cart.addToCart(cars[1]);
    cart.addToCart(cars[6]);
    
    expect(cart.total).toBe(cars[1].price + cars[6].price);
  })

  test('deleteFromCart() removes an object from cart array', () => {
    cart.addToCart(cars[1]);
    cart.addToCart(cars[6]);
    cart.removeFromCart(1, cars[6].price);
    
    expect(cart.cart.length).toBe(1);
    expect(cart.cart).toEqual([cars[1]]);
  })

  test('removeFromCart() decreases cart\'s total', () => {
    cart.addToCart(cars[1]);
    cart.addToCart(cars[6]);
    cart.removeFromCart(1, cars[6].price);

    expect(cart.total).toBe(cars[1].price);
  })

  test('Cart is empty after checkout', () => {
    cart.addToCart( cars[0] );
    cart.addToCart( cars[1] );
    cart.checkout();

    expect(cart.cart.length).toBe(0);
    expect(cart.total).toBe(0);
  })
})