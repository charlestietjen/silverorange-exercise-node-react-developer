import { Router, Request, Response } from 'express';
// Used axios to save some time
import axios from 'axios'
import internal from 'stream';

export const repos = Router();
const externalUrl = `https://api.github.com/users/silverorange/repos`

// Asynchronously GET from silverorange repos
const externalRequest = async () => {
    try {
      const resp = await axios.get(externalUrl);
      return resp.data
    } catch (err) {
      console.log(err);
      return []
    }
}

// Provide an array, filter by the fork boolean to remove forked repos, spread the returned array
const filterArray = (array: any[]) => {
  const filteredArray = array.filter((arr: { fork: boolean; }) => {
    return arr.fork === false
  })
  return [...filteredArray]
}

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  
  // import the repos on a GET, I *think* this will ensure we pull current data rather than the JSON at server runtime, further testing if I have time remaining!
  const internalRepos = require(`../../data/repos.json`);

  // declare our external repos as the returned axios request
  const externalRepos = await externalRequest();

  // filter both arrays and apply spread operators
  const filteredArrays = [...filterArray(internalRepos), ...filterArray(externalRepos)];

  // return filtered arrays as JSON...apply spread...again.
  res.json([...filteredArrays]);
});
