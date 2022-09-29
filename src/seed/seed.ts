import { GENDER_OPTIONS } from '../model/employee.entity';
import { Logger } from '@nestjs/common';
import employeeList from '../database/employees.json';
import fetch from 'node-fetch';
global.fetch = fetch;
global.Headers = fetch.Headers;
const logger = new Logger('Seed');

async function seed() {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const promises = employeeList.map(async (employeeItem) => {
    const raw = JSON.stringify({
      firstName: employeeItem.first_name,
      lastName: employeeItem.last_name,
      email: employeeItem.email,
      phoneNumber: employeeItem.number,
      gender: GENDER_OPTIONS[employeeItem.gender],
      photo: employeeItem.photo ?? '',
    });

    const requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    return fetch('http://127.0.0.1:4000/employee', requestOptions);
  });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
  // The Promise.allSettled() method returns a promise that fulfills after all of the given promises
  // have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
  Promise.allSettled(promises);
}

seed().catch((error) => {
  logger.error(error);
});
