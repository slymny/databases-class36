const {MongoClient, ObjectId} = require('mongodb');
require('dotenv').config();

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(`You did not set up the environment variables correctly.`);
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const accountsInfo = [
      {
        account_number: 101,
        balance: 10000,
        account_changes: [
          {
            change_number: 1,
            amount: 740,
            changed_date: '2022-10-10',
            remark: 'Going EFT',
          },
          {
            change_number: 2,
            amount: 900,
            changed_date: '2022-10-14',
            remark: 'Going EFT',
          },
        ],
      },

      {
        account_number: 102,
        balance: 5000,
        account_changes: [
          {
            change_number: 1,
            amount: 740,
            changed_date: '2022-10-10',
            remark: 'Coming EFT',
          },
        ],
      },
      {
        account_number: 103,
        balance: 3900,
        account_changes: [
          {
            change_number: 1,
            amount: 40,
            changed_date: '2022-5-2',
            remark: 'Going EFT',
          },
        ],
      },
      {
        account_number: 104,
        balance: 400,
        account_changes: [
          {
            change_number: 1,
            amount: 150,
            changed_date: '2022-7-1',
            remark: 'Coming EFT',
          },
          {
            change_number: 2,
            amount: 900,
            changed_date: '2022-10-14',
            remark: 'Coming EFT',
          },
        ],
      },
      {
        account_number: 105,
        balance: 7500,
        account_changes: [
          {
            change_number: 1,
            amount: 1000,
            changed_date: '2022-2-10',
            remark: 'Going EFT',
          },
        ],
      },
      {
        account_number: 106,
        balance: 1000,
        account_changes: [
          {
            change_number: 1,
            amount: 1000,
            changed_date: '2022-2-10',
            remark: 'Coming EFT',
          },
        ],
      },
    ];

    await client.connect();
    await createAccountInformation(client, accountsInfo);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function createAccountInformation(client, newAccounts) {
  const results = await client
    .db('databaseWeek4')
    .collection('accounts')
    .insertMany(newAccounts);

  console.log(
    `${results.insertedCount} new account(s) created with the following id(s): `,
  );
  console.log(results.insertedIds);
}
