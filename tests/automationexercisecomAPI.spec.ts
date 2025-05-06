import { test, expect, request } from '@playwright/test';

test.describe('API TESTING', () => {
  test('API 1 - Get All Products List', async ({ request }) => {
    const response = await request.get(
      'https://automationexercise.com/api/productsList',
    ); //get method link
    expect(response.status()).toBe(200); //sprawdzanie czy odpowiedz jest poprawna czyli ma kod 200
    const text = await response.text(); //text jest odpowiedzia z tekstem
    expect(text).toContain('Blue Top'); //odpowiedz zawiera Blue Top czyli jeden z wielu produtkow
    console.log(await response.json()); //wypis w terminalu co otrzymalismy po get
  });

  test('API 2 - POST To All Products List', async ({ request }) => {
    const response = await request.post(
      'https://automationexercise.com/api/productsList',
      { data: { name: 'NewProduct1', price: 'Rs. 1000' } },
    );

    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('This request method is not supported.');
    console.log(await response.json());
  });

  test('API 3 - Get All Brands List', async ({ request }) => {
    const response = await request.get(
      'https://automationexercise.com/api/brandsList',
    ); //get method link
    expect(response.status()).toBe(200); //sprawdzanie czy odpowiedz jest poprawna czyli ma kod 200
    const text = await response.text(); //text jest odpowiedzia z tekstem
    expect(text).toContain('Biba'); //odpowiedz zawiera Blue Top czyli jeden z wielu produtkow
    console.log(await response.json()); //wypis w terminalu co otrzymalismy po get
  });

  test('API 4 - PUT To All Brands List', async ({ request }) => {
    const response = await request.put(
      'https://automationexercise.com/api/brandsList',
      { data: { brand: 'Madame' } },
    );
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('This request method is not supported.');
    console.log(await response.json());
  });

  test('API 5 - POST To Search Product', async ({ request }) => {
    const response = await request.post(
      'https://automationexercise.com/api/searchProduct',
      { data: { name: 'top' } },
    );

    expect(response.status()).toBe(200);
    const text = await response.text();

    //expect(text).toContain('Blue Top');
    console.log(await response.json());
  });
});
