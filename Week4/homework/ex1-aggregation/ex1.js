const {MongoClient} = require('mongodb');
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
    await printPopulationByYear(client, 'Netherlands');
    await printContinentPopulationByYearAndAge(client, 1950, '20-24');
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function printPopulationByYear(client, country) {
  const pipeline = [
    {
      $match: {
        Country: `${country}`,
      },
    },
    {
      $addFields: {
        totalPopulation: {
          $sum: ['$M', '$F'],
        },
      },
    },
    {
      $group: {
        _id: '$Year',
        population: {
          $sum: '$totalPopulation',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  const aggCursor = client
    .db('databaseWeek4')
    .collection('population')
    .aggregate(pipeline);

  await aggCursor.forEach(year => {
    console.log(`${year._id}: ${year.population}`);
  });
}

async function printContinentPopulationByYearAndAge(client, year, age) {
  const pipeline = [
    {
      $match: {
        $and: [
          {
            Country: {
              $in: [
                'AFRICA',
                'ASIA',
                'EUROPE',
                'LATIN AMERICA AND THE CARIBBEAN',
                'NORTHERN AMERICA',
                'OCEANIA',
              ],
            },
          },
          {Year: year},
          {Age: age},
        ],
      },
    },

    {
      $addFields: {
        TotalPopulation: {
          $sum: [
            {
              $toInt: '$M',
            },
            {
              $toInt: '$F',
            },
          ],
        },
      },
    },
  ];

  const aggCursor = client
    .db('databaseWeek4')
    .collection('population')
    .aggregate(pipeline);

  await aggCursor.forEach(population => {
    console.log(`${population.Country}: ${population.TotalPopulation}`);
  });
}
