import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from ".";
import { useAsync } from "../utils/use-async";

export const Register = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();

  const { run, isLoading } = useAsync(undefined, {throwOnError: true});

  // HTMLFormElement extends Element
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      // 结束下面的代码
      return;
    }
    // login(values).catch(onError) 区别
    try {
      await run(register(values));
    } catch (error) {
      onError(error);
    }
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input type="password" id={"cpassword"} placeholder={"确认密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
