const dotenv = require('dotenv').config();
const { GraphQLClient } = require('graphql-request');

const graphcmsMutation = require('../libs/graphcms/mutation');

const url = process.env.HYGRAPH_API_URL;
const token = process.env.HYGRAPH_API_TOKEN;
const graphcms = new GraphQLClient(
  url,
  {
    headers: {
      authorization: `Bearer ${token}`,
    },
  },
);

const createSubmission = async (data) => {
  const { formName } = data;
  const mutation = await graphcmsMutation.createSubmission();
  const mutationVariables = {
    formName,
    formData: data,
    formSubmissionDate: new Date(),
  };
  return graphcms.request(mutation, mutationVariables);
};

export default async function handler(req, res) {
  console.log([req, res]);
  const { body } = req;
  await createSubmission(body);
  res.status(200).json({
    message: 'Ok'
  });
}
