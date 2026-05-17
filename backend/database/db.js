const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: ['127.0.0.1:9042', '127.0.0.1:9043'],
    localDataCenter: 'datacenter1',
    keyspace: 'nontonapa',
    queryOptions: { consistency: cassandra.types.consistencies.one}
});

module.exports = client;