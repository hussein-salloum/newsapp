import client from './client';

const endpoint = "/sources?";

const getSources = () => client.get(endpoint);

export default 
{
    getSources,
}