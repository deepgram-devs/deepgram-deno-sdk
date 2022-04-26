export type UsageFieldOptions = {
  start?: string;
  end?: string;
};

export type UsageField = {
  tags: Array<string>;
  models: Array<string>;
  processing_methods: Array<string>;
  languages: Array<string>;
  features: Array<string>;
};
