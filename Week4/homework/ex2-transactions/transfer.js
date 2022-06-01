const {MongoClient, ObjectId} = require('mongodb');
require('dotenv').config();

async function main() {
    if (process.env.MONGODB_URL == null) {
        throw Error(
          `You did not set up the environment variables correctly.`,
        );
      }
      const client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

  try {
    await client.connect();

    await createTransfer(client, 101, 102, 1000);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);


async function createTransfer(client, from, to, amount) {
  const accountsCollection = client.db('databaseWeek4').collection('accounts');

  const session = client.startSession();

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: {level: 'local'},
    writeConcern: {w: 'majority'},
  };

  async function isCreditEnough(account_number) {
    const credit = await accountsCollection.findOne({account_number});
    return credit.balance >= amount;
  }

  try {
    const transactionResults = await session.withTransaction(async () => {

      const isEnough = await isCreditEnough(from);
      if (isEnough) {
        await accountsCollection.updateOne(
          {account_number: from},
          {
            $inc: {balance: -amount},
            $push: {
              account_changes: await createTransferDocument(
                accountsCollection,
                from,
                amount,
                'Going EFT',
              ),
            },
          },
          {session},
        );

        await accountsCollection.updateOne(
          {account_number: to},
          {
            $inc: {balance: amount},
            $push: {
              account_changes: await createTransferDocument(
                accountsCollection,
                to,
                amount,
                'Coming EFT',
              ),
            },
          },
          {session},
        );

        console.log(
          `Balance is ${amount} € decreased on the account with account_number: ${from}. Balance is ${amount} € increased on the account with account_number: ${to}.`,
        );
      } else {
        await session.abortTransaction();
        console.error(
          'The balance is not enough. The money could not be transferred. Any operations that already occurred as part of this transaction will be rolled back.',
        );
        return;
      }
    }, transactionOptions);
    if (transactionResults) {
      console.log('The transfer was successfully made');
    } else {
      console.log('The transaction was intentionally aborted.');
    }
  } catch (e) {
    console.log('The transaction was aborted due to an unexpected error: ' + e);
  } finally {
    await session.endSession();
  }
}

async function createTransferDocument(collection, account_number, amount, remark) {
  let changed_date = new Date();
  const length = await collection.findOne({account_number});
  const changed_number = length.account_changes.length + 1;

  let account_change = {
    changed_number,
    amount,
    changed_date,
    remark,
  };

  return account_change;
}
