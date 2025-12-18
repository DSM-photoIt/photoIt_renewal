import styled from "@emotion/styled";
import { SNOW } from "../assets";


export const SnowEffect = () => {
  return (
    <SnowWrapper>
      {Array.from({ length: 40 }).map((_, i) => (
        <Snowflake
          key={i}
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${6 + Math.random() * 6}s`,
            fontSize: `${10 + Math.random() * 18}px`,
            opacity: Math.random(),
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          <SnowImg src={SNOW} alt="snow" />
        </Snowflake>
      ))}
    </SnowWrapper>
  );
};

const SnowImg = styled.img `
  width: 12px;
`

const SnowWrapper = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 20;
`;

const Snowflake = styled.div`
  position: absolute;
  top: -20px;
  color: white;
  user-select: none;
  animation-name: snow;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  @keyframes snow {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(50vh) translateX(-20px);
    }
    100% {
      transform: translateY(110vh) translateX(20px);
    }
  }
`;
