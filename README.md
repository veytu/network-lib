# network-lib

## 通用网络请求模块

### NetWork使用示例

```
import { NetWork } from 'network-lib'

// 创建一个新的 NetWork 实例，并传入配置对象
const config: AxiosRequestConfig = {
  baseURL: 'https://api.example.com',
  headers: {
    'Authorization': 'Bearer your_token_here',
    'Content-Type': 'application/json'
  }
};

const netWork = new NetWork(config); 

netWork.get('/ddd/getApi',{name:'aa'}).then(res => {
  //登录成功。处理区域...
}).catch(err => {
  //登录失败。处理区域...
})
```