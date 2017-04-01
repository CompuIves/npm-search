const defaultConfig = {
  npmRegistryEndpoint: 'https://replicate.npmjs.com/registry',
  npmDownloadsEndpoint: 'https://api.npmjs.org/downloads',
  maxObjSize: 450000,
  popularDownloadsRatio: 0.005,
  appId: 'OFCNCOG2CU',
  apiKey: '',
  indexName: 'npm-search',
  replicateConcurrency: 10,
  bootstrapConcurrency: 100,
  seq: null,
  indexSettings: {
    searchableAttributes: [
      'unordered(popularName)',
      'unordered(name)',
      'unordered(concatenatedName)',
      'unordered(description)',
      'unordered(keywords)',
      'owner.name',
      'owners.name',
    ],
    attributesForFaceting: [
      'onlyFilter(name)' /* to be removed when frontend concatenates */,
      'onlyFilter(concatenatedName)' /* optionalFacetFilters to boost the name */,
      'keywords',
    ],
    customRanking: ['desc(downloadsLast30Days)'],
    disablePrefixOnAttributes: ['keywords', 'owner.name', 'owners.name'],
    disableExactOnAttributes: [
      'description',
      'keywords',
      'owner.name',
      'owners.name',
    ],
    disableTypoToleranceOnAttributes: ['keywords'],
    exactOnSingleWordQuery: 'attribute',
    ranking: [
      'filters',
      'typo',
      'words',
      'proximity',
      'attribute',
      'desc(popular)',
      'exact',
      'custom',
    ],
    optionalWords: ['js', 'javascript'],
    separatorsToIndex: '_',
    synonyms: [['_', 'underscore']],
    replaceSynonymsInHighlight: false,
  },
};

export default Object.entries(defaultConfig).reduce(
  (res, [key, defaultValue]) => ({
    ...res,
    [key]: key in process.env
      ? JSON.parse(
          typeof defaultValue === 'string'
            ? `"${process.env[key]}"`
            : process.env[key]
        )
      : defaultValue,
  }),
  {}
);
