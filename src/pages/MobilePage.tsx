import styled from "@emotion/styled"
import { Flex } from "flex-yeo"

export const MobilePage = () => {
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Text>
        이 서비스는 모바일로는 접근할 수 없습니다.<br/>
        pc를 이용해 주세요.
      </Text>
    </Flex>
  )
}

const Text = styled.div `
  font-size: 30px;
  color: #fef8f0;
`