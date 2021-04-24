import React from "react";
import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

type RowProps = {
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
};

export const Row = styled.div<RowProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ between }) => (between ? "space-between" : undefined)};
  margin-bottom: ${({ marginBottom }) => marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${({ gap }) =>
      typeof gap === "number" ? gap + "rem" : gap ? "2rem" : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"} />
  </FullPage>
);

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
  </FullPage>
);
