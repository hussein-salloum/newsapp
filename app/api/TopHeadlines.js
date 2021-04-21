import React, { useContext, useState } from 'react';
import client from './client';
 
const endpoint = "/top-headlines?country=us";

const getHeadlines = () => client.get(endpoint);

export default 
{
    getHeadlines,
}