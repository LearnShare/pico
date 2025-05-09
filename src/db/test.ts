import DB from './index';

async function showAccounts() {
  console.log('show accounts');

  const list = await DB.Account.getAccounts({});

  console.log(list);
}

async function createAccount(email: string, password: string) {
  console.log('create account');

  const account = await DB.Account.create(email, password);

  console.log(account);
}

showAccounts();
createAccount('test01@abc.com', 'test01');
