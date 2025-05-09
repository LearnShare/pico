import {
  Prisma,
} from '@prisma/client';
import prisma from './prisma';

import type {
  ListQuery,
} from './types';
import {
  DB_PAGE,
  DB_SIZE,
  DB_ORDER_BY,
} from './config';
import {
  searchInMultipleCol,
} from './utils';

// get account info
async function getAccount(email: string) {
  const account = prisma.account.findUnique({
    where: {
      email,
    },
  });

  return account;
}

// get accounts
async function getAccounts({
  page = DB_PAGE,
  size = DB_SIZE,
  orderBy = DB_ORDER_BY,
  search = '',
}: ListQuery) {
  const query: Prisma.AccountFindManyArgs = {
    skip: page * size,
    take: size,
    orderBy,
  };
  // search
  if (search) {
    query.where = searchInMultipleCol(search, [
      'account',
      'name',
      'email',
    ]);
  }

  const accounts = prisma.account.findMany(query);

  return accounts;
}

// create account
async function create(email: string, password: string) {
  // 0. validate params: email + password

  // 1. check is email exist
  // 2. create record:
  // - account: username_[random]
  // - email: username@host.name
  // - password: hash(password)
}

async function updateAccount(email: string, account: string) {
  // 0. check is Account.email exist
  const info = await getAccount(email);
  if (!info) {
    // TODO 404 not found
  }

  // 1. check is Account.account exist
  const existingAccount = await prisma.account.findUnique({
    where: {
      account,
    },
  });
  if (existingAccount) {
    // TODO 400 Account.account exist
  }

  // 2. update Account.account
  const newInfo = await prisma.account.update({
    where: {
      email,
    },
    data: {
      account,
    },
  });

  return newInfo;
}

async function updateName(email: string, name: string) {
  // 0. check is Account.email exist
  const info = await getAccount(email);
  if (!info) {
    // TODO 404 not found
  }

  // 1. update Account.name
  const newInfo = await prisma.account.update({
    where: {
      email,
    },
    data: {
      name,
    },
  });

  return newInfo;
}

async function updatePassword(email: string, oldPassword: string, newPassword: string) {
  // 0. check is Account.email exist
  const info = await getAccount(email);
  if (!info) {
    // TODO 404 not found
  }

  // 1. check is old password match

  // 2. update Account.password
}

async function updateAvatar(email: string, id: string) {
  // create Media and connect to Account
}

async function updateEmailVerified(email: string, verified: boolean) {
  // 0. check is Account.email exist
  const info = await getAccount(email);
  if (!info) {
    // TODO 404 not found
  }

  // 1. update Account.email_verified
}

async function updateActive(email: string, active: boolean) {
  // 0. check is Account.email exist
  const info = await getAccount(email);
  if (!info) {
    // TODO 404 not found
  }

  // 1. update Account.active
}

const Account = {
  getAccount,
  getAccounts,

  create,

  updateAccount,
  updateName,
  updatePassword,
  updateAvatar,
  updateEmailVerified,
  updateActive,
};

export default Account;
