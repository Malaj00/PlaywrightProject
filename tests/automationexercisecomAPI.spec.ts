import { test, expect, request } from '@playwright/test';
import userCredentials from '../test-data/userCredentials.json';

test.describe('API TESTING', () => {
  test('API 1 - Get All Products List', async ({ request }) => {
    const response = await request.get(
      'https://automationexercise.com/api/productsList',
    );
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
    );
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('Biba');
    console.log(await response.json());
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
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          search_product: 'top',
        },
      },
    );

    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain('Blue Top');
    console.log(await response.json());
  });

  test('API 6 - POST To Search Product without search_product parameter', async ({
    request,
  }) => {
    const response = await request.post(
      'https://automationexercise.com/api/searchProduct',
    );

    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain(
      'Bad request, search_product parameter is missing in POST request.',
    );
    console.log(await response.json());
  });

  test('API 7 - POST To Verify Login with valid details', async ({
    request,
  }) => {
    const register = await request.post(
      'https://automationexercise.com/api/createAccount',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          name: userCredentials.userName,
          password: userCredentials.userPassword,
          email: userCredentials.userMail,
          title: userCredentials.title,
          birth_date: userCredentials.days,
          birth_month: userCredentials.year,
          firstname: userCredentials.firstName,
          lastname: userCredentials.lastName,
          company: userCredentials.company,
          address1: userCredentials.address,
          country: userCredentials.country,
          state: userCredentials.state,
          city: userCredentials.city,
          zipcode: userCredentials.zipcode,
          mobile_number: userCredentials.mobile,
        },
      },
    );

    const response = await request.post(
      'https://automationexercise.com/api/verifyLogin',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          email: userCredentials.userMail,
          password: userCredentials.userPassword,
        },
      },
    );
    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain('User exists!');
    console.log(await response.json());
  });

  test('API 8 - POST To Verify Login without email parameter', async ({
    request,
  }) => {
    const response = await request.post(
      'https://automationexercise.com/api/verifyLogin',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          password: 'Password123',
        },
      },
    );
    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain(
      'Bad request, email or password parameter is missing in POST request.',
    );
    console.log(await response.json());
  });

  test('API 9 - DELETE To Verify Login', async ({ request }) => {
    const response = await request.delete(
      'https://automationexercise.com/api/verifyLogin',
    );

    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain('This request method is not supported.');
    console.log(await response.json());
  });

  test('API 10 - POST To Verify Login with invalid details', async ({
    request,
  }) => {
    const response = await request.post(
      'https://automationexercise.com/api/verifyLogin',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          email: 'invalidemail@mail.com',
          password: 'Pass123',
        },
      },
    );
    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain('User not found!');
    console.log(await response.json());
  });

  test('API 11 - POST To Create/Register User Account', async ({ request }) => {
    const response = await request.post(
      'https://automationexercise.com/api/createAccount',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          name: userCredentials.userName,
          password: userCredentials.userPassword,
          email: userCredentials.userMail,
          title: userCredentials.title,
          birth_date: userCredentials.days,
          birth_month: userCredentials.year,
          firstname: userCredentials.firstName,
          lastname: userCredentials.lastName,
          company: userCredentials.company,
          address1: userCredentials.address,
          country: userCredentials.country,
          state: userCredentials.state,
          city: userCredentials.city,
          zipcode: userCredentials.zipcode,
          mobile_number: userCredentials.mobile,
        },
      },
    );
    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain('User created!');
    console.log(await response.json());
  });

  test('API 12 - DELETE METHOD To Delete User Account', async ({ request }) => {
    const response = await request.delete(
      'https://automationexercise.com/api/deleteAccount',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          email: userCredentials.userMail,
          password: userCredentials.userPassword,
        },
      },
    );
    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain('Account deleted!');
    console.log(await response.json());
  });

  test('API 13 - PUT METHOD To Update User Account', async ({ request }) => {
    const register = await request.post(
      'https://automationexercise.com/api/createAccount',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          name: userCredentials.userName,
          password: userCredentials.userPassword,
          email: userCredentials.userMail,
          title: userCredentials.title,
          birth_date: userCredentials.days,
          birth_month: userCredentials.year,
          firstname: userCredentials.firstName,
          lastname: userCredentials.lastName,
          company: userCredentials.company,
          address1: userCredentials.address,
          country: userCredentials.country,
          state: userCredentials.state,
          city: userCredentials.city,
          zipcode: userCredentials.zipcode,
          mobile_number: userCredentials.mobile,
        },
      },
    );

    const response = await request.put(
      'https://automationexercise.com/api/updateAccount',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
          name: userCredentials.userName,
          password: userCredentials.userPassword,
          email: userCredentials.userMail,
          title: userCredentials.title,
          birth_date: userCredentials.days,
          birth_month: userCredentials.year,
          firstname: userCredentials.firstName,
          lastname: userCredentials.lastName,
          company: userCredentials.company,
          address1: userCredentials.address,
          address2: 'New Address For Test',
          country: userCredentials.country,
          state: userCredentials.state,
          city: userCredentials.city,
          zipcode: userCredentials.zipcode,
          mobile_number: userCredentials.mobile,
        },
      },
    );
    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain('User updated!');
    console.log(await response.json());
  });

  test('API 14 - GET user account detail by email', async ({ request }) => {
    const response = await request.get(
      `https://automationexercise.com/api/getUserDetailByEmail?email=${userCredentials.userMail}`,
    );
    expect(response.status()).toBe(200);
    const text = await response.text();

    expect(text).toContain('TestingCompany');
    console.log(await response.json());
  });
});
