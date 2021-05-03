import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from ".";
import { useAsync } from "../utils/use-async";

// interface Base {
//   id: number
// }
//
// interface Advance extends Base {
//   name: string
// }
//
// const test = (p: Base) => {
// }
//
// // 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
// const a = {id: 1, name: 'jack'}
// test(a)

export const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();

  const { run, isLoading } = useAsync(undefined, {throwOnError: true});

  // HTMLFormElement extends Element
  const handleSubmit = (values: { username: string; password: string }) => {
    // 为什么不能用 useAsync 中的 error，涉及同步异步操作时需要用trycatch
    // useAsync 中的 error 适合用在存异步的操作中
    run(login(values)).catch(onError)
    // try {
    //   await run(login(values))
    // } catch (error) {
    //   onError(error)
    // }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id={"username"} placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id={"password"} placeholder={"密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
