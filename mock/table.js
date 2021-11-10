import faker from 'faker';
import { sendSuccess } from './utils';

function generateCustomers() {
  const customers = [];
  for (let i = 0; i < 50; i++) {
    const date = faker.date.past();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = `${firstName} ${lastName}`;
    const avatar = faker.image.avatar();
    const country = faker.address.country();
    const cityName = faker.address.cityName();
    const address = `${country}-${cityName}`;
    const phoneNumber = faker.phone.phoneNumberFormat();
    const tag = i % 2 === 0 ? '家' : '公司';
    const tagId = tag === '家' ? 1 : 2;
    customers.push({
      id: i,
      date,
      firstName,
      lastName,
      name,
      avatar,
      address,
      phoneNumber,
      tag,
      tagId,
    });
  }
  return customers;
}

const list = generateCustomers();

export default [
  {
    url: '/table/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { pageNum, pageSize, name, tag } = query;
      const start =  (pageNum - 1) * Number(pageSize);
      const end = start + Number(pageSize);
      let data = list.slice(start, end);
      let total = list.length;
      if (name) {
        const searchList = list.filter(v => v.name.includes(name));
        data = searchList.slice(start, end);
        total = searchList.length;
      }
      if (tag) {
        const tags = JSON.parse(tag);
        if (tags.length > 0) {
          const searchList = list.filter(v => tags.includes(v.tagId));
          data = searchList.slice(start, end);
          total = searchList.length;
        }
      }
      return sendSuccess({
        list: data,
        total
      });
    },
  },
]
