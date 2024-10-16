import NetWork,{AxiosRequestConfig} from '../src';
import axios from 'axios';

const config: AxiosRequestConfig = {
    baseURL: 'https://api.example.com',
    headers: {
        'Authorization': 'Bearer your_token_here',
        'Content-Type': 'application/json'
    }
};

describe('NetWork', () => {
  let netWork:NetWork;

  beforeEach(() => {
    netWork = new NetWork(config);
  });

  it('should make a GET request and return the response data', async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const expectedResponse = {
      code: 200,
      data: {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false
      },
      msg: 'OK'
    };

    // Mock the axios.get method to return a fixed response
    jest.spyOn(axios, 'get').mockResolvedValue({
      status: 200,
      data: expectedResponse.data,
      statusText: 'OK'
    });
//@ts-ignore
    const response = await netWork.get<typeof expectedResponse.data>(url);
    expect(response).toEqual(expectedResponse);
  });
});
